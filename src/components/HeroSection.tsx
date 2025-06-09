
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  scrollTo: (elementId: string) => void;
}

const HeroSection = ({ scrollTo }: HeroSectionProps) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1">
            <div>
              <p className="text-primary font-medium mb-2">Hello, I'm</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
                Alex Chen
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-6">
                Full Stack Developer
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                I create exceptional digital experiences that combine beautiful design 
                with powerful functionality. Passionate about building scalable applications 
                and solving complex problems.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button onClick={() => scrollTo('projects')} size="lg" className="w-full sm:w-auto">
                View My Work
              </Button>
              <Button variant="outline" onClick={() => scrollTo('contact')} size="lg" className="w-full sm:w-auto">
                Get In Touch
              </Button>
            </div>

            <div className="flex space-x-6 justify-center lg:justify-start">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={24} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </div>

          <div className="flex justify-center order-1 lg:order-2">
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-primary/20 hover:border-primary/40 transition-colors duration-300">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                  alt="Alex Chen"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs sm:text-sm">5+ Years</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block">
        <ChevronDown size={24} className="text-muted-foreground animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
