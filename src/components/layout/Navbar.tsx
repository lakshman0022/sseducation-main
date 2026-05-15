import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, MessageCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import mainLogo from "@/assets/main logo.png";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Courses",
    href: "/courses",
    children: [
      { label: "B.Tech Engineering", href: "/engineering" },
      { label: "MBBS Admission", href: "/mbbs" },
      { label: "MBA / Management", href: "/courses#mba" },
      { label: "Law Admissions", href: "/courses#law" },
      { label: "BCA / MCA", href: "/courses#bca" },
      { label: "BBA / Commerce", href: "/courses#bba" },
    ],
  },
  {
    label: "Colleges",
    href: "#",
    children: [
      { label: "KIIT University", href: "/rv-college-btech-admission-2026" }, // Reusing existing paths for now
      { label: "RV College (RVCE)", href: "/rv-college-btech-admission-2026" },
      { label: "MS Ramaiah (MSRIT)", href: "/ramaiah-institute-btech-admission-2026" },
      { label: "IEM Kolkata", href: "/iem-kolkata-btech-admission-2026" },
    ],
  },
  { label: "Success Stories", href: "/results" },
  { label: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const isTransparentRoute = ["/", "/engineering", "/mbbs"].includes(location.pathname) || 
    location.pathname.includes("-admission-2026") || 
    location.pathname.startsWith("/college/");
  const isNavVisible = scrolled || !isTransparentRoute;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3",
        isNavVisible ? "bg-white/90 backdrop-blur-lg py-2" : "bg-transparent py-4",
        scrolled && "shadow-md"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="h-12 w-auto flex items-center"
          >
            <img 
              src={mainLogo} 
              alt="SS Education" 
              className="h-full w-auto object-contain brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
              style={{ filter: isNavVisible ? "none" : "brightness(0) invert(1)" }}
            />
          </motion.div>
          <div className={cn("flex flex-col leading-tight", isNavVisible ? "text-slate-900" : "text-white")}>
            <span className="font-black text-xl tracking-tight">SS EDUCATION</span>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold opacity-70">Consultancy Services</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <div
              key={link.label}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={link.href}
                className={cn(
                  "flex items-center gap-1.5 font-bold text-xs uppercase tracking-widest transition-all hover:text-primary",
                  isNavVisible ? "text-slate-700" : "text-white/90"
                )}
              >
                {link.label}
                {link.children && <ChevronDown className="h-3.5 w-3.5 opacity-50 group-hover:rotate-180 transition-transform duration-300" />}
              </Link>

              {/* Dropdown */}
              {link.children && (
                <AnimatePresence>
                  {activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-4 w-64 bg-white/95 backdrop-blur-xl rounded-[1.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden py-3 px-2"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="block px-4 py-3 text-xs font-bold text-slate-600 hover:bg-primary/5 hover:text-primary rounded-xl transition-all uppercase tracking-wider"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+919933085333"
            className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-primary/20 font-bold text-sm text-primary hover:bg-primary/5 transition-all"
          >
            <Phone className="h-4 w-4" />
            +91 99330 85333
          </a>
          <Link
            to="/contact"
            className="px-6 py-2 rounded-full bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 transition-all"
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "lg:hidden p-2 rounded-xl transition-colors",
            isNavVisible ? "text-slate-900" : "text-white"
          )}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  <Link
                    to={link.href}
                    className="text-lg font-bold text-slate-900 flex justify-between items-center"
                    onClick={() => !link.children && setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="mt-2 ml-4 flex flex-col gap-2 border-l-2 border-slate-100 pl-4">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="text-slate-600 font-medium py-1"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-4 pt-6 border-t border-slate-100 flex flex-col gap-3">
                <a
                  href="tel:+919933085333"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 font-bold text-primary"
                >
                  <Phone className="h-5 w-5" />
                  Call Support
                </a>
                <a
                  href="https://wa.me/919933085333"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500 text-white font-bold"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
