import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, FileText, Zap } from "lucide-react";
import heroImage from "@/assets/hero-cv-builder.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-right space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                اصنع سيرتك الذاتية
                <span className="block bg-gradient-to-l from-white to-white/80 bg-clip-text text-transparent">
                  المتوافقة مع ATS
                </span>
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto lg:mx-0">
                منصة احترافية لإنشاء السير الذاتية المحسنة لأنظمة التتبع الآلي مع ضمان أعلى نسب القبول
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>متوافق 100% مع ATS</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-success" />
                <span>قوالب احترافية</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-success" />
                <span>إنشاء فوري</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-6 shadow-strong transition-smooth"
                onClick={() => window.location.href = '/cv-builder'}
              >
                ابدأ الآن مجاناً
                <ArrowRight className="mr-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary font-semibold text-lg px-8 py-6 transition-smooth"
              >
                شاهد الأمثلة
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-strong">
              <img 
                src={heroImage} 
                alt="منصة إنشاء السير الذاتية المتوافقة مع ATS"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg p-4 shadow-medium">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                <span className="text-sm font-medium text-foreground">ATS Score: 98%</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-4 shadow-medium">
              <div className="text-sm font-medium text-foreground">
                +5000 سيرة ذاتية ناجحة
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;