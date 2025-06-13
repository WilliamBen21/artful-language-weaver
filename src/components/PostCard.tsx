
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share } from 'lucide-react';
import type { Json } from '@/integrations/supabase/types';

interface PostCardProps {
  post: {
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
  };
  onLikePost: (postId: string) => Promise<void>;
}

const PostCard = ({ post, onLikePost }: PostCardProps) => {
  // Helper function to safely parse image URLs
  const getImageUrls = (imageUrls: Json): string[] => {
    if (Array.isArray(imageUrls)) {
      return imageUrls.filter((url): url is string => typeof url === 'string');
    }
    return [];
  };

  const imageUrls = getImageUrls(post.image_urls);

  return (
    <Card>
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
        {imageUrls.length > 0 && (
          <div className="mb-4 grid grid-cols-1 gap-2">
            {imageUrls.map((imageUrl, index) => (
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
            onClick={() => onLikePost(post.id)}
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
  );
};

export default PostCard;
