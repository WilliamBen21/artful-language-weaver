
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  const skills = [
    "JavaScript", "TypeScript", "React", "Vue.js", "Node.js", "Python",
    "PostgreSQL", "MongoDB", "AWS", "Docker", "Git", "Figma"
  ];

  return (
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
  );
};

export default AboutSection;
