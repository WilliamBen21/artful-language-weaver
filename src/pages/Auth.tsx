
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { MessageCircle, Users, Heart } from 'lucide-react';

const Auth = () => {
  console.log('Auth component rendering');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp, signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign up attempt with:', { email, username });
    
    if (!username.trim()) {
      toast({
        title: "Username required",
        description: "Please enter a username",
        variant: "destructive"
      });
      return;
    }
    
    if (!email.trim() || !password.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await signUp(email, password, username);
      
      if (error) {
        console.error('Sign up error:', error);
        toast({
          title: "Error signing up",
          description: error.message || "Something went wrong",
          variant: "destructive"
        });
      } else {
        console.log('Sign up successful');
        toast({
          title: "Welcome to Story-Tell!",
          description: "Your account has been created successfully"
        });
        navigate('/feed');
      }
    } catch (error) {
      console.error('Sign up exception:', error);
      toast({
        title: "Error signing up",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign in attempt with:', { email });
    
    if (!email.trim() || !password.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        console.error('Sign in error:', error);
        toast({
          title: "Error signing in",
          description: error.message || "Invalid credentials",
          variant: "destructive"
        });
      } else {
        console.log('Sign in successful, navigating to /feed');
        navigate('/feed');
      }
    } catch (error) {
      console.error('Sign in exception:', error);
      toast({
        title: "Error signing in",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="text-center md:text-left space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-gray-900">
              <span className="text-blue-600">Story</span>-Tell
            </h1>
            <p className="text-xl text-gray-600 max-w-md">
              Share your stories, connect with friends, and discover amazing content from people around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto md:mx-0">
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
              <Users className="w-8 h-8 text-blue-600" />
              <div className="text-left">
                <h3 className="font-semibold">Connect</h3>
                <p className="text-sm text-gray-600">Follow friends and discover new voices</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
              <MessageCircle className="w-8 h-8 text-green-600" />
              <div className="text-left">
                <h3 className="font-semibold">Share Stories</h3>
                <p className="text-sm text-gray-600">Tell your story and engage with others</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
              <Heart className="w-8 h-8 text-red-600" />
              <div className="text-left">
                <h3 className="font-semibold">Express Yourself</h3>
                <p className="text-sm text-gray-600">Like, share, and react to content</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth forms */}
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Join Story-Tell</CardTitle>
            <CardDescription>Sign in to your account or create a new one to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Create Account</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Choose a username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="h-12"
                    />
                  </div>
                  <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
