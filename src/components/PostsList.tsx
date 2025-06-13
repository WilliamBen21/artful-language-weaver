
import PostCard from '@/components/PostCard';
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

interface PostsListProps {
  posts: Post[];
  onLikePost: (postId: string) => Promise<void>;
}

const PostsList = ({ posts, onLikePost }: PostsListProps) => {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard 
          key={post.id} 
          post={post} 
          onLikePost={onLikePost} 
        />
      ))}
    </div>
  );
};

export default PostsList;
