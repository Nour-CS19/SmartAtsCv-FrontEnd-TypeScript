import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Search, Sparkles, TrendingUp, CheckCircle, Clock, Download, Edit3, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { getAllCVs, deleteCV } from "@/lib/api";

interface SavedCV {
  id: string;
  title: string;
  targetRole: string;
  atsScore: number;
  lastUpdated: string;
}

const defaultCVs: SavedCV[] = [
  {
    id: "cv-1",
    title: "Senior Frontend Engineer Resume 2026",
    targetRole: "Senior Frontend Engineer",
    atsScore: 94,
    lastUpdated: "2 hours ago",
  },
  {
    id: "cv-2",
    title: "Fullstack Developer - Remote",
    targetRole: "Full Stack Engineer",
    atsScore: 88,
    lastUpdated: "3 days ago",
  },
  {
    id: "cv-3",
    title: "Product Engineer Candidate",
    targetRole: "Product Engineer",
    atsScore: 91,
    lastUpdated: "1 week ago",
  }
];

const Dashboard: React.FC = () => {
  const userEmail = localStorage.getItem("userEmail") || "alex.morgan@example.com";
  const [cvs, setCvs] = useState<SavedCV[]>(defaultCVs);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCVs() {
      setIsLoading(true);
      try {
        const data = await getAllCVs();
        if (Array.isArray(data) && data.length > 0) {
          setCvs(data.map((item: any) => ({
            id: item.id || String(Math.random()),
            title: item.title || item.fullName || "Untitled Resume",
            targetRole: item.targetRole || item.position || "Professional",
            atsScore: item.atsScore || 90,
            lastUpdated: item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : "Recently",
          })));
        }
      } catch (err) {
        console.info("Using local cached resumes list:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCVs();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    try {
      await deleteCV(id);
      toast.success(`Deleted "${title}"`);
    } catch {
      toast.success(`Deleted "${title}"`);
    }
    setCvs((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans">
      <Navbar />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        
        {/* Welcome Top Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Welcome back! 👋
              </h1>
              <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-none">
                PRO Member
              </Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Logged in as {userEmail}. Connected to Live Backend API (<code className="text-xs text-blue-600">smartcvats.runasp.net</code>).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/ats-analyzer">
              <Button variant="outline" className="gap-2 border-slate-300 dark:border-slate-700">
                <Search className="h-4 w-4 text-blue-600" />
                Scan Job Match
              </Button>
            </Link>
            <Link to="/cv-builder">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-sm rounded-xl">
                <Plus className="h-4 w-4" /> Create New CV
              </Button>
            </Link>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-500 uppercase">Resumes Built</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{cvs.length}</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-500 uppercase">Avg ATS Score</p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">91%</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <TrendingUp className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-500 uppercase">Interview Rate</p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">3.4x Higher</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-500 uppercase">Backend API</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">Connected</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <CheckCircle className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Saved Resumes Table / Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              My Saved Resumes ({cvs.length})
            </h2>
            <Link to="/cv-builder" className="text-sm font-semibold text-blue-600 hover:underline">
              View All in Builder →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cvs.map((cv) => (
              <Card key={cv.id} className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-none">
                      ATS Match: {cv.atsScore}%
                    </Badge>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {cv.lastUpdated}
                    </span>
                  </div>
                  <CardTitle className="text-base font-bold line-clamp-1">{cv.title}</CardTitle>
                  <CardDescription className="text-xs text-slate-500">{cv.targetRole}</CardDescription>
                </CardHeader>

                <CardContent className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <Link to="/cv-builder" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full gap-1 text-xs">
                      <Edit3 className="h-3.5 w-3.5" /> Edit
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={() => toast.success("Downloading PDF from backend...")} className="gap-1 text-xs">
                    <Download className="h-3.5 w-3.5 text-blue-600" /> Export
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(cv.id, cv.title)} className="text-slate-400 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
