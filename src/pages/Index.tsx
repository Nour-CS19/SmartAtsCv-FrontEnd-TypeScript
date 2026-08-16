import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Sparkles,
  Search,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  Users,
  ShieldCheck,
  Star,
  Layers,
  Bot
} from "lucide-react";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-blue-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.blue.100),transparent)] dark:bg-[radial-gradient(45rem_50rem_at_top,theme(colors.blue.950),transparent)] opacity-60" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Hero Column */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                
                <Badge className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-semibold">
                  <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Next-Gen AI Resume & ATS Optimization Suite</span>
                </Badge>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                  Build Resumes That <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Beat The ATS</span> & Land Interviews.
                </h1>

                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Over 75% of resumes are rejected by applicant tracking systems before a human sees them. SmartATS optimizes your resume keywords, formatting, and impact metrics in real time.
                </p>

                {/* Hero CTAs */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link to="/cv-builder" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold h-13 px-8 rounded-xl shadow-lg shadow-blue-500/25 gap-2 text-base">
                      <FileText className="h-5 w-5" /> Build ATS Resume Now
                    </Button>
                  </Link>
                  <Link to="/ats-analyzer" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-300 dark:border-slate-700 h-13 px-6 rounded-xl font-semibold text-slate-700 dark:text-slate-200 gap-2 text-base">
                      <Search className="h-4 w-4 text-blue-600" /> Scan Existing Resume
                    </Button>
                  </Link>
                </div>

                {/* Social Proof Stats */}
                <div className="pt-6 flex items-center justify-center lg:justify-start gap-8 text-xs font-semibold text-slate-500 dark:text-slate-400 border-t border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>99.2% ATS Parser Success</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span>3.4x More Callbacks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    <span>4.9/5 Rating (12k+ Users)</span>
                  </div>
                </div>

              </div>

              {/* Right Hero Preview Card */}
              <div className="lg:col-span-5">
                <Card className="relative overflow-hidden border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl rounded-2xl">
                  
                  {/* Card Header Badge */}
                  <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-bold tracking-wide uppercase">Live ATS Score Scanner</span>
                    </div>
                    <Badge className="bg-blue-600 text-white text-[10px]">AI Active</Badge>
                  </div>

                  {/* Card Content Mockup */}
                  <CardContent className="p-6 space-y-6">
                    
                    {/* Score Bar */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Target Job Match</p>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white">Senior Software Engineer</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">96%</span>
                        <p className="text-[10px] text-emerald-600 font-semibold">Ready for Recruiter</p>
                      </div>
                    </div>

                    {/* Detected Keywords */}
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Matched Industry Keywords</p>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 text-xs">✓ React / TypeScript</Badge>
                        <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 text-xs">✓ Next.js Architecture</Badge>
                        <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 text-xs">✓ REST APIs & GraphQL</Badge>
                        <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 text-xs">✓ Agile Development</Badge>
                      </div>
                    </div>

                    {/* Action Suggestion */}
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2.5">
                      <Bot className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>AI Insight:</strong> Added 3 bullet metrics. Formatting verified against Taleo, Greenhouse, and Workday ATS algorithms.</span>
                    </div>

                    <Link to="/cv-builder">
                      <Button className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold rounded-xl h-11 gap-2">
                        Try Building Your Resume <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>

                  </CardContent>

                </Card>
              </div>

            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-12">
            
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-none px-3 py-1">
                Everything You Need
              </Badge>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Designed for Maximum Hiring Impact
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-base">
                Tools specifically engineered to pass automated screening software and impress hiring managers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <Card className="border-slate-200 dark:border-slate-800 p-6 space-y-4 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400 flex items-center justify-center">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Smart ATS Keyword Scanner</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Paste target job descriptions to identify missing technical keywords and hard skills before you hit apply.
                </p>
              </Card>

              <Card className="border-slate-200 dark:border-slate-800 p-6 space-y-4 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 flex items-center justify-center">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">AI Experience Bullet Assistant</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Turn basic responsibilities into high-impact metric statements (e.g. "Increased platform conversion by 35%").
                </p>
              </Card>

              <Card className="border-slate-200 dark:border-slate-800 p-6 space-y-4 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">100% Parseable Templates</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Clean single-column & double-column layouts tested against major ATS parsers without broken tables or graphics.
                </p>
              </Card>

            </div>

          </div>
        </section>

        {/* CTA BANNER */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Upgrade Your Resume and Get Hired?
            </h2>
            <p className="text-blue-100 text-base sm:text-lg max-w-xl mx-auto">
              Join thousands of job seekers who landed interviews at top tech companies using SmartATS CV Builder.
            </p>
            <div className="pt-2 flex justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-slate-100 font-bold h-13 px-8 rounded-xl shadow-md text-base">
                  Create Your Resume Free →
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Index;
