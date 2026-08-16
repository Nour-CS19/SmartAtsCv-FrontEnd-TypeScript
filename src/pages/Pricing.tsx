import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Free Starter",
      priceMonthly: "$0",
      priceAnnual: "$0",
      description: "Essential tools to create your first ATS-friendly resume.",
      features: [
        "1 ATS Resume Template",
        "Basic Keyword Scanner",
        "Export to TXT & Standard PDF",
        "Real-Time Live Preview",
        "Manual Data Editor"
      ],
      ctaText: "Start For Free",
      ctaVariant: "outline" as const,
      popular: false,
    },
    {
      name: "Pro Career Pass",
      priceMonthly: "$12",
      priceAnnual: "$8",
      description: "Everything you need to beat ATS filters and land interviews fast.",
      features: [
        "Unlimited ATS Resumes",
        "AI Auto-Create from LinkedIn / Job Post",
        "Advanced ATS Score & Bullet Optimizer",
        "All 10+ Premium Resume Templates",
        "Unlimited PDF & DOCX Exports",
        "Cover Letter Generator (AI)",
        "Priority Customer Support"
      ],
      ctaText: "Get Pro Access",
      ctaVariant: "default" as const,
      popular: true,
    },
    {
      name: "Executive & Team",
      priceMonthly: "$29",
      priceAnnual: "$19",
      description: "Tailored for senior executives, consultants, and career coaches.",
      features: [
        "Everything in Pro Pass",
        "1-on-1 Human Resume Review (1/mo)",
        "Custom Branding & Formatting",
        "Multi-profile Career Management",
        "Dedicated Account Manager",
        "Guaranteed 95%+ ATS Score Guarantee"
      ],
      ctaText: "Get Executive Plan",
      ctaVariant: "outline" as const,
      popular: false,
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-none px-3 py-1">
            <Zap className="h-3.5 w-3.5 mr-1" /> Transparent & Simple Pricing
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Invest in Your Next Career Move
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Choose a plan to create recruiter-approved, ATS-optimized resumes that get you hired.
          </p>

          {/* Billing Switcher */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${!isAnnual ? "text-slate-900 dark:text-white font-bold" : "text-slate-500"}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out bg-blue-600 focus:outline-none"
              role="switch"
              aria-checked={isAnnual}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isAnnual ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? "text-slate-900 dark:text-white font-bold" : "text-slate-500"}`}>
              Annual Billing <Badge className="ml-1 bg-emerald-500 text-white text-[10px]">Save 33%</Badge>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col justify-between border-slate-200 dark:border-slate-800 transition-all duration-300 ${
                plan.popular
                  ? "border-blue-500 dark:border-blue-500 shadow-xl ring-2 ring-blue-500/20 bg-white dark:bg-slate-900"
                  : "bg-white dark:bg-slate-900"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-none font-bold px-3 py-1 shadow-md">
                    <Sparkles className="h-3 w-3 mr-1" /> Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="pt-8 pb-4">
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-xs text-slate-500">{plan.description}</CardDescription>
                <div className="pt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    {isAnnual ? plan.priceAnnual : plan.priceMonthly}
                  </span>
                  <span className="text-sm text-slate-500 font-medium">/ month</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 flex-1">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">What's included:</p>
                <ul className="space-y-2.5 text-sm">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <Link to="/register" className="w-full">
                  <Button
                    variant={plan.ctaVariant}
                    className={`w-full rounded-xl font-semibold h-11 ${
                      plan.popular ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20" : ""
                    }`}
                  >
                    {plan.ctaText}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
