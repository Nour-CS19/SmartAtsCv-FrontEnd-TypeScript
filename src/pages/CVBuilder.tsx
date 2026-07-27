import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Eye, FileText, Link, Loader2, PenTool } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ManualDataForm from "@/components/cv/ManualDataForm";
import LinkedInImport from "@/components/cv/LinkedInImport";
import AutoCreateForm from "@/components/cv/AutoCreateForm";
import CVPreview from "@/components/cv/CVPreview";
import { useToast } from "@/components/ui/use-toast";

export interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    linkedIn?: string;
    website?: string;
  };
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    grade?: string;
  }>;
  skills: string[];
  languages: Array<{
    language: string;
    level: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    url?: string;
  }>;
}

const CVBuilder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const previewRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
    experience: [],
    education: [],
    skills: [],
    languages: [],
    certifications: [],
  });
  const [activeTab, setActiveTab] = useState("manual");
  const [showPreview, setShowPreview] = useState(false);

  const handleDataUpdate = (newData: Partial<CVData>) => {
    setCvData(prev => ({ ...prev, ...newData }));
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;

    setIsExporting(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = cvData.personalInfo.fullName
        ? `CV-${cvData.personalInfo.fullName.replace(/\s+/g, "-")}.pdf`
        : "CV.pdf";
      pdf.save(fileName);

      toast({
        title: "تم التحميل",
        description: "تم تحميل السيرة الذاتية بصيغة PDF بنجاح",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إنشاء ملف PDF، حاول مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <div className="bg-white border-b border-border/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                العودة للرئيسية
              </Button>
              <div className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">منشئ السيرة الذاتية</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                {showPreview ? "إخفاء المعاينة" : "معاينة"}
              </Button>
              <Button 
                className="bg-gradient-primary text-white flex items-center gap-2"
                disabled={!cvData.personalInfo.fullName || isExporting}
                onClick={handleDownloadPDF}
              >
                {isExporting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                {isExporting ? "جاري التحميل..." : "تحميل PDF"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className={`grid gap-8 ${showPreview ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} transition-all duration-300`}>
          {/* Input Section */}
          <div className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-center text-xl">اختر طريقة إنشاء سيرتك الذاتية</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="manual" className="flex items-center gap-2">
                      <PenTool className="w-4 h-4" />
                      إدخال يدوي
                    </TabsTrigger>
                    <TabsTrigger value="linkedin" className="flex items-center gap-2">
                      <Link className="w-4 h-4" />
                      من LinkedIn
                    </TabsTrigger>
                    <TabsTrigger value="auto" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      إنشاء تلقائي
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="manual" className="mt-6">
                    <ManualDataForm cvData={cvData} onDataUpdate={handleDataUpdate} />
                  </TabsContent>

                  <TabsContent value="linkedin" className="mt-6">
                    <LinkedInImport onDataUpdate={handleDataUpdate} />
                  </TabsContent>

                  <TabsContent value="auto" className="mt-6">
                    <AutoCreateForm onDataUpdate={handleDataUpdate} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="space-y-6">
              <CVPreview ref={previewRef} cvData={cvData} />
            </div>
          )}
        </div>

        {/* Off-screen copy used for PDF export when the visual preview is hidden */}
        {!showPreview && (
          <div className="fixed -left-[9999px] top-0 w-[800px]">
            <CVPreview ref={previewRef} cvData={cvData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CVBuilder;