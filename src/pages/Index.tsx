
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, MessageCircle, Heart, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="px-4 py-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            <span className="text-blue-600">Story</span>-Tell
          </h1>
          <Link to="/auth">
            <Button variant="outline" size="lg" className="text-lg px-6">
              Sign In
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Share Your <span className="text-blue-600">Story</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with friends, share your experiences, and discover amazing stories from people around the world. 
            Join our community of storytellers today.
          </p>
          <div className="space-x-4">
            <Link to="/auth">
              <Button size="lg" className="text-lg px-8 py-4 h-auto">
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <Users className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Connect & Follow</h3>
            <p className="text-gray-600 leading-relaxed">
              Build meaningful connections with friends and discover new voices in your community. 
              Follow accounts that inspire you.
            </p>
          </div>
          
          <div className="text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <MessageCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Share Your Stories</h3>
            <p className="text-gray-600 leading-relaxed">
              Tell your story through posts, images, and comments. Engage with others and 
              build a community around shared experiences.
            </p>
          </div>
          
          <div className="text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <Heart className="w-16 h-16 text-red-600 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Express & React</h3>
            <p className="text-gray-600 leading-relaxed">
              Like, share, and react to content that resonates with you. Show appreciation 
              for the stories that matter most.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-2xl p-12 shadow-sm max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Share Your Story?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Join thousands of storytellers who are already sharing their experiences and connecting with others.
          </p>
          <Link to="/auth">
            <Button size="lg" className="text-lg px-8 py-4 h-auto">
              Create Your Account <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-8 px-4 border-t border-gray-200 bg-white/50">
        <div className="container mx-auto text-center">
          <p className="text-gray-500">
            © 2024 Story-Tell. Start sharing your story today.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
