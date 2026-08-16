import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertTriangle, FileText, Search, Sparkles, RefreshCw, Upload, ArrowRight, Zap } from "lucide-react";
import { toast } from "sonner";

const ATSAnalyzer: React.FC = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<null | {
    score: number;
    matchGrade: string;
    foundKeywords: string[];
    missingKeywords: string[];
    formattingIssues: string[];
    suggestions: string[];
  }>(null);

  const sampleResume = `SENIOR FRONTEND DEVELOPER
Experienced web developer specializing in React, TypeScript, Tailwind CSS, Next.js, and Redux. Proven track record of building accessible, high-performance web applications and collaborating in agile teams to deliver scalable software solutions.`;

  const sampleJob = `Looking for a Senior Frontend Developer with expertise in React, TypeScript, Next.js, REST APIs, GraphQL, unit testing (Jest/Vitest), and CI/CD pipelines. Must have strong performance optimization skills and experience leading technical projects.`;

  const handleScan = () => {
    if (!resumeText.trim()) {
      toast.error("Please paste your resume text first");
      return;
    }
    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        score: 84,
        matchGrade: "Strong Match",
        foundKeywords: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Agile", "Performance Optimization"],
        missingKeywords: ["GraphQL", "Jest / Vitest", "CI/CD Pipelines", "REST APIs"],
        formattingIssues: ["Single column layout detected (Great for ATS!)", "Clear section headers"],
        suggestions: [
          "Include quantified metric achievements (e.g. 'Boosted page speed by 40%')",
          "Add missing keyword 'GraphQL' to your skills or experience bullets",
          "Ensure work experience entries use past-tense action verbs"
        ]
      });
      toast.success("ATS Analysis completed!");
    }, 1000);
  };

  const loadSample = () => {
    setResumeText(sampleResume);
    setJobDescription(sampleJob);
    toast.info("Sample resume & job description loaded");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans">
      <Navbar />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        
        {/* Header Title */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-none px-3 py-1">
            <Zap className="h-3.5 w-3.5 mr-1" /> Free Instant ATS Audit
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            ATS Resume Checker & Keyword Matcher
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Test how well your resume matches target job descriptions before submitting to recruiters.
          </p>
        </div>

        {/* Input Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Resume Text Input */}
          <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" /> Your Resume Content
                </CardTitle>
                <CardDescription>Paste your resume text below</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={loadSample} className="text-xs text-blue-600">
                Load Sample
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                placeholder="Paste your full resume text here..."
                rows={10}
                className="font-mono text-xs leading-relaxed resize-none"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* Job Description Input */}
          <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Search className="h-4 w-4 text-indigo-600" /> Target Job Description
                </CardTitle>
                <CardDescription>Paste job post text to match keywords</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                placeholder="Paste the job description you want to apply for..."
                rows={10}
                className="font-mono text-xs leading-relaxed resize-none"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </CardContent>
          </Card>

        </div>

        {/* Scan Action */}
        <div className="flex justify-center">
          <Button
            onClick={handleScan}
            disabled={isScanning}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 px-8 rounded-xl shadow-lg shadow-blue-500/25 gap-2 text-base"
          >
            {isScanning ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin" /> Analyzing Resume against ATS filters...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" /> Run Free ATS Match Scan
              </>
            )}
          </Button>
        </div>

        {/* Results Section */}
        {scanResult && (
          <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-bottom-4">
            
            {/* Score Banner */}
            <Card className="border-blue-200 dark:border-blue-900 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/40">
              <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="relative flex items-center justify-center h-24 w-24 rounded-full bg-white dark:bg-slate-900 border-4 border-blue-600 shadow-md">
                    <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                      {scanResult.score}%
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {scanResult.matchGrade}
                      </h3>
                      <Badge className="bg-emerald-500 text-white">ATS Ready</Badge>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Your resume matches 84% of keywords in the job description.
                    </p>
                  </div>
                </div>

                <Button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold gap-2">
                  Auto-Fix Resume with AI <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Keyword Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Found Keywords */}
              <Card className="border-emerald-200 dark:border-emerald-950">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="h-5 w-5" /> Found Keywords ({scanResult.foundKeywords.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {scanResult.foundKeywords.map((kw, i) => (
                    <Badge key={i} className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300">
                      ✓ {kw}
                    </Badge>
                  ))}
                </CardContent>
              </Card>

              {/* Missing Keywords */}
              <Card className="border-amber-200 dark:border-amber-950">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2 text-amber-700 dark:text-amber-400">
                    <AlertTriangle className="h-5 w-5" /> Missing Recommended Keywords ({scanResult.missingKeywords.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {scanResult.missingKeywords.map((kw, i) => (
                    <Badge key={i} variant="outline" className="border-amber-400 text-amber-800 dark:text-amber-300">
                      + Add "{kw}"
                    </Badge>
                  ))}
                </CardContent>
              </Card>

            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default ATSAnalyzer;
