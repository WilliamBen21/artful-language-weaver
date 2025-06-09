
import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (elementId: string) => {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      github: "#",
      live: "#"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      tech: ["Vue.js", "Firebase", "WebSocket", "Tailwind"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      github: "#",
      live: "#"
    },
    {
      title: "Weather Analytics Dashboard",
      description: "A data visualization dashboard that displays weather analytics with interactive charts and predictive modeling capabilities.",
      tech: ["React", "D3.js", "Python", "FastAPI"],
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
      github: "#",
      live: "#"
    }
  ];

  const skills = [
    "JavaScript", "TypeScript", "React", "Vue.js", "Node.js", "Python",
    "PostgreSQL", "MongoDB", "AWS", "Docker", "Git", "Figma"
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl sm:text-2xl font-bold text-primary">Alex Chen</div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className={`transition-colors duration-200 ${
                    activeSection === item.toLowerCase()
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="block w-full text-left py-3 px-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
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

      {/* About Section */}
      <section id="about" className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A passionate developer with 5+ years of experience creating digital solutions 
              that make a difference.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                I'm a full-stack developer based in San Francisco, specializing in creating 
                exceptional digital experiences. My journey in tech started with a curiosity 
                for how things work, which led me to pursue a degree in Computer Science.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Over the years, I've worked with startups and established companies, 
                helping them build scalable applications and bring their ideas to life. 
                I believe in writing clean, maintainable code and creating user-centric solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing 
                to open-source projects, or enjoying the great outdoors.
              </p>
            </div>

            <Card className="p-6 lg:p-8">
              <CardContent className="p-0">
                <h3 className="text-lg lg:text-xl font-semibold mb-6">Skills & Technologies</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className="bg-primary/10 text-primary px-3 py-2 rounded-md text-sm font-medium text-center hover:bg-primary/20 transition-colors"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and passion for development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <a href={project.github} className="text-white hover:text-primary transition-colors">
                      <Github size={24} />
                    </a>
                    <a href={project.live} className="text-white hover:text-primary transition-colors">
                      <ExternalLink size={24} />
                    </a>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg lg:text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="w-full max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm always interested in hearing about new opportunities and exciting projects. 
            Let's discuss how we can bring your ideas to life.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
            <div className="space-y-2">
              <Mail className="w-8 h-8 text-primary mx-auto" />
              <h3 className="font-semibold">Email</h3>
              <p className="text-muted-foreground text-sm">alex@example.com</p>
            </div>
            <div className="space-y-2">
              <Linkedin className="w-8 h-8 text-primary mx-auto" />
              <h3 className="font-semibold">LinkedIn</h3>
              <p className="text-muted-foreground text-sm">in/alexchen</p>
            </div>
            <div className="space-y-2">
              <Github className="w-8 h-8 text-primary mx-auto" />
              <h3 className="font-semibold">GitHub</h3>
              <p className="text-muted-foreground text-sm">github.com/alexchen</p>
            </div>
          </div>

          <Button size="lg" className="text-lg px-8">
            Send Me a Message
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="w-full max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Alex Chen. All rights reserved. Built with React and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
