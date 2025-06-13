
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import FeedHeader from '@/components/FeedHeader';
import CreatePost from '@/components/CreatePost';
import PostsList from '@/components/PostsList';
import type { Json } from '@/integrations/supabase/types';

interface Post {
  id: string;
  content: string;
  like_count: number;
  comment_count: number;
  created_at: string;
  image_urls: Json;
  profiles: {
    username: string;
    display_name: string;
    profile_picture_url: string;
  };
}

const Feed = () => {
  const { user, signOut } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
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

  const createPost = async (content: string, images: string[]) => {
    if (!content.trim() && images.length === 0) return;
    
    setLoading(true);
    const { error } = await supabase
      .from('posts')
      .insert([
        {
          content: content,
          user_id: user?.id,
          image_urls: images
        }
      ]);

    if (error) {
      toast({
        title: "Error creating post",
        description: error.message,
        variant: "destructive"
      });
    } else {
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
      <FeedHeader onSignOut={signOut} />
      
      <main className="max-w-2xl mx-auto px-4 py-8">
        <CreatePost onCreatePost={createPost} loading={loading} />
        <PostsList posts={posts} onLikePost={likePost} />
      </main>
    </div>
  );
};

export default Feed;
