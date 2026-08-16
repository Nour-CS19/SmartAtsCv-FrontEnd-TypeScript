import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Download, 
  Eye, 
  FileCheck, 
  Lightbulb, 
  Shield,
  Sparkles,
  Target 
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "ذكاء اصطناعي متقدم",
    description: "يحلل بياناتك وينشئ محتوى محسن لكلمات مفتاحية تناسب مجالك",
    badge: "AI Powered"
  },
  {
    icon: Target,
    title: "نسبة ATS عالية",
    description: "ضمان تجاوز أنظمة التتبع الآلي بنسبة تصل إلى 98%",
    badge: "ATS Optimized"
  },
  {
    icon: Eye,
    title: "معاينة مباشرة",
    description: "شاهد سيرتك الذاتية تتشكل أمامك لحظياً مع كل تعديل",
    badge: "Live Preview"
  },
  {
    icon: Download,
    title: "تصدير PDF احترافي",
    description: "حمل سيرتك بجودة طباعة عالية ومتوافقة مع جميع المنصات",
    badge: "PDF Export"
  },
  {
    icon: Lightbulb,
    title: "اقتراحات ذكية",
    description: "نصائح وتوجيهات لتحسين محتوى سيرتك الذاتية باستمرار",
    badge: "Smart Tips"
  },
  {
    icon: Shield,
    title: "حماية البيانات",
    description: "بياناتك آمنة ومحمية بأعلى معايير الأمان والخصوصية",
    badge: "Secure"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">
              <Sparkles className="w-4 h-4 ml-2" />
              مميزات متقدمة
            </Badge>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            لماذا تختار منصتنا؟
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            نجمع بين أحدث تقنيات الذكاء الاصطناعي ومعايير ATS لضمان حصولك على أفضل النتائج
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2 border-border/50 bg-card/80 backdrop-blur-sm"
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex justify-center mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;