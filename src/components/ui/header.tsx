import { Button } from "@/components/ui/button";
import { FileText, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">CV Builder Pro</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
              المميزات
            </a>
            <a href="#templates" className="text-muted-foreground hover:text-primary transition-colors">
              القوالب
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
              الأسعار
            </a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
              من نحن
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-white">
              تسجيل الدخول
            </Button>
            <Button 
              className="bg-gradient-primary text-white shadow-soft hover:shadow-medium transition-all"
              onClick={() => window.location.href = '/cv-builder'}
            >
              ابدأ مجاناً
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors py-2">
                المميزات
              </a>
              <a href="#templates" className="text-muted-foreground hover:text-primary transition-colors py-2">
                القوالب
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors py-2">
                الأسعار
              </a>
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors py-2">
                من نحن
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" className="text-primary border-primary">
                  تسجيل الدخول
                </Button>
                <Button className="bg-gradient-primary text-white">
                  ابدأ مجاناً
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;