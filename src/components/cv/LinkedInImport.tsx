import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { CVData } from "@/pages/CVBuilder";
import { 
  Download, 
  ExternalLink, 
  Info, 
  Globe, 
  Loader2, 
  CheckCircle, 
  AlertTriangle 
} from "lucide-react";

interface LinkedInImportProps {
  onDataUpdate: (data: Partial<CVData>) => void;
}

const LinkedInImport = ({ onDataUpdate }: LinkedInImportProps) => {
  const { toast } = useToast();
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [importStatus, setImportStatus] = useState<"idle" | "success" | "error">("idle");

  const handleImport = async () => {
    if (!linkedinUrl.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال رابط الملف الشخصي على LinkedIn",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setImportStatus("idle");

    try {
      // محاكاة استيراد البيانات من LinkedIn
      // في التطبيق الحقيقي، ستحتاج إلى API للوصول إلى بيانات LinkedIn
      await new Promise(resolve => setTimeout(resolve, 2000));

      // بيانات تجريبية كمثال
      const mockLinkedInData: Partial<CVData> = {
        personalInfo: {
          fullName: "أحمد محمد علي",
          email: "ahmed.mohamed@example.com",
          phone: "+20123456789",
          location: "القاهرة، مصر",
          summary: "مطور برمجيات متخصص في تطوير تطبيقات الويب باستخدام React و Node.js مع خبرة تزيد عن 5 سنوات في مجال التكنولوجيا",
          linkedIn: linkedinUrl,
        },
        experience: [
          {
            company: "شركة التكنولوجيا المتقدمة",
            position: "مطور أول",
            startDate: "2021-01-01",
            endDate: "",
            current: true,
            description: "تطوير وصيانة تطبيقات الويب باستخدام React و TypeScript، إدارة فريق من 3 مطورين، تحسين الأداء وتجربة المستخدم"
          },
          {
            company: "ستارت أب تك",
            position: "مطور برمجيات",
            startDate: "2019-06-01",
            endDate: "2020-12-31",
            current: false,
            description: "تطوير واجهات المستخدم التفاعلية، بناء APIs باستخدام Node.js، العمل مع قواعد البيانات NoSQL"
          }
        ],
        education: [
          {
            institution: "جامعة القاهرة",
            degree: "بكالوريوس",
            field: "هندسة الحاسوب",
            startDate: "2015-09-01",
            endDate: "2019-05-31",
            grade: "جيد جداً"
          }
        ],
        skills: [
          "React",
          "TypeScript",
          "Node.js",
          "Python",
          "MongoDB",
          "Git",
          "Docker",
          "AWS"
        ]
      };

      onDataUpdate(mockLinkedInData);
      setImportStatus("success");
      
      toast({
        title: "تم الاستيراد بنجاح!",
        description: "تم استيراد بياناتك من LinkedIn بنجاح",
      });

    } catch (error) {
      setImportStatus("error");
      toast({
        title: "فشل في الاستيراد",
        description: "حدث خطأ أثناء استيراد البيانات من LinkedIn",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-blue-600" />
            </div>
            استيراد من LinkedIn
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              أدخل رابط ملفك الشخصي على LinkedIn وسنقوم باستيراد بياناتك تلقائياً لإنشاء سيرتك الذاتية
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div>
              <Label htmlFor="linkedin-url">رابط الملف الشخصي على LinkedIn</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="linkedin-url"
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://www.linkedin.com/in/your-profile"
                  className="flex-1"
                />
                <Button
                  onClick={handleImport}
                  disabled={isLoading || !linkedinUrl.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin ml-2" />
                      جاري الاستيراد...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 ml-2" />
                      استيراد البيانات
                    </>
                  )}
                </Button>
              </div>
            </div>

            {importStatus === "success" && (
              <Alert className="border-success/20 bg-success/5">
                <CheckCircle className="h-4 w-4 text-success" />
                <AlertDescription className="text-success-foreground">
                  تم استيراد بياناتك بنجاح! يمكنك الآن مراجعة وتعديل المعلومات قبل إنشاء السيرة الذاتية.
                </AlertDescription>
              </Alert>
            )}

            {importStatus === "error" && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  فشل في استيراد البيانات. تأكد من صحة الرابط وحاول مرة أخرى.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* معلومات إضافية */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">نصائح لأفضل النتائج</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="mt-1">1</Badge>
              <p className="text-sm text-muted-foreground">
                تأكد من أن ملفك الشخصي على LinkedIn محدث ومكتمل
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="mt-1">2</Badge>
              <p className="text-sm text-muted-foreground">
                استخدم رابط الملف الشخصي العام (Public Profile URL)
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="mt-1">3</Badge>
              <p className="text-sm text-muted-foreground">
                بعد الاستيراد، راجع البيانات وعدلها حسب الحاجة لضمان الدقة
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <Button variant="outline" className="w-full" asChild>
              <a 
                href="https://www.linkedin.com/help/linkedin/answer/a542685" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                كيفية الحصول على رابط الملف الشخصي
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LinkedInImport;