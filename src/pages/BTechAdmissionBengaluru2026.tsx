import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, 
  Building2, 
  Sparkles, 
  MapPin, 
  TrendingUp, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  Phone, 
  MessageCircle, 
  Star, 
  ShieldCheck, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  DollarSign, 
  Award, 
  BookOpen, 
  Layers, 
  HelpCircle,
  FileText,
  UserCheck
} from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import bsmrImg from "@/assets/bsmr.webp";
import ramaiahImg from "@/assets/ramaiah.webp";
import rveImg from "@/assets/RVE.jpg";

const backgroundImages = [rveImg, ramaiahImg, bsmrImg];

// Form Validation Schema
const leadFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().trim().email("Enter a valid email address").max(120).optional().or(z.literal("")),
  state: z.string().min(1, "Select your state"),
  branch: z.string().min(1, "Select preferred branch"),
});

type FormDataType = z.infer<typeof leadFormSchema>;

export default function BTechAdmissionBengaluru2026() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [expandedCollege, setExpandedCollege] = useState<string | null>(null);
  const [mobileFormOpen, setMobileFormOpen] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Form states matching standard inputs
  const [formData, setFormData] = useState<Partial<FormDataType>>({
    name: "",
    phone: "",
    email: "",
    state: "",
    branch: "",
  });

  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
    // Focus first input on scroll
    setTimeout(() => {
      const nameInput = document.getElementById("lead-name");
      nameInput?.focus();
    }, 800);
  };

  const handleInputChange = (field: keyof FormDataType, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = leadFormSchema.safeParse(formData);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        if (i.path[0]) fieldErrors[String(i.path[0])] = i.message;
      });
      setErrors(fieldErrors);
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    setErrors({});
    setSubmitting(true);

    const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf5BXO45578x6q2vQzWtWMgVyXdfzmjfzmRlHO_hkqk6Li-Bw/formResponse";
    
    // Create payload
    const googleFormData = new FormData();
    googleFormData.append("entry.705613120", parsed.data.name);
    googleFormData.append("entry.1573872320", parsed.data.phone);
    googleFormData.append("entry.1062801902", parsed.data.email || "No Email Provided");
    googleFormData.append("entry.559204619", parsed.data.state);
    googleFormData.append("entry.1687284002", parsed.data.branch);

    try {
      await fetch(FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: googleFormData
      });
      setSubmitting(false);
      setSubmitted(true);
      setMobileFormOpen(false);
      toast.success("Counselling Request Submitted Successfully!");
    } catch (error) {
      setSubmitting(false);
      toast.error("Submission failed. Please check your network and try again.");
    }
  };

  // Toggle Accordion Panels
  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const toggleCollegeExpand = (collegeId: string) => {
    setExpandedCollege(expandedCollege === collegeId ? null : collegeId);
  };

  const collegesList = [
    {
      id: "rvce",
      name: "RV College of Engineering (RVCE)",
      tagline: "Unmatched Placement Records & Research Stature",
      estd: "1963",
      location: "Mysore Road, Bengaluru",
      accreditation: "NAAC A+ Grade, NBA Accredited Programs",
      placements: "₹92.0 LPA (Highest) | ₹11.4 LPA (Average)",
      recruiters: "Microsoft, Amazon, Cisco, Goldman Sachs, Intel, NVIDIA",
      branches: ["Computer Science (CSE)", "Information Science (ISE)", "AI & Machine Learning (AI-ML)", "Electronics & Comm (ECE)", "Data Science (CS-DS)", "Mechanical Eng", "Electrical & Electronics"],
      admission: "Admissions primarily via KCET (Karnataka Merit), COMEDK (National Merit), and Management Quota direct counselling support.",
      officialUrl: "https://rvce.edu.in/",
      logoInitials: "RVCE",
      colorClass: "from-blue-600 to-indigo-700"
    },
    {
      id: "ramaiah",
      name: "MS Ramaiah Institute of Technology (MSRIT) / RUAS",
      tagline: "Industrial Legacy & Prime Central Campus",
      estd: "1962",
      location: "MSR Nagar, Bengaluru North",
      accreditation: "NAAC A++ Grade, Autonomous Status under VTU",
      placements: "₹50.0 LPA (Highest) | ₹9.1 LPA (Average)",
      recruiters: "Amazon, Adobe, JP Morgan, Morgan Stanley, Qualcomm, SAP Labs",
      branches: ["Computer Science & Eng (CSE)", "Information Science (ISE)", "AI & Data Science (AI-DS)", "Electronics & Comm (ECE)", "Cyber Security (CS-CY)", "Biotechnology", "Civil Engineering"],
      admission: "Seat allocation via KCET, COMEDK, and direct institutional counselling under standard management quotas.",
      officialUrl: "https://www.msruas.ac.in/",
      logoInitials: "MSRIT",
      colorClass: "from-red-600 to-rose-700"
    },
    {
      id: "bmsce",
      name: "BMS College of Engineering (BMSCE)",
      tagline: "India's First Private Engineering Institution",
      estd: "1946",
      location: "Basavanagudi, Bengaluru Central",
      accreditation: "NAAC A++ Grade, NIRF Top 100 Ranked",
      placements: "₹48.0 LPA (Highest) | ₹8.8 LPA (Average)",
      recruiters: "Google, Microsoft, Hewlett Packard, Siemens, Bosch, Deloitte",
      branches: ["Computer Science (CSE)", "Information Science (ISE)", "AI & Machine Learning", "Electronics & Comm (ECE)", "Aerospace Engineering", "Chemical Engineering", "Electrical Eng"],
      admission: "Selection based on Karnataka KCET state counseling merit, COMEDK UGET rankings, and merit-guided direct management seats.",
      officialUrl: "https://bmsce.ac.in/home",
      logoInitials: "BMSCE",
      colorClass: "from-slate-800 to-slate-900"
    }
  ];

  const faqItems = [
    {
      q: "What are the eligibility criteria for BTech admissions in Bengaluru's top colleges?",
      a: "Candidates must have completed 10+2 or equivalent with Physics, Mathematics, and English as compulsory subjects. You need a minimum aggregate of 45% (for general category) in Physics, Mathematics, and one optional subject (Chemistry/Bio-Tech/Biology) from a recognized board. Minimum age is 17 years."
    },
    {
      q: "How are COMEDK and KCET seat quotas divided in RVCE, Ramaiah, and BMSCE?",
      a: "Typically, for private aided/unaided autonomous colleges in Karnataka like BMSCE, RVCE, and MSRIT: 45% to 50% seats are reserved for local Karnataka students via KCET counselling; 30% seats are open to all-India students via COMEDK counselling; and the remaining 15% to 20% seats are processed through institutional/Management Quota seats."
    },
    {
      q: "Can out-of-state students apply for direct admission under Management Quota?",
      a: "Yes! Students from any part of India (Non-Karnataka aspirants) can secure direct seats in RVCE, MS Ramaiah, and BMSCE under the Management Quota. Admissions are entirely merit-based, considering your 10+2 PCM marks and entrance test parameters. Booking registrations open early to secure tech branches."
    },
    {
      q: "What is the average and highest placement package in Bengaluru's top colleges?",
      a: "RVCE leads with a stellar ₹92 LPA highest package and a robust ₹11.4 LPA average package. MS Ramaiah and BMSCE are highly competitive, boasting average packages between ₹8.5 LPA to ₹9.5 LPA, with tech branch averages consistently exceeding ₹14 LPA."
    },
    {
      q: "What documents are required during counselling and verification?",
      a: "Crucial documents include: Class 10th and 12th original marks cards, Entrance Exam rank cards (KCET/COMEDK/JEE), Transfer Certificate (TC), Migration Certificate (for out-of-state students), Character Certificate, Category certificate (if applicable), and Passport size photographs."
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 overflow-x-hidden font-sans text-slate-800">
      
      {/* Search Ads Callout Banner */}
      <div className="bg-slate-900 py-3 text-center border-b border-white/5 relative z-30">
        <div className="container mx-auto px-4 flex items-center justify-center gap-3">
          <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
          <p className="text-white text-xs font-black uppercase tracking-[0.15em]">
            Direct Admissions & Counselling Registration Live for Academic Year 2026-27
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-[#0B1221] text-white pt-24 pb-32 overflow-hidden">
        {/* Background Image Slider with sliding transition */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.img 
              key={bgIndex}
              src={backgroundImages[bgIndex]} 
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Bengaluru Campus Background"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px] z-10" />
        </div>

        {/* Abstract Tech Patterns / Bengaluru Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))] z-15" />
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-15" />
        
        {/* City Skyline Decorative Graphics */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-[linear-gradient(to_top,rgba(11,18,33,1),transparent)] z-15 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-20">
          <div className="grid lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-widest mb-6"
              >
                <Sparkles className="h-4.5 w-4.5 animate-pulse" /> Bangalore Tech Campus Hub 2026
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6"
              >
                Top BTech Colleges in Bengaluru — <br />
                <span className="bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 bg-clip-text text-transparent">Get In With Expert Help</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl mb-10 mx-auto lg:mx-0"
              >
                We help students and parents pick the right college — based on rank, budget and career goals. Free counselling, zero confusion.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <a 
                  href="tel:+919933085333"
                  className="px-8 h-14 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="h-5 w-5" /> Call Now: +91 99330 85333
                </a>
                <a 
                  href="https://wa.me/919933085333"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 h-14 bg-green-500 hover:bg-green-600 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-green-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" /> WhatsApp Us
                </a>
              </motion.div>

              {/* Sub-Hero Features */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-12 pt-8 border-t border-white/15 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-rose-500 shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">100% Genuine Guidance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-rose-500 shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Fast Call Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-rose-500 shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Verified Seat Matrix</span>
                </div>
              </motion.div>
            </div>

            {/* Hero Right Lead Form */}
            <div className="lg:col-span-5 w-full max-w-md mx-auto" ref={formRef}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white text-slate-800 rounded-[2.5rem] p-8 lg:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-rose-600 text-white font-black text-[9px] uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl">
                  Quick Query
                </div>
                
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/50">
                      <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Form Submitted!</h3>
                    <p className="mt-4 text-slate-500 font-medium leading-relaxed text-sm">
                      Thank you! Our senior education counsellor will call you within 15 minutes to assist with BTech admissions in Bengaluru.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-2xl font-black text-slate-900 leading-tight mb-2 tracking-tight">Get Free Admission Guidance</h3>
                    <p className="text-xs text-slate-500 mb-6 font-medium">Verify your rank compatibility, fees matrix & direct seat availability.</p>
                    
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      
                      <div>
                        <Label htmlFor="lead-name" className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1 block">Full Name *</Label>
                        <Input 
                          id="lead-name" 
                          placeholder="E.g. Shreyas Patel" 
                          className="h-12 rounded-xl bg-slate-50 border-slate-100 font-medium focus:bg-white focus:ring-4 focus:ring-rose-500/5 focus:border-rose-500 transition-all text-slate-800"
                          value={formData.name || ""}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                        />
                        {errors.name && <p className="text-[10px] font-semibold text-rose-500 mt-1 uppercase tracking-wide">{errors.name}</p>}
                      </div>

                      <div>
                        <Label htmlFor="lead-phone" className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1 block">Phone Number *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                          <Input 
                            id="lead-phone" 
                            type="tel"
                            maxLength={10}
                            placeholder="10-Digit Mobile" 
                            className="h-12 pl-10 rounded-xl bg-slate-50 border-slate-100 font-medium focus:bg-white focus:ring-4 focus:ring-rose-500/5 focus:border-rose-500 transition-all text-slate-800"
                            value={formData.phone || ""}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                          />
                        </div>
                        {errors.phone && <p className="text-[10px] font-semibold text-rose-500 mt-1 uppercase tracking-wide">{errors.phone}</p>}
                      </div>

                      <div>
                        <Label htmlFor="lead-email" className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1 block">Email (Optional)</Label>
                        <Input 
                          id="lead-email" 
                          type="email"
                          placeholder="name@gmail.com" 
                          className="h-12 rounded-xl bg-slate-50 border-slate-100 font-medium focus:bg-white focus:ring-4 focus:ring-rose-500/5 focus:border-rose-500 transition-all text-slate-800"
                          value={formData.email || ""}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1 block">State *</Label>
                          <Select 
                            onValueChange={(val) => handleInputChange("state", val)}
                            value={formData.state || ""}
                          >
                            <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-100 font-medium focus:bg-white transition-all text-left text-slate-800">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-slate-100">
                              <SelectItem value="Bihar">Bihar</SelectItem>
                              <SelectItem value="Jharkhand">Jharkhand</SelectItem>
                              <SelectItem value="West Bengal">West Bengal</SelectItem>
                              <SelectItem value="Odisha">Odisha</SelectItem>
                              <SelectItem value="Karnataka">Karnataka</SelectItem>
                              <SelectItem value="Other">Other State</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.state && <p className="text-[10px] font-semibold text-rose-500 mt-1 uppercase tracking-wide">{errors.state}</p>}
                        </div>

                        <div>
                          <Label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1 block">Branch *</Label>
                          <Select 
                            onValueChange={(val) => handleInputChange("branch", val)}
                            value={formData.branch || ""}
                          >
                            <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-100 font-medium focus:bg-white transition-all text-left text-slate-800">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-slate-100">
                              <SelectItem value="CSE">CSE / IT</SelectItem>
                              <SelectItem value="AIML">AI / ML / Data</SelectItem>
                              <SelectItem value="ECE">Electronics</SelectItem>
                              <SelectItem value="Mechanical">Mechanical</SelectItem>
                              <SelectItem value="Civil">Civil / Allied</SelectItem>
                              <SelectItem value="Other">Others</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.branch && <p className="text-[10px] font-semibold text-rose-500 mt-1 uppercase tracking-wide">{errors.branch}</p>}
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-14 mt-4 bg-[#0B1D4B] hover:bg-[#0B1D4B]/90 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                        disabled={submitting}
                      >
                        {submitting ? "Processing..." : (<>Get Free Counselling <ArrowRight className="h-4 w-4" /></>)}
                      </Button>

                      <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-wider mt-3">
                        🔒 SECURE & CONFIDENTIAL • COUNSELLOR CALL ONLY
                      </p>
                    </form>
                  </>
                )}
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Bar (Stats) */}
      <section className="relative -mt-12 z-30 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { metric: "150+ Years", label: "Combined Academic Legacy", icon: GraduationCap, color: "text-blue-500", borderClass: "border-blue-500/20" },
            { metric: "400+", label: "Elite Recruiting Companies", icon: Building2, color: "text-amber-500", borderClass: "border-amber-500/20" },
            { metric: "₹92 LPA", label: "Highest Package Secured (RVCE)", icon: DollarSign, color: "text-rose-500", borderClass: "border-rose-500/20" },
            { metric: "NAAC A+ / A++", label: "Top-Tier Quality Accreditation", icon: Award, color: "text-indigo-500", borderClass: "border-indigo-500/20" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-xl hover:translate-y-[-4px] transition-all group flex flex-col justify-between"
            >
              <div className="flex justify-between items-start gap-2 mb-3">
                <span className={`text-2xl sm:text-3xl font-black tracking-tight text-slate-900 group-hover:${stat.color} transition-colors`}>{stat.metric}</span>
                <div className={`h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center ${stat.color} shrink-0`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 leading-snug">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Bengaluru Section */}
      <section className="py-24 bg-white relative z-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-rose-600 font-bold uppercase tracking-[0.2em] text-xs">Silicon Valley of India</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mt-3 mb-6">
              Why Bengaluru Is India's Best City for Engineering
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
              Studying in Bangalore places you at the epicenter of global technological innovation. It's not just about standard education; it's about unparalleled access to tech ecosystems, top industrial placements, and high career growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Tech Capital of India",
                desc: "Home to 67% of India's IT infrastructure, housing local and global giants like Infosys, Wipro, ISRO, and corporate offices of 400+ Fortune 500 companies.",
                highlight: "400+ Global Tech Offices"
              },
              {
                title: "Vibrant Internship Channels",
                desc: "Proximity to IT hubs like Electronic City, Whitefield, and Outer Ring Road means students get direct, real-world project internships during their course.",
                highlight: "Direct Industry Mentorship"
              },
              {
                title: "Startup & Venture Ecosystem",
                desc: "Bengaluru accounts for over 40% of all startup investments in India. Ideal playground for young engineers looking to build, fund, and launch startups.",
                highlight: "Largest Startup Base"
              },
              {
                title: "Premium Placements Matrix",
                desc: "Top placement agencies, global consulting bodies, and technical divisions recruit directly from colleges in Bengaluru, offering massive high-end packages.",
                highlight: "Highest Placements Return"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-slate-50 hover:bg-slate-900 hover:text-white p-8 rounded-[2rem] border border-slate-100 hover:border-slate-800 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-2xl"
              >
                <div>
                  <div className="h-10 w-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold mb-6 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-bold tracking-tight mb-3">{item.title}</h3>
                  <p className="text-xs text-slate-500 group-hover:text-slate-300 leading-relaxed font-medium mb-6">{item.desc}</p>
                </div>
                <div className="pt-4 border-t border-slate-200/50 group-hover:border-white/10 text-[10px] font-black uppercase tracking-wider text-rose-600 group-hover:text-rose-400">
                  {item.highlight}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* College Cards Section */}
      <section className="py-24 bg-slate-50 relative z-20">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-rose-600 font-bold uppercase tracking-[0.2em] text-xs">Academic Snapshots</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mt-3 mb-6">
              Compare the Top 3 Engineering Colleges
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
              Explore establishment metrics, placements, structural configurations, and direct admission details for RVCE, MS Ramaiah, and BMSCE.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 items-start gap-8">
            {collegesList.map((college) => {
              const isExpanded = expandedCollege === college.id;
              return (
                <div 
                  key={college.id} 
                  className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Card Header */}
                    <div className={`p-8 bg-gradient-to-br ${college.colorClass} text-white relative`}>
                      <div className="absolute top-4 right-4 bg-white/15 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm">
                        Estd. {college.estd}
                      </div>
                      <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center font-black text-lg backdrop-blur-md border border-white/20 mb-4">
                        {college.logoInitials}
                      </div>
                      <h3 className="text-2xl font-black tracking-tight leading-snug mb-1">{college.name}</h3>
                      <p className="text-white/80 text-xs font-semibold">{college.tagline}</p>
                    </div>

                    {/* Quick Stats Summary */}
                    <div className="p-8 border-b border-slate-50">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-2xl">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Campus Location</span>
                          <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-rose-500 shrink-0" /> {college.location.split(',')[0]}
                          </span>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Highest Package</span>
                          <span className="text-xs font-black text-rose-600 flex items-center gap-0.5">
                            <TrendingUp className="h-3.5 w-3.5 shrink-0" /> {college.placements.split('|')[0]}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Essential Quick Details */}
                    <div className="px-8 py-6 space-y-4">
                      <div className="flex justify-between items-start gap-4 text-xs font-medium border-b border-slate-50 pb-3">
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Accreditation:</span>
                        <span className="text-slate-800 font-bold text-right">{college.accreditation}</span>
                      </div>
                      <div className="flex justify-between items-start gap-4 text-xs font-medium border-b border-slate-50 pb-3">
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Placements Avg:</span>
                        <span className="text-slate-850 font-black text-right">{college.placements.split('|')[1] || "Competitive"}</span>
                      </div>
                      <div className="flex flex-col gap-2 text-xs font-medium border-b border-slate-50 pb-3">
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Top Recruiters:</span>
                        <span className="text-slate-700 font-bold leading-relaxed">{college.recruiters}</span>
                      </div>
                    </div>

                    {/* Expanded Details via Framer Motion */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden px-8"
                        >
                          <div className="pb-6 pt-2 space-y-4 border-t border-slate-50">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Prominent Engineering Branches:</span>
                              <div className="flex flex-wrap gap-1.5">
                                {college.branches.map((b, idx) => (
                                  <span key={idx} className="bg-slate-100 text-slate-650 px-2 py-1 rounded text-[9px] font-bold">
                                    {b}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block mb-1.5">Admission Pathway:</span>
                              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">{college.admission}</p>
                            </div>

                            <div className="pt-2">
                              <a 
                                href="tel:+919933085333" 
                                className="inline-flex items-center gap-1.5 text-[11px] font-black text-rose-600 uppercase tracking-widest hover:underline"
                              >
                                Know More ➔
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex flex-col gap-2.5">
                    <Button 
                      onClick={scrollToForm}
                      className="w-full h-12 bg-rose-600 hover:bg-rose-700 text-white font-black uppercase text-xs tracking-widest rounded-xl shadow-sm"
                    >
                      Apply for Counselling
                    </Button>
                    <Button 
                      onClick={() => toggleCollegeExpand(college.id)}
                      variant="outline"
                      className="w-full h-12 border-slate-200 text-slate-750 font-bold uppercase text-[11px] tracking-wider rounded-xl hover:bg-slate-100"
                    >
                      {isExpanded ? (
                        <>Hide Admission Details <ChevronUp className="ml-1.5 h-4 w-4" /></>
                      ) : (
                        <>Explore Branches & Process <ChevronDown className="ml-1.5 h-4 w-4" /></>
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Quick Comparison Table */}
      <section className="py-24 bg-white relative z-20" id="comparison-table">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-rose-600 font-bold uppercase tracking-[0.2em] text-xs">Direct Matrix Compare</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mt-3 mb-6">
              Quick Parameters Comparison
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
              Analyze parameters side-by-side to make the right choice based on rankings, average placements, fees structure, and branch seat availability.
            </p>
          </div>

          <div className="border border-slate-100 rounded-[2rem] overflow-hidden shadow-xl bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white border-b border-slate-800">
                    <th className="p-6 text-xs font-black uppercase tracking-wider">College Name</th>
                    <th className="p-6 text-xs font-black uppercase tracking-wider">NIRF Ranking</th>
                    <th className="p-6 text-xs font-black uppercase tracking-wider">Accreditation</th>
                    <th className="p-6 text-xs font-black uppercase tracking-wider">Placement Matrix</th>
                    <th className="p-6 text-xs font-black uppercase tracking-wider">Estimated General Fees</th>
                    <th className="p-6 text-xs font-black uppercase tracking-wider">Admission Channel</th>
                    <th className="p-6 text-xs font-black uppercase tracking-wider">Prominent Branches</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 font-black text-slate-900">
                      RV College of Engineering (RVCE)
                    </td>
                    <td className="p-6 text-slate-800">Top 50 in India (NIRF)</td>
                    <td className="p-6"><span className="px-2 py-1 rounded bg-rose-50 text-rose-600 text-[10px] font-bold">NAAC A+</span></td>
                    <td className="p-6">
                      <p className="font-bold text-slate-900">₹92 LPA (Highest)</p>
                      <p className="text-slate-400 text-[10px] mt-0.5">₹11.4 LPA Avg Package</p>
                    </td>
                    <td className="p-6 text-slate-800">
                      <p>₹2.6L - ₹4.5L / Yr (Merit)</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Varies for Mgmt Seats</p>
                    </td>
                    <td className="p-6 text-slate-800">KCET, COMEDK, Management</td>
                    <td className="p-6 text-slate-600">CSE, ISE, AIML, Data Science, ECE</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 font-black text-slate-900">
                      MS Ramaiah Institute of Technology
                    </td>
                    <td className="p-6 text-slate-800">Top 75 in India (NIRF)</td>
                    <td className="p-6"><span className="px-2 py-1 rounded bg-emerald-50 text-emerald-600 text-[10px] font-bold">NAAC A++</span></td>
                    <td className="p-6">
                      <p className="font-bold text-slate-900">₹50 LPA (Highest)</p>
                      <p className="text-slate-400 text-[10px] mt-0.5">₹9.1 LPA Avg Package</p>
                    </td>
                    <td className="p-6 text-slate-800">
                      <p>₹2.5L - ₹4.2L / Yr (Merit)</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Varies for Mgmt Seats</p>
                    </td>
                    <td className="p-6 text-slate-800">KCET, COMEDK, Management</td>
                    <td className="p-6 text-slate-600">CSE, ECE, ISE, AI-DS, Cyber Security</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 font-black text-slate-900">
                      BMS College of Engineering (BMSCE)
                    </td>
                    <td className="p-6 text-slate-800">Top 100 in India (NIRF)</td>
                    <td className="p-6"><span className="px-2 py-1 rounded bg-emerald-50 text-emerald-600 text-[10px] font-bold">NAAC A++</span></td>
                    <td className="p-6">
                      <p className="font-bold text-slate-900">₹48 LPA (Highest)</p>
                      <p className="text-slate-400 text-[10px] mt-0.5">₹8.8 LPA Avg Package</p>
                    </td>
                    <td className="p-6 text-slate-800">
                      <p>₹2.4L - ₹4.0L / Yr (Merit)</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Varies for Mgmt Seats</p>
                    </td>
                    <td className="p-6 text-slate-800">KCET, COMEDK, Management</td>
                    <td className="p-6 text-slate-600">CSE, ISE, ECE, Aerospace, AIML</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Disclaimer & Advisory */}
            <div className="bg-slate-50 p-6 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[10px] text-slate-400 uppercase font-bold text-center md:text-left leading-normal">
                * Note: Merit fees structures are set by State KEA / COMEDK rules. Management seat structural packages depend on PCM scoring, date of booking, and branch choices.
              </p>
              <Button 
                onClick={scrollToForm}
                className="h-10 bg-slate-900 hover:bg-slate-850 text-white font-black uppercase text-[9px] tracking-widest px-6 rounded-lg"
              >
                Inquire Fees Breakdowns
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* Who Is This For Section */}
      <section className="py-24 bg-slate-50 relative z-20">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-rose-600 font-bold uppercase tracking-[0.2em] text-xs">Counselling Audiences</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mt-3 mb-6">
              Who Is This Admission Guidance For?
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
              Whether you are local to Karnataka, applying from other states of India, or a parent evaluating pathways, we provide tailored counseling for your exact configuration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Karnataka State Students",
                desc: "Get strategic KCET rank analysis, seat mapping forecasts, category allocations support, and round-wise option entry optimization to secure top colleges.",
                benefit: "KCET Choice-Fill Guidance"
              },
              {
                title: "Non-Karnataka Aspirants",
                desc: "Navigate COMEDK seat counseling guidelines, cutoff distributions, rank matrixes, and accommodation support to relocate stress-free.",
                benefit: "COMEDK Counseling Support"
              },
              {
                title: "Management Seat Seekers",
                desc: "Complete documentation, direct admission eligibility checking, verified institutional seats allocation support, and genuine booking channels.",
                benefit: "Direct Admission Advisory"
              },
              {
                title: "Parents Researching Options",
                desc: "Get transparent discussions on ROI, hostel facilities, placement stats, safety, and financing/education loans support for peace of mind.",
                benefit: "Trusted Parent Consultations"
              }
            ].map((card, i) => (
              <div 
                key={i}
                className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-rose-500 mb-6 border border-slate-100">
                    <UserCheck className="h-4 w-4" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight mb-3 leading-snug">{card.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6">{card.desc}</p>
                </div>
                <div className="pt-4 border-t border-slate-50 text-[10px] font-black uppercase tracking-wider text-rose-600">
                  {card.benefit}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Admission Process Section (3-Step Timeline) */}
      <section className="py-24 bg-white relative z-20">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-rose-600 font-bold uppercase tracking-[0.2em] text-xs">Counselling Timeline</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mt-3 mb-6">
              Simplifying the Admission Process in 3 Steps
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
              We break down the complex state engineering counselling framework into a clean, stress-free pathway for candidates and parents.
            </p>
          </div>

          <div className="relative">
            {/* Connecting Timeline Line */}
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-100 -translate-y-1/2 hidden lg:block z-0" />
            
            <div className="grid lg:grid-cols-3 gap-12 relative z-10">
              {[
                {
                  step: "Step 01",
                  title: "Entrance Exam & Score Validation",
                  desc: "Appear in KCET (Karnataka Residents) or COMEDK UGET (Open all-India). Alternatively, analyze 12th PCM aggregate compatibility for direct Management Quota streams.",
                  detail: "KCET / COMEDK / 12th Marks"
                },
                {
                  step: "Step 02",
                  title: "Option Entry & Counselling Allotment",
                  desc: "Configure choice-filling parameters strategically based on cutoffs from previous rounds. Option entries require precise structuring to avoid missing higher preferred branches.",
                  detail: "Round-wise Merit Allocations"
                },
                {
                  step: "Step 03",
                  title: "Document Verification & Seat Booking",
                  desc: "Once seat allotment results are published, secure the choice, verify documents at nodal centers, and complete tuition fee procedures to lock your final engineering branch.",
                  detail: "Final Admissions Closure"
                }
              ].map((timeline, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-50 hover:bg-white rounded-[2rem] p-8 border border-slate-100 hover:border-slate-200 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-3xl font-black tracking-tight text-slate-350">{timeline.step}</span>
                    <div className="h-8 w-8 bg-rose-500/10 text-rose-600 rounded-full flex items-center justify-center font-black text-xs">
                      ✔
                    </div>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-3 leading-snug">{timeline.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6">{timeline.desc}</p>
                  <div className="pt-4 border-t border-slate-200/50 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    {timeline.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button 
              onClick={scrollToForm}
              className="px-8 h-14 bg-rose-600 hover:bg-rose-700 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-md"
            >
              Get Custom Option-Entry Guide
            </Button>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50 relative z-20">
        <div className="container mx-auto px-4 max-w-4xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-rose-600 font-bold uppercase tracking-[0.2em] text-xs">Frequntly Asked Questions</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mt-3 mb-6">
              Got Questions? We Have Answers
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
              Explore immediate clarifications on eligibility parameters, management seat criteria, and fee structural processes.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, idx) => {
              const isOpen = activeFAQ === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all shadow-sm"
                >
                  <button 
                    onClick={() => toggleFAQ(idx)}
                    className="w-full text-left p-6 font-bold text-slate-800 flex justify-between items-center gap-4 hover:bg-slate-50/50 transition-colors"
                  >
                    <span className="text-sm sm:text-base tracking-tight">{faq.q}</span>
                    <span className="shrink-0 h-6 w-6 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                      {isOpen ? <ChevronUp className="h-4 w-4 text-slate-550" /> : <ChevronDown className="h-4 w-4 text-slate-550" />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed border-t border-slate-50">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative bg-[#0B1221] text-white py-24 overflow-hidden text-center z-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(225,29,72,0.1),transparent_70%)] z-0" />
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-rose-500 font-black uppercase tracking-[0.25em] text-[10px] sm:text-xs">Secure Your Future Today</span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Ready to Secure Your BTech Seat <br />in Bengaluru?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
              Our educational consultancies guide you step-by-step from college matching, documentation, round registrations up to option-fill locks. Verify seat vacancies now.
            </p>
            
            <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={scrollToForm}
                className="px-8 h-14 bg-rose-600 hover:bg-rose-700 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-rose-600/20"
              >
                Get Admission Guidance
              </Button>
              <Button 
                onClick={() => {
                  scrollToForm();
                  setTimeout(() => {
                    const select = document.getElementById("lead-exam");
                    select?.click();
                  }, 900);
                }}
                variant="outline"
                className="px-8 h-14 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all"
              >
                Check KCET Cutoffs
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Simplified */}
      <footer className="py-12 bg-slate-900 text-slate-400 text-center text-xs font-semibold uppercase tracking-wider relative z-20">
        <div className="container mx-auto px-4 space-y-4">
          <p>© 2026 SS Education Consultancy Services. All Rights Reserved.</p>
          <div className="flex justify-center gap-6 text-[10px]">
            <a href="tel:+919933085333" className="hover:text-rose-500 transition-colors">Call Support</a>
            <span>•</span>
            <a href="https://wa.me/919933085333" className="hover:text-rose-500 transition-colors">WhatsApp Assistance</a>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-6 right-6 z-40 hidden lg:block">
        <motion.a 
          href="tel:+919933085333"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 rounded-full shadow-[0_8px_30px_rgba(245,158,11,0.4)] transition-all relative group"
          title="Call Support: +91 99330 85333"
        >
          {/* Subtle outer pulsing ring */}
          <span className="absolute inset-0 rounded-full bg-amber-500/30 animate-ping pointer-events-none" />
          
          <Phone className="h-6 w-6 fill-slate-950" />
          
          {/* Hover tool-tip badge */}
          <span className="absolute right-16 scale-0 group-hover:scale-100 transition-all duration-200 origin-right bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap border border-slate-800">
            Call Expert: +91 99330 85333
          </span>
        </motion.a>
      </div>

      {/* Mobile Sticky CTA Bottom Bar (High Conversion Ads Feature) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-lg border-t border-slate-100 shadow-2xl lg:hidden flex gap-3">
        <Button 
          onClick={() => setMobileFormOpen(true)}
          className="flex-1 h-14 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-rose-600/10"
        >
          <GraduationCap className="h-4.5 w-4.5 shrink-0" /> Inquire Admission
        </Button>
        <a 
          href="tel:+919933085333" 
          className="px-5 h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center shrink-0 border border-slate-850 hover:bg-slate-850 shadow-sm"
        >
          <Phone className="h-5 w-5 text-rose-500 shrink-0" />
        </a>
      </div>

      {/* Mobile Drawer/Modal Lead Form Panel */}
      <AnimatePresence>
        {mobileFormOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-end justify-center lg:hidden"
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white rounded-t-[2.5rem] w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl"
            >
              <button 
                onClick={() => setMobileFormOpen(false)}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-slate-500 text-lg"
              >
                ×
              </button>

              {submitted ? (
                <div className="text-center py-10">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/50">
                    <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Form Submitted!</h3>
                  <p className="mt-4 text-slate-500 font-medium leading-relaxed text-sm">
                    Thank you! Our senior education counsellor will call you within 15 minutes to assist with BTech admissions in Bengaluru.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-black text-slate-900 leading-tight mb-2 tracking-tight">Get Free Admission Guidance</h3>
                  <p className="text-xs text-slate-500 mb-6 font-medium">Verify your rank compatibility, fees matrix & direct seat availability.</p>
                  
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="mob-name" className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1 block">Full Name *</Label>
                      <Input 
                        id="mob-name" 
                        placeholder="E.g. Shreyas Patel" 
                        className="h-12 rounded-xl bg-slate-50 border-slate-100 font-medium text-slate-800"
                        value={formData.name || ""}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                      />
                      {errors.name && <p className="text-[10px] font-semibold text-rose-500 mt-1 uppercase tracking-wide">{errors.name}</p>}
                    </div>

                    <div>
                      <Label htmlFor="mob-phone" className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1 block">Phone Number *</Label>
                      <Input 
                        id="mob-phone" 
                        type="tel"
                        maxLength={10}
                        placeholder="10-Digit Mobile" 
                        className="h-12 rounded-xl bg-slate-50 border-slate-100 font-medium text-slate-800"
                        value={formData.phone || ""}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                      {errors.phone && <p className="text-[10px] font-semibold text-rose-500 mt-1 uppercase tracking-wide">{errors.phone}</p>}
                    </div>

                    <div>
                      <Label htmlFor="mob-email" className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1 block">Email (Optional)</Label>
                      <Input 
                        id="mob-email" 
                        type="email"
                        placeholder="name@gmail.com" 
                        className="h-12 rounded-xl bg-slate-50 border-slate-100 font-medium text-slate-800"
                        value={formData.email || ""}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1 block">State *</Label>
                        <Select 
                          onValueChange={(val) => handleInputChange("state", val)}
                          value={formData.state || ""}
                        >
                          <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-100 font-medium text-left text-slate-800">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-slate-100">
                            <SelectItem value="Bihar">Bihar</SelectItem>
                            <SelectItem value="Jharkhand">Jharkhand</SelectItem>
                            <SelectItem value="West Bengal">West Bengal</SelectItem>
                            <SelectItem value="Odisha">Odisha</SelectItem>
                            <SelectItem value="Karnataka">Karnataka</SelectItem>
                            <SelectItem value="Other">Other State</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.state && <p className="text-[10px] font-semibold text-rose-500 mt-1 uppercase tracking-wide">{errors.state}</p>}
                      </div>

                      <div>
                        <Label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1 block">Branch *</Label>
                        <Select 
                          onValueChange={(val) => handleInputChange("branch", val)}
                          value={formData.branch || ""}
                        >
                          <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-100 font-medium text-left text-slate-800">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-slate-100">
                            <SelectItem value="CSE">CSE / IT</SelectItem>
                            <SelectItem value="AIML">AI / ML / Data</SelectItem>
                            <SelectItem value="ECE">Electronics</SelectItem>
                            <SelectItem value="Mechanical">Mechanical</SelectItem>
                            <SelectItem value="Civil">Civil / Allied</SelectItem>
                            <SelectItem value="Other">Others</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.branch && <p className="text-[10px] font-semibold text-rose-500 mt-1 uppercase tracking-wide">{errors.branch}</p>}
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-14 mt-4 bg-[#0B1D4B] hover:bg-[#0B1D4B]/90 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
                      disabled={submitting}
                    >
                      {submitting ? "Processing..." : (<>Get Free Counselling <ArrowRight className="h-4 w-4" /></>)}
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
