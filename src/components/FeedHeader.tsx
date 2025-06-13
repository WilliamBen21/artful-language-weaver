
import { Button } from '@/components/ui/button';

interface FeedHeaderProps {
  onSignOut: () => Promise<void>;
}

const FeedHeader = ({ onSignOut }: FeedHeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Story-Tell</h1>
        <Button onClick={onSignOut} variant="outline">
          Sign Out
        </Button>
      </div>
    </header>
  );
};

export default FeedHeader;
