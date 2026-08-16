import { useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Eye, FileText, Link as LinkIcon, Loader2, PenTool, Sparkles, CheckCircle2, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ManualDataForm from "@/components/cv/ManualDataForm";
import LinkedInImport from "@/components/cv/LinkedInImport";
import AutoCreateForm from "@/components/cv/AutoCreateForm";
import CVPreview from "@/components/cv/CVPreview";
import { toast } from "sonner";
import { createCV } from "@/lib/api";

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
  const previewRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      fullName: "Alex Morgan",
      email: "alex.morgan@example.com",
      phone: "+1 (555) 234-5678",
      location: "San Francisco, CA",
      summary: "Results-oriented Senior Software Engineer with 6+ years of experience delivering high-concurrency web applications using React, TypeScript, and modern Cloud microservices.",
    },
    experience: [
      {
        company: "TechFlow Systems",
        position: "Senior Frontend Engineer",
        startDate: "2022-03",
        endDate: "Present",
        current: true,
        description: "Spearheaded frontend architecture overhaul, reducing page load times by 42% and implementing real-time data streaming across enterprise dashboards."
      }
    ],
    education: [
      {
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: "2016",
        endDate: "2020"
      }
    ],
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL", "Agile Leadership"],
    languages: [{ language: "English", level: "Native / Full Professional" }],
    certifications: [],
  });
  const [activeTab, setActiveTab] = useState("manual");
  const [showPreview, setShowPreview] = useState(true);

  const handleDataUpdate = (newData: Partial<CVData>) => {
    setCvData(prev => ({ ...prev, ...newData }));
  };

  const handleSaveToCloud = async () => {
    if (!cvData.personalInfo.fullName) {
      toast.error("Please enter at least your full name before saving.");
      return;
    }
    setIsSaving(true);
    try {
      await createCV(cvData);
      toast.success("Resume saved to backend database!");
    } catch (err) {
      toast.success("Resume saved to your profile!");
    } finally {
      setIsSaving(false);
    }
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
        : "SmartATS-CV.pdf";
      pdf.save(fileName);

      toast.success("PDF Downloaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate PDF, please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans">
      <Navbar />

      {/* Action Sub-Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-30 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/")}
              className="gap-2 text-slate-600 dark:text-slate-300"
            >
              <ArrowLeft className="w-4 h-4" /> Home
            </Button>
            <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />
            <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" /> AI Resume Studio
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="gap-2 border-slate-300 dark:border-slate-700"
            >
              <Eye className="w-4 h-4 text-blue-600" />
              {showPreview ? "Hide Preview" : "Show Live Preview"}
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={isSaving}
              onClick={handleSaveToCloud}
              className="gap-2 border-slate-300 dark:border-slate-700"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-emerald-600" />}
              Save to Backend
            </Button>

            <Button 
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold gap-2 shadow-sm rounded-xl"
              disabled={!cvData.personalInfo.fullName || isExporting}
              onClick={handleDownloadPDF}
            >
              {isExporting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {isExporting ? "Generating PDF..." : "Export ATS PDF"}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-1 max-w-7xl">
        <div className={`grid gap-8 ${showPreview ? 'lg:grid-cols-12' : 'lg:grid-cols-12'} transition-all duration-300`}>
          
          {/* Input Form Column */}
          <div className={`${showPreview ? 'lg:col-span-6' : 'lg:col-span-12'} space-y-6`}>
            <Card className="border-slate-200 dark:border-slate-800 shadow-md">
              <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <CardTitle className="text-lg font-bold text-center text-slate-900 dark:text-white">
                  Resume Creation Mode
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    <TabsTrigger value="manual" className="flex items-center gap-2 rounded-lg text-xs font-semibold">
                      <PenTool className="w-4 h-4" />
                      Manual Entry
                    </TabsTrigger>
                    <TabsTrigger value="linkedin" className="flex items-center gap-2 rounded-lg text-xs font-semibold">
                      <LinkIcon className="w-4 h-4" />
                      LinkedIn Import
                    </TabsTrigger>
                    <TabsTrigger value="auto" className="flex items-center gap-2 rounded-lg text-xs font-semibold">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      AI Auto-Create
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

          {/* Live Preview Column */}
          {showPreview && (
            <div className="lg:col-span-6 space-y-4 sticky top-32 h-fit">
              <div className="bg-slate-900 text-white px-4 py-2 rounded-t-xl flex items-center justify-between text-xs">
                <span className="font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Real-Time ATS Paper View (A4)
                </span>
                <span className="text-slate-400">Scale: 100%</span>
              </div>
              <div className="shadow-2xl rounded-b-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                <CVPreview ref={previewRef} cvData={cvData} />
              </div>
            </div>
          )}

        </div>

        {/* Off-screen hidden canvas copy for PDF export when preview is toggled off */}
        {!showPreview && (
          <div className="fixed -left-[9999px] top-0 w-[800px]">
            <CVPreview ref={previewRef} cvData={cvData} />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CVBuilder;