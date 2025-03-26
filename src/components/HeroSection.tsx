
import React from "react";
import { Globe } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <div className="text-center space-y-4 py-8 mb-8 animate-fade-in">
      <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
        <Globe className="h-8 w-8 text-primary" />
      </div>
      <h1 className="text-4xl font-bold">Video Translation Portal</h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Translate your videos into multiple languages simultaneously with our
        advanced AI translation system.
      </p>
    </div>
  );
};

export default HeroSection;
