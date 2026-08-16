import { forwardRef } from "react";
import { Badge } from "@/components/ui/badge";
import { CVData } from "@/pages/CVBuilder";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Calendar,
  Briefcase,
  GraduationCap,
  Sparkles,
  Award,
  CheckCircle2
} from "lucide-react";

interface CVPreviewProps {
  cvData: CVData;
}

const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(({ cvData }, ref) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    if (dateString.toLowerCase() === "present" || dateString === "الآن") return "Present";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "short" 
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div 
      ref={ref} 
      className="bg-white text-slate-900 shadow-2xl rounded-none sm:rounded-xl overflow-hidden border border-slate-200 font-sans max-h-[850px] overflow-y-auto print:max-h-none print:shadow-none"
      style={{ minHeight: "842px" }} // Standard A4 ratio feel
    >
      
      {/* Sleek Modern Header Banner */}
      <div className="bg-slate-900 text-white px-8 py-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-white uppercase">
              {cvData.personalInfo.fullName || "Your Full Name"}
            </h1>
            <p className="text-blue-400 text-sm font-semibold tracking-wide uppercase">
              {cvData.experience[0]?.position || "Software Engineering Professional"}
            </p>
          </div>

          {/* Contact Details Grid */}
          <div className="flex flex-col gap-1.5 text-xs text-slate-300">
            {cvData.personalInfo.email && (
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Mail className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>{cvData.personalInfo.email}</span>
              </div>
            )}
            {cvData.personalInfo.phone && (
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Phone className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>{cvData.personalInfo.phone}</span>
              </div>
            )}
            {cvData.personalInfo.location && (
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>{cvData.personalInfo.location}</span>
              </div>
            )}
            {cvData.personalInfo.linkedIn && (
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Globe className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span className="truncate max-w-[200px]">{cvData.personalInfo.linkedIn}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-8 space-y-7">
        
        {/* Executive Summary */}
        {cvData.personalInfo.summary && (
          <section className="space-y-2">
            <h2 className="text-xs font-extrabold tracking-widest text-slate-900 uppercase flex items-center gap-2 border-b-2 border-slate-900 pb-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Professional Summary
            </h2>
            <p className="text-slate-700 leading-relaxed text-sm">
              {cvData.personalInfo.summary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {cvData.experience.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-extrabold tracking-widest text-slate-900 uppercase flex items-center gap-2 border-b-2 border-slate-900 pb-1">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" /> Work Experience
            </h2>
            <div className="space-y-4">
              {cvData.experience.map((exp, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{exp.position}</h3>
                      <p className="text-sm font-semibold text-blue-600">{exp.company}</p>
                    </div>
                    <div className="text-xs font-medium text-slate-500 flex items-center gap-1 mt-1 sm:mt-0">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}</span>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line pl-2 border-l-2 border-slate-200">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-extrabold tracking-widest text-slate-900 uppercase flex items-center gap-2 border-b-2 border-slate-900 pb-1">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" /> Education & Credentials
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {cvData.education.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{edu.degree} {edu.field ? `in ${edu.field}` : ''}</h3>
                    <p className="text-xs font-medium text-slate-600">{edu.institution}</p>
                    {edu.grade && <p className="text-[11px] text-slate-500">GPA / Honors: {edu.grade}</p>}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Core Skills */}
        {cvData.skills.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-xs font-extrabold tracking-widest text-slate-900 uppercase border-b-2 border-slate-900 pb-1">
              Skills & Core Competencies
            </h2>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {cvData.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Languages & Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          
          {/* Languages */}
          {cvData.languages.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-extrabold tracking-widest text-slate-900 uppercase border-b-2 border-slate-900 pb-1">
                Languages
              </h2>
              <ul className="space-y-1 text-xs">
                {cvData.languages.map((lang, index) => (
                  <li key={index} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{lang.language}</span>
                    <span className="text-slate-500">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Certifications */}
          {cvData.certifications.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-extrabold tracking-widest text-slate-900 uppercase border-b-2 border-slate-900 pb-1">
                Certifications
              </h2>
              <ul className="space-y-1 text-xs">
                {cvData.certifications.map((cert, index) => (
                  <li key={index} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{cert.name}</span>
                    <span className="text-slate-500">{cert.issuer}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

        </div>

        {/* ATS Quality Badge Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1 font-semibold text-emerald-600">
            <CheckCircle2 className="w-4 h-4" /> 100% ATS Compliant Single-Column Standard
          </span>
          <span className="font-mono text-[10px]">SmartATS Certified</span>
        </div>

      </div>

    </div>
  );
});

CVPreview.displayName = "CVPreview";

export default CVPreview;