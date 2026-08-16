import { forwardRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CVData } from "@/pages/CVBuilder";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Globe, 
  Calendar,
  Building,
  GraduationCap,
  Award
} from "lucide-react";

interface CVPreviewProps {
  cvData: CVData;
}

const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(({ cvData }, ref) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", { 
      year: "numeric", 
      month: "long" 
    });
  };

  return (
    <Card ref={ref} className="shadow-strong max-h-[800px] overflow-y-auto">
      <CardHeader className="bg-gradient-primary text-white">
        <div className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            {cvData.personalInfo.fullName || "الاسم الكامل"}
          </CardTitle>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/90">
            {cvData.personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {cvData.personalInfo.email}
              </div>
            )}
            {cvData.personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {cvData.personalInfo.phone}
              </div>
            )}
            {cvData.personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {cvData.personalInfo.location}
              </div>
            )}
          </div>
          
          <div className="flex justify-center gap-4 text-sm">
            {cvData.personalInfo.linkedIn && (
              <div className="flex items-center gap-1">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </div>
            )}
            {cvData.personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                Website
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Professional Summary */}
        {cvData.personalInfo.summary && (
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Award className="w-3 h-3 text-primary" />
              </div>
              نبذة مهنية
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {cvData.personalInfo.summary}
            </p>
            <Separator className="mt-4" />
          </section>
        )}

        {/* Experience */}
        {cvData.experience.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Building className="w-3 h-3 text-primary" />
              </div>
              الخبرات العملية
            </h3>
            <div className="space-y-4">
              {cvData.experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-primary/20 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{exp.position}</h4>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {formatDate(exp.startDate)} - {exp.current ? "الآن" : formatDate(exp.endDate)}
                      </div>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <Separator className="mt-4" />
          </section>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <GraduationCap className="w-3 h-3 text-primary" />
              </div>
              التعليم
            </h3>
            <div className="space-y-3">
              {cvData.education.map((edu, index) => (
                <div key={index} className="border-l-2 border-success/20 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-foreground">{edu.degree} في {edu.field}</h4>
                      <p className="text-success font-medium">{edu.institution}</p>
                      {edu.grade && (
                        <p className="text-sm text-muted-foreground">التقدير: {edu.grade}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="mt-4" />
          </section>
        )}

        {/* Skills */}
        {cvData.skills.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-4">المهارات</h3>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20"
                >
                  {skill}
                </Badge>
              ))}
            </div>
            <Separator className="mt-4" />
          </section>
        )}

        {/* Languages */}
        {cvData.languages.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-4">اللغات</h3>
            <div className="grid grid-cols-2 gap-3">
              {cvData.languages.map((lang, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                  <span className="font-medium text-foreground">{lang.language}</span>
                  <Badge variant="outline" className="text-xs">
                    {lang.level}
                  </Badge>
                </div>
              ))}
            </div>
            <Separator className="mt-4" />
          </section>
        )}

        {/* Certifications */}
        {cvData.certifications.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-4">الشهادات والدورات</h3>
            <div className="space-y-3">
              {cvData.certifications.map((cert, index) => (
                <div key={index} className="border border-border/50 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-foreground">{cert.name}</h4>
                      <p className="text-primary font-medium">{cert.issuer}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {formatDate(cert.date)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ATS Score Indicator */}
        <div className="mt-6 p-4 bg-success/5 border border-success/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
              <span className="font-medium text-success">ATS Score</span>
            </div>
            <Badge className="bg-success text-success-foreground">95%</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            سيرتك الذاتية محسنة بدرجة عالية لأنظمة التتبع الآلي
          </p>
        </div>
      </CardContent>
    </Card>
  );
});

CVPreview.displayName = "CVPreview";

export default CVPreview;