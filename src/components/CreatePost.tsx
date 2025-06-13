
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { X } from 'lucide-react';
import ImageGenerator from '@/components/ImageGenerator';

interface CreatePostProps {
  onCreatePost: (content: string, images: string[]) => Promise<void>;
  loading: boolean;
}

const CreatePost = ({ onCreatePost, loading }: CreatePostProps) => {
  const [newPost, setNewPost] = useState('');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const handleImageGenerated = (imageUrl: string) => {
    setGeneratedImages(prev => [...prev, imageUrl]);
  };

  const removeGeneratedImage = (index: number) => {
    setGeneratedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    await onCreatePost(newPost, generatedImages);
    setNewPost('');
    setGeneratedImages([]);
  };

  return (
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
          onClick={handleSubmit} 
          disabled={loading || (!newPost.trim() && generatedImages.length === 0)}
          className="w-full"
        >
          {loading ? 'Posting...' : 'Share Story'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
