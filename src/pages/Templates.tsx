import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Eye, ArrowRight, Star, FileText } from "lucide-react";
import { toast } from "sonner";

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  popular?: boolean;
  score: number;
  previewBg: string;
}

const templates: Template[] = [
  {
    id: "modern-ats",
    name: "Modern Executive",
    category: "Professional",
    description: "Clean single-column layout optimized for ATS parsers and corporate roles.",
    popular: true,
    score: 98,
    previewBg: "from-blue-600 to-indigo-700"
  },
  {
    id: "tech-minimal",
    name: "Tech & Software Engineer",
    category: "Engineering",
    description: "Emphasizes technical skills, project links, and github contributions.",
    popular: true,
    score: 96,
    previewBg: "from-slate-800 to-slate-900"
  },
  {
    id: "clean-classic",
    name: "Classic Academic",
    category: "Simple",
    description: "Traditional serif layout preferred by finance, law, and medical fields.",
    score: 95,
    previewBg: "from-emerald-600 to-teal-800"
  },
  {
    id: "creative-pro",
    name: "Creative Strategist",
    category: "Design & Marketing",
    description: "Subtle accent highlights for product managers, designers, and marketers.",
    score: 93,
    previewBg: "from-purple-600 to-pink-600"
  },
  {
    id: "entry-level",
    name: "Fresh Graduate & Intern",
    category: "Entry Level",
    description: "Highlights education, certifications, and academic projects.",
    score: 94,
    previewBg: "from-cyan-600 to-blue-700"
  },
  {
    id: "compact-1page",
    name: "Compact 1-Pager",
    category: "Senior Roles",
    description: "Dense 1-page format fitting 10+ years of senior executive experience.",
    score: 97,
    previewBg: "from-amber-600 to-orange-700"
  }
];

const categories = ["All", "Professional", "Engineering", "Simple", "Design & Marketing", "Entry Level"];

const Templates: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = selectedCategory === "All"
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  const handleUseTemplate = (id: string) => {
    localStorage.setItem("selectedTemplate", id);
    toast.success(`Template selected! Opening CV Builder...`);
    navigate("/cv-builder");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-none px-3 py-1">
            <Sparkles className="h-3.5 w-3.5 mr-1" /> 100% ATS Compliant Layouts
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Professional Resume Templates
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Pick a battle-tested template designed to easily pass Workday, Taleo, and Greenhouse ATS systems.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((tpl) => (
            <Card key={tpl.id} className="group overflow-hidden border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                {/* Visual Mockup Preview Box */}
                <div className={`h-56 bg-gradient-to-tr ${tpl.previewBg} p-6 flex flex-col justify-between text-white relative overflow-hidden`}>
                  {tpl.popular && (
                    <Badge className="absolute top-4 right-4 bg-amber-400 text-slate-950 font-bold border-none">
                      <Star className="h-3 w-3 mr-1 fill-slate-950" /> Most Popular
                    </Badge>
                  )}
                  <div className="flex items-center gap-2">
                    <FileText className="h-6 w-6 opacity-90" />
                    <span className="text-xs font-semibold tracking-wider uppercase opacity-80">{tpl.category}</span>
                  </div>

                  {/* Mock CV Graphic */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 space-y-2 border border-white/20">
                    <div className="h-3 w-1/2 bg-white/80 rounded" />
                    <div className="h-2 w-3/4 bg-white/50 rounded" />
                    <div className="h-2 w-full bg-white/40 rounded" />
                  </div>

                  <div className="flex items-center justify-between text-xs opacity-90 font-medium">
                    <span>ATS Pass Score</span>
                    <span className="font-bold text-emerald-300">{tpl.score}/100</span>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold">{tpl.name}</CardTitle>
                  <CardDescription className="text-xs">{tpl.description}</CardDescription>
                </CardHeader>
              </div>

              <CardFooter className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button
                  onClick={() => handleUseTemplate(tpl.id)}
                  className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-xl gap-2 font-medium"
                >
                  Use This Template <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Templates;
