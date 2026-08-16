import { Brain, Download, Eye, Lightbulb, Shield, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const features: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Brain, title: "Smart content guidance", description: "Write clearer resume content with prompts tailored to your experience." },
  { icon: Target, title: "ATS-ready structure", description: "Use clean sections and recruiter-friendly formatting built for screening systems." },
  { icon: Eye, title: "Live preview", description: "See your resume take shape while you edit, with a layout ready to share." },
  { icon: Download, title: "Professional PDF export", description: "Download a crisp, print-ready PDF that looks great everywhere." },
  { icon: Lightbulb, title: "Actionable suggestions", description: "Get practical tips that improve clarity, impact, and consistency." },
  { icon: Shield, title: "Private by design", description: "Keep your career information in a simple and focused workflow." },
];

const FeaturesSection = () => <section id="features" className="bg-slate-50 py-24"><div className="container mx-auto px-4"><div className="mx-auto mb-14 max-w-2xl text-center"><p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">Everything you need to stand out</p><h2 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">A better way to build your next opportunity</h2><p className="mt-5 text-lg leading-8 text-slate-600">Thoughtful tools, clear layouts, and focused guidance to help you put your best experience forward.</p></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{features.map(({ icon: Icon, title, description }) => <article key={title} className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"><div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-primary transition group-hover:bg-primary group-hover:text-white"><Icon className="h-6 w-6" /></div><h3 className="mb-3 text-xl font-semibold text-slate-900">{title}</h3><p className="leading-7 text-slate-600">{description}</p></article>)}</div></div></section>;

export default FeaturesSection;
