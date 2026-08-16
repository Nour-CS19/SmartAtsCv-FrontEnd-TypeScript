import { Link } from "react-router-dom";
import { FileText, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/80 text-white backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-lg shadow-primary/25"><FileText className="h-5 w-5" /></span>
          <span className="text-lg font-bold tracking-tight">CV Builder Pro</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <a href="#features" className="transition hover:text-white">Features</a>
          <a href="#workflow" className="transition hover:text-white">How it works</a>
          <a href="#about" className="transition hover:text-white">Why us</a>
        </nav>
        <Link to="/cv-builder" className="hidden md:block"><Button className="rounded-xl bg-white text-slate-950 hover:bg-slate-100">Build my CV</Button></Link>
        <button className="rounded-lg p-2 md:hidden" aria-label="Toggle menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
      </div>
      {isMenuOpen && <div className="border-t border-white/10 bg-slate-950 px-4 py-5 md:hidden"><nav className="container mx-auto flex flex-col gap-4 text-slate-200"><a href="#features" onClick={closeMenu}>Features</a><a href="#workflow" onClick={closeMenu}>How it works</a><a href="#about" onClick={closeMenu}>Why us</a><Link to="/cv-builder" onClick={closeMenu}><Button className="mt-2 w-full rounded-xl bg-gradient-primary text-white">Build my CV</Button></Link></nav></div>}
    </header>
  );
};

export default Header;
