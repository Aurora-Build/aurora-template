import { Card } from "@/components/ui/card";
import { Rocket, Shield, Zap, Users, Code, Sparkles } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Rocket,
      title: "Fast Performance",
      description: "Built with modern technologies for lightning-fast performance and optimal user experience.",
    },
    {
      icon: Shield,
      title: "Secure by Design",
      description: "Security-first approach with built-in protection and best practices implemented from day one.",
    },
    {
      icon: Zap,
      title: "Developer Experience",
      description: "Intuitive APIs, comprehensive documentation, and tools that make development a joy.",
    },
    {
      icon: Users,
      title: "Collaborative",
      description: "Built for teams with collaboration features and workflows that scale with your organization.",
    },
    {
      icon: Code,
      title: "Clean Code",
      description: "Well-structured, maintainable codebase following industry standards and best practices.",
    },
    {
      icon: Sparkles,
      title: "Modern Design",
      description: "Beautiful, responsive design that works seamlessly across all devices and screen sizes.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gradient-subtle">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Everything You Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features and tools designed to help you build amazing applications faster than ever before.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="p-6 bg-white/50 backdrop-blur-sm border-white/20 hover:bg-white/70 transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};