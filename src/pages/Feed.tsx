
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ImageGenerator from '@/components/ImageGenerator';

interface Post {
  id: string;
  content: string;
  like_count: number;
  comment_count: number;
  created_at: string;
  image_urls: string[];
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
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
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
        image_urls,
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
    if (!newPost.trim() && generatedImages.length === 0) return;
    
    setLoading(true);
    const { error } = await supabase
      .from('posts')
      .insert([
        {
          content: newPost,
          user_id: user?.id,
          image_urls: generatedImages
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
      setGeneratedImages([]);
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

  const handleImageGenerated = (imageUrl: string) => {
    setGeneratedImages(prev => [...prev, imageUrl]);
  };

  const removeGeneratedImage = (index: number) => {
    setGeneratedImages(prev => prev.filter((_, i) => i !== index));
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
            
            {/* AI Image Generation */}
            <div className="border-t pt-4">
              <h3 className="text-sm font-medium mb-2">Generate AI Image</h3>
              <ImageGenerator onImageGenerated={handleImageGenerated} />
            </div>

            {/* Generated Images Preview */}
            {generatedImages.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Generated Images:</h4>
                <div className="flex flex-wrap gap-2">
                  {generatedImages.map((imageUrl, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={imageUrl} 
                        alt={`Generated ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <button
                        onClick={() => removeGeneratedImage(index)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button 
              onClick={createPost} 
              disabled={loading || (!newPost.trim() && generatedImages.length === 0)}
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
                {post.content && <p className="text-gray-800 mb-4">{post.content}</p>}
                
                {/* Post Images */}
                {post.image_urls && post.image_urls.length > 0 && (
                  <div className="mb-4 grid grid-cols-1 gap-2">
                    {post.image_urls.map((imageUrl, index) => (
                      <img 
                        key={index}
                        src={imageUrl} 
                        alt={`Post image ${index + 1}`}
                        className="w-full rounded-lg max-h-96 object-cover"
                      />
                    ))}
                  </div>
                )}

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
