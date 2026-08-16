import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, FileText, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-cv-builder.jpg";

const HeroSection = () => (
  <section className="relative overflow-hidden bg-slate-950 pt-32 text-white lg:pt-40">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(217_91%_50%_/_0.28),transparent_35%),radial-gradient(circle_at_80%_20%,hsl(245_80%_60%_/_0.2),transparent_30%)]" />
    <div className="container relative mx-auto grid min-h-[680px] items-center gap-14 px-4 pb-24 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-8 text-center lg:text-left">
        <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-blue-100 lg:mx-0"><Sparkles className="h-4 w-4 text-cyan-300" /> Built for modern job seekers</div>
        <div className="space-y-5"><h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">Build a CV that gets noticed <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">and passes ATS screening.</span></h1><p className="mx-auto max-w-xl text-lg leading-8 text-slate-300 lg:mx-0">Create a polished, recruiter-friendly resume in minutes with guided sections, smart suggestions, and a live preview.</p></div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-300 lg:justify-start"><span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-400" /> ATS-friendly structure</span><span className="flex items-center gap-2"><FileText className="h-4 w-4 text-emerald-400" /> Professional templates</span><span className="flex items-center gap-2"><Zap className="h-4 w-4 text-emerald-400" /> Ready in minutes</span></div>
        <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"><Link to="/cv-builder"><Button size="lg" className="rounded-xl bg-white px-7 text-base font-semibold text-slate-950 shadow-2xl shadow-blue-950/50 hover:bg-slate-100">Start building for free <ArrowRight className="ml-2 h-5 w-5" /></Button></Link><a href="#features"><Button size="lg" variant="outline" className="rounded-xl border-white/25 bg-white/5 px-7 text-base text-white hover:bg-white/10">Explore features</Button></a></div>
      </div>
      <div className="relative mx-auto w-full max-w-xl lg:ml-auto"><div className="absolute -inset-6 rounded-[2rem] bg-blue-500/20 blur-3xl" /><div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-2 shadow-2xl"><img src={heroImage} alt="Resume builder preview" className="w-full rounded-2xl" /></div><div className="absolute -bottom-6 -left-4 rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 shadow-xl sm:-left-8"><p className="text-xs font-medium text-slate-500">Your ATS score</p><p className="text-2xl font-bold text-emerald-600">98% <span className="text-sm font-medium">Excellent</span></p></div></div>
    </div>
  </section>
);

export default HeroSection;
