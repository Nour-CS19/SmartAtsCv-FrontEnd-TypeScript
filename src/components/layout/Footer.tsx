import React from "react";
import { Link } from "react-router-dom";
import { FileText, ShieldCheck, Sparkles, Globe, Share2, Mail } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 dark:border-slate-800 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Brand & Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md">
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Smart<span className="text-blue-400">ATS</span> CV
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Build ATS-friendly, professional resumes with AI precision. Beat the algorithms, rank higher on recruiter screens, and land your dream job faster.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="h-9 w-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                <Globe className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                <Share2 className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Product</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/cv-builder" className="hover:text-white transition-colors">AI Resume Builder</Link></li>
              <li><Link to="/ats-analyzer" className="hover:text-white transition-colors">ATS Resume Checker</Link></li>
              <li><Link to="/templates" className="hover:text-white transition-colors">Resume Templates</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing & Plans</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Resources</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#ats-guide" className="hover:text-white transition-colors">ATS Optimization Guide</a></li>
              <li><a href="#examples" className="hover:text-white transition-colors">Resume Examples</a></li>
              <li><a href="#keywords" className="hover:text-white transition-colors">Action Verbs & Keywords</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Account</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/login" className="hover:text-white transition-colors">Sign In</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Create Free Account</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">User Dashboard</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} SmartATS CV Builder. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
