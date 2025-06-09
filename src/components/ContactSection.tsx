
import { Mail, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactSection = () => {
  return (
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
  );
};

export default ContactSection;
