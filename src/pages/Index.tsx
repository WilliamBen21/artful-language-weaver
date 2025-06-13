
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, MessageCircle, Heart, Share } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">Story-Tell</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Share your stories, connect with friends, and discover amazing content from people around the world.
          </p>
          <div className="space-x-4">
            <Link to="/auth">
              <Button size="lg" className="text-lg px-8 py-3">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Connect</h3>
            <p className="text-gray-600">Follow friends and discover new voices in your community</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Share Stories</h3>
            <p className="text-gray-600">Tell your story and engage with others through comments</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <Heart className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Express Yourself</h3>
            <p className="text-gray-600">Like, share, and react to content that matters to you</p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4">Ready to join our community?</p>
          <Link to="/auth">
            <Button variant="outline" size="lg">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
