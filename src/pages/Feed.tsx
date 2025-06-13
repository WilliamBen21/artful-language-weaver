
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Post {
  id: string;
  content: string;
  like_count: number;
  comment_count: number;
  created_at: string;
  profiles: {
    username: string;
    display_name: string;
    profile_picture_url: string;
  };
}

const Feed = () => {
  const { user, signOut } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id,
        content,
        like_count,
        comment_count,
        created_at,
        profiles (
          username,
          display_name,
          profile_picture_url
        )
      `)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data || []);
    }
  };

  const createPost = async () => {
    if (!newPost.trim()) return;
    
    setLoading(true);
    const { error } = await supabase
      .from('posts')
      .insert([
        {
          content: newPost,
          user_id: user?.id
        }
      ]);

    if (error) {
      toast({
        title: "Error creating post",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setNewPost('');
      fetchPosts();
      toast({
        title: "Post created!",
        description: "Your story has been shared"
      });
    }
    setLoading(false);
  };

  const likePost = async (postId: string) => {
    const { error } = await supabase
      .from('likes')
      .insert([
        {
          post_id: postId,
          user_id: user?.id
        }
      ]);

    if (error && !error.message.includes('duplicate')) {
      console.error('Error liking post:', error);
    } else {
      fetchPosts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Story-Tell</h1>
          <Button onClick={signOut} variant="outline">
            Sign Out
          </Button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Create Post */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-lg font-semibold">Share your story</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="What's happening?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              rows={3}
            />
            <Button 
              onClick={createPost} 
              disabled={loading || !newPost.trim()}
              className="w-full"
            >
              {loading ? 'Posting...' : 'Share Story'}
            </Button>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={post.profiles.profile_picture_url} />
                    <AvatarFallback>
                      {post.profiles.display_name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{post.profiles.display_name}</p>
                    <p className="text-sm text-gray-500">@{post.profiles.username}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-800 mb-4">{post.content}</p>
                <div className="flex items-center space-x-6 text-gray-500">
                  <button
                    onClick={() => likePost(post.id)}
                    className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    <span>{post.like_count}</span>
                  </button>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comment_count}</span>
                  </div>
                  <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                    <Share className="w-5 h-5" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Feed;
