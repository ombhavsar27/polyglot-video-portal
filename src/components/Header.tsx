
import React from "react";
import ThemeToggle from "./ThemeToggle";
import { Globe } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50 animate-fade-in">
      <div className="flex items-center gap-2">
        <Globe className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-medium">Polyglot</h1>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
