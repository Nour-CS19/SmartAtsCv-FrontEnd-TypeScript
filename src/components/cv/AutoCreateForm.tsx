import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { CVData } from "@/pages/CVBuilder";
import { 
  Sparkles, 
  Loader2, 
  CheckCircle, 
  Info, 
  Target,
  Zap 
} from "lucide-react";

interface AutoCreateFormProps {
  onDataUpdate: (data: Partial<CVData>) => void;
}

const AutoCreateForm = ({ onDataUpdate }: AutoCreateFormProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    industry: "",
    experience: "",
    skills: "",
    achievements: "",
    targetJob: "",
  });

  const industries = [
    "تكنولوجيا المعلومات",
    "الهندسة",
    "الطب والصحة",
    "التعليم",
    "المالية والمصرفية",
    "التسويق والإعلان",
    "المبيعات",
    "الموارد البشرية",
    "القانون",
    "الأعمال والإدارة",
    "الفنون والتصميم",
    "الإعلام والصحافة"
  ];

  const experienceLevels = [
    "مبتدئ (0-2 سنة)",
    "متوسط (2-5 سنوات)",
    "متقدم (5-10 سنوات)",
    "خبير (أكثر من 10 سنوات)"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateCV = async () => {
    if (!formData.jobTitle || !formData.industry || !formData.experience) {
      toast({
        title: "معلومات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // محاكاة عملية الإنشاء بالذكاء الاصطناعي
      await new Promise(resolve => setTimeout(resolve, 3000));

      // بيانات مولدة بناءً على المدخلات
      const generatedData: Partial<CVData> = {
        personalInfo: {
          fullName: "المرشح المحترف",
          email: "professional@example.com",
          phone: "+201234567890",
          location: "القاهرة، مصر",
          summary: `${formData.jobTitle} محترف في مجال ${formData.industry} مع خبرة ${formData.experience}. متخصص في ${formData.skills} مع سجل حافل من الإنجازات المتميزة. أسعى للحصول على منصب ${formData.targetJob} لتطبيق خبراتي ومهاراتي في بيئة عمل ديناميكية ومبتكرة.`,
        },
        experience: [
          {
            company: `شركة ${formData.industry} الرائدة`,
            position: formData.jobTitle,
            startDate: "2020-01-01",
            endDate: "",
            current: true,
            description: `قيادة المشاريع في مجال ${formData.industry}، تطوير الاستراتيجيات المبتكرة، ${formData.achievements}. تحقيق نتائج متميزة وتجاوز الأهداف المحددة بنسبة 25%.`
          },
          {
            company: `مؤسسة ${formData.industry} المتقدمة`,
            position: `${formData.jobTitle} مساعد`,
            startDate: "2018-06-01",
            endDate: "2019-12-31",
            current: false,
            description: `المساهمة في تطوير ${formData.skills}، دعم العمليات اليومية، المشاركة في تحسين الإجراءات والعمليات.`
          }
        ],
        education: [
          {
            institution: "جامعة محترمة",
            degree: "بكالوريوس",
            field: `تخصص متعلق بـ ${formData.industry}`,
            startDate: "2014-09-01",
            endDate: "2018-05-31",
            grade: "جيد جداً"
          }
        ],
        skills: formData.skills.split(",").map(skill => skill.trim()).filter(Boolean),
        languages: [
          {
            language: "العربية",
            level: "اللغة الأم"
          },
          {
            language: "الإنجليزية",
            level: "متقدم"
          }
        ],
        certifications: [
          {
            name: `شهادة احترافية في ${formData.industry}`,
            issuer: "مؤسسة معتمدة",
            date: "2023-01-01"
          }
        ]
      };

      onDataUpdate(generatedData);
      
      toast({
        title: "تم إنشاء السيرة الذاتية!",
        description: "تم إنشاء سيرتك الذاتية بنجاح باستخدام الذكاء الاصطناعي",
      });

    } catch (error) {
      toast({
        title: "فشل في الإنشاء",
        description: "حدث خطأ أثناء إنشاء السيرة الذاتية",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Alert>
        <Sparkles className="h-4 w-4" />
        <AlertDescription>
          أدخل معلوماتك الأساسية وسيقوم الذكاء الاصطناعي بإنشاء سيرة ذاتية محترفة ومحسنة لنظام ATS
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            الإنشاء التلقائي بالذكاء الاصطناعي
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="jobTitle">المسمى الوظيفي الحالي *</Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                placeholder="مثال: مطور برمجيات، مهندس مدني، مدير تسويق"
              />
            </div>
            
            <div>
              <Label htmlFor="industry">المجال/الصناعة *</Label>
              <Select
                value={formData.industry}
                onValueChange={(value) => handleInputChange("industry", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر مجال عملك" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="experience">مستوى الخبرة *</Label>
              <Select
                value={formData.experience}
                onValueChange={(value) => handleInputChange("experience", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="حدد مستوى خبرتك" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="targetJob">الوظيفة المستهدفة</Label>
              <Input
                id="targetJob"
                value={formData.targetJob}
                onChange={(e) => handleInputChange("targetJob", e.target.value)}
                placeholder="الوظيفة التي تريد التقدم لها"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="skills">المهارات الرئيسية</Label>
            <Input
              id="skills"
              value={formData.skills}
              onChange={(e) => handleInputChange("skills", e.target.value)}
              placeholder="اكتب مهاراتك مفصولة بفاصلة (مثال: JavaScript, React, Node.js)"
            />
          </div>

          <div>
            <Label htmlFor="achievements">إنجازاتك الرئيسية</Label>
            <Textarea
              id="achievements"
              value={formData.achievements}
              onChange={(e) => handleInputChange("achievements", e.target.value)}
              placeholder="اذكر أهم إنجازاتك ونجاحاتك المهنية..."
              rows={4}
            />
          </div>

          <Button 
            onClick={generateCV}
            disabled={isGenerating}
            className="w-full bg-gradient-primary text-white text-lg py-6"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin ml-2" />
                جاري إنشاء السيرة الذاتية...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 ml-2" />
                إنشاء السيرة الذاتية بالذكاء الاصطناعي
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* مميزات الإنشاء التلقائي */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            مميزات الإنشاء التلقائي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="bg-success/10 border-success/30 text-success mt-1">
                <CheckCircle className="w-3 h-3 ml-1" />
                ATS
              </Badge>
              <div>
                <h4 className="font-medium text-sm">تحسين ATS تلقائي</h4>
                <p className="text-xs text-muted-foreground">محسن لأنظمة التتبع الآلي</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary mt-1">
                <Sparkles className="w-3 h-3 ml-1" />
                AI
              </Badge>
              <div>
                <h4 className="font-medium text-sm">محتوى ذكي</h4>
                <p className="text-xs text-muted-foreground">محتوى مخصص لمجالك</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="bg-warning/10 border-warning/30 text-warning mt-1">
                <Zap className="w-3 h-3 ml-1" />
                سريع
              </Badge>
              <div>
                <h4 className="font-medium text-sm">إنشاء فوري</h4>
                <p className="text-xs text-muted-foreground">جاهز في دقائق</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="bg-accent/50 border-accent text-accent-foreground mt-1">
                <Info className="w-3 h-3 ml-1" />
                قابل للتعديل
              </Badge>
              <div>
                <h4 className="font-medium text-sm">تخصيص كامل</h4>
                <p className="text-xs text-muted-foreground">يمكن تعديله بالكامل</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutoCreateForm;