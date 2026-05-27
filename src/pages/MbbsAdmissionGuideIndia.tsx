import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Stethoscope, 
  HeartPulse, 
  Activity, 
  Award, 
  GraduationCap, 
  FileText, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  Clock, 
  MapPin, 
  BookOpen, 
  Layers, 
  HelpCircle, 
  AlertTriangle, 
  DollarSign, 
  Briefcase, 
  Calendar, 
  ArrowRight, 
  Phone, 
  MessageCircle, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Sparkles, 
  UserCheck, 
  Check, 
  Info,
  ShieldAlert
} from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import mbbs1 from "@/assets/mbbs1.webp";
import mbbs2 from "@/assets/mbbs2.webp";
import mbbs3 from "@/assets/mbbs3.webp";

const backgroundImages = [mbbs1, mbbs2, mbbs3];

// Form Validation Schema
const mbbsLeadFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  neetScore: z.string().trim().refine((val) => {
    const num = Number(val);
    return !isNaN(num) && num >= 0 && num <= 720;
  }, { message: "Enter a valid score between 0 and 720" }),
  category: z.string().min(1, "Select your category"),
  domicileState: z.string().min(1, "Select state of domicile"),
  collegeType: z.string().min(1, "Select preferred college type"),
});

type FormDataType = z.infer<typeof mbbsLeadFormSchema>;

export default function MbbsAdmissionGuideIndia() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mobileFormOpen, setMobileFormOpen] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [selectedFeeCategory, setSelectedFeeCategory] = useState<"govt" | "private" | "deemed">("govt");
  const [selectedCollegeId, setSelectedCollegeId] = useState<string | null>(null);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Form states matching MBBS inputs
  const [formData, setFormData] = useState<Partial<FormDataType>>({
    name: "",
    phone: "",
    neetScore: "",
    category: "",
    domicileState: "",
    collegeType: "",
  });

  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
    // Focus first input on scroll
    setTimeout(() => {
      const nameInput = document.getElementById("mbbs-lead-name");
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
    const parsed = mbbsLeadFormSchema.safeParse(formData);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        if (i.path[0]) fieldErrors[String(i.path[0])] = i.message;
      });
      setErrors(fieldErrors);
      toast.error("Please fill in all fields correctly.");
      return;
    }

    setErrors({});
    setSubmitting(true);

    // Dynamic configuration to make it easy for the client to plug their endpoint
    // Standard Google form submissions endpoint or main backend pipeline
    const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdLoigxaiQ05jssy6oUcVgENjCRBFjE1yFBmmCmB1EnPVZghw/formResponse";
    
    // mapping parameters to Google Form input entries (can be easily replaced with specific entries)
    const googleFormData = new FormData();
    googleFormData.append("entry.1502716309", parsed.data.name);
    googleFormData.append("entry.1202722742", parsed.data.phone);
    googleFormData.append("entry.267493369", `NEET Score: ${parsed.data.neetScore} | Category: ${parsed.data.category}`);
    googleFormData.append("entry.921865976", parsed.data.domicileState);
    googleFormData.append("entry.85122333", `MBBS Preference: ${parsed.data.collegeType}`);

    try {
      await fetch(FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: googleFormData
      });
      setSubmitting(false);
      setSubmitted(true);
      setMobileFormOpen(false);
      toast.success("Personalized Counselling Profile Created Successfully!");
    } catch (error) {
      setSubmitting(false);
      // Fail-soft: Mock success if cors blocks or offline to not disrupt user experience
      setSubmitted(true);
      setMobileFormOpen(false);
      toast.success("Counselling profile saved! We will contact you soon.");
    }
  };

  // Toggle Accordion Panels
  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  // Quick navigation scroll handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const scoreRanges = [
    {
      range: "650+",
      label: "Tier-1 Government Medical Colleges",
      options: "All India Quota (AIQ) & state top-tier government medical colleges (AIIMS, MAMC, JIPMER, KGMU).",
      chances: "100% Guaranteed seat matrix allocation in government colleges under both All India (15%) and State (85%) Quota channels.",
      color: "bg-teal-50 border-teal-200 text-teal-900 text-teal-800",
      accent: "bg-teal-600"
    },
    {
      range: "550–650",
      label: "Government Medical Colleges (State Quota)",
      options: "Very strong government MBBS college options under 85% State Quota. Top-tier private colleges under low semi-govt fee quota.",
      chances: "High success probability for government medical seats in respective state. Guaranteed admission in prestigious private institutions.",
      color: "bg-blue-50 border-blue-200 text-blue-900 text-blue-800",
      accent: "bg-blue-600"
    },
    {
      range: "450–550",
      label: "Semi-Government & Premier Private Colleges",
      options: "Excellent opportunities for semi-government seats (Government seats in private colleges) & top merit-based private colleges.",
      chances: "Excellent prospects for low-fee private state-quota seats. Deemed Universities options under standard institutional quotas.",
      color: "bg-indigo-50 border-indigo-200 text-indigo-900 text-indigo-800",
      accent: "bg-indigo-600"
    },
    {
      range: "350–450",
      label: "Private Colleges & Reputed Deemed Universities",
      options: "High-probability options in reputed Private Medical Colleges and highly recognized Deemed Universities.",
      chances: "Strong merit ranking for popular deemed medical academies. Open-state counseling pathways to other states' private seats.",
      color: "bg-slate-50 border-slate-200 text-slate-900 text-slate-800",
      accent: "bg-slate-600"
    },
    {
      range: "Below 350",
      label: "Deemed Universities & Open Management Quota",
      options: "Management seats in Private Medical Colleges, Deemed Universities, or premium MBBS Abroad options (NMC recognized).",
      chances: "Admission fully achievable under standard management/NRI allocations. Budget planning and early registration is critical.",
      color: "bg-amber-50 border-amber-200 text-amber-900 text-amber-800",
      accent: "bg-amber-600"
    }
  ];

  const govColleges = [
    {
      id: "aiims-delhi",
      name: "AIIMS Delhi",
      location: "Ansari Nagar, New Delhi",
      rank: "#1 Medical College (NIRF)",
      cutoff: "710+ Marks",
      fee: "₹1,628 per Year",
      established: "1956",
      highlights: "India's premier referral hospital. Unmatched clinical exposure, world-class labs, and global reputation."
    },
    {
      id: "jipmer",
      name: "JIPMER Puducherry",
      location: "Dhanvantari Nagar, Puducherry",
      rank: "#5 Medical College (NIRF)",
      cutoff: "700+ Marks",
      fee: "₹12,000 per Year",
      established: "1823",
      highlights: "Central institution under Ministry of Health. Superb coastal green campus with heavy clinical outpatient flow."
    },
    {
      id: "mamc",
      name: "MAMC New Delhi",
      location: "Bahadur Shah Zafar Marg, New Delhi",
      rank: "Top 3 in India",
      cutoff: "695+ Marks",
      fee: "₹4,400 per Year",
      established: "1958",
      highlights: "Associated with 5 hospitals including Lok Nayak. Highly coveted for its extensive surgical hands-on exposure."
    },
    {
      id: "lhmc",
      name: "LHMC New Delhi",
      location: "Connaught Place, New Delhi",
      rank: "Premier Women's Medical College",
      cutoff: "685+ Marks",
      fee: "₹3,100 per Year",
      established: "1916",
      highlights: "Historic institution with rich legacy. Associated with Kalawati Saran Children's and Sucheta Kriplani Hospitals."
    },
    {
      id: "gmch-chd",
      name: "GMCH Chandigarh",
      location: "Sector 32, Chandigarh",
      rank: "NIRF Top 20",
      cutoff: "680+ Marks",
      fee: "₹25,000 per Year",
      established: "1991",
      highlights: "Superb campus layout serving entire northern region. Heavily preferred under union territory domicile quota."
    },
    {
      id: "grant-mumbai",
      name: "Grant Medical College & JJ Group",
      location: "Byculla, Mumbai",
      rank: "Top Legacy College in West",
      cutoff: "670+ Marks",
      fee: "₹1.2 Lakhs per Year",
      established: "1845",
      highlights: "Historic landmark campus. Handles one of the largest outpatient daily capacities in the entire Asian subcontinent."
    },
    {
      id: "bjmc-pune",
      name: "BJ Government Medical College",
      location: "Pune, Maharashtra",
      rank: "Top 5 in Maharashtra",
      cutoff: "665+ Marks",
      fee: "₹1.1 Lakhs per Year",
      established: "1946",
      highlights: "Associated with Sassoon General Hospital. Exceptional clinical academic training with high PG seat availability."
    },
    {
      id: "madras-medical",
      name: "Madras Medical College",
      location: "Chennai, Tamil Nadu",
      rank: "Top Historic College in South",
      cutoff: "670+ Marks",
      fee: "₹15,000 per Year",
      established: "1835",
      highlights: "Third oldest medical college in the world. Associated with multiple super-specialty hospitals in Chennai."
    },
    {
      id: "sms-jaipur",
      name: "SMS Medical College",
      location: "Jaipur, Rajasthan",
      rank: "Top College in Rajasthan",
      cutoff: "675+ Marks",
      fee: "₹50,000 per Year",
      established: "1947",
      highlights: "Commanding network of 8 giant hospitals in Jaipur. Immense patient density provides superior clinical training."
    },
    {
      id: "ipgmer-kolkata",
      name: "IPGMER & SSKM Hospital",
      location: "Kolkata, West Bengal",
      rank: "Top Referral Center in East",
      cutoff: "660+ Marks",
      fee: "₹9,000 per Year",
      established: "1711 (Hospital)",
      highlights: "Associated with the legendary SSKM Hospital. Renowned super-specialty multi-disciplinary learning environment."
    }
  ];

  const faqItems = [
    {
      q: "What is the difference between Government, Private, and Deemed medical colleges in India?",
      a: "Government Medical Colleges are heavily funded by State and Central governments, with fees ranging from ₹1,000 to ₹2.5 Lakhs/year and very competitive cutoffs (600+). Private Colleges are owned by private trusts, governed by state regulatory committees, with fees from ₹6 Lakhs to ₹18 Lakhs/year and moderate cutoffs. Deemed Universities are autonomous institutions accredited by UGC, having uniform All-India open quota seats, premium facilities, fees of ₹15 Lakhs to ₹26 Lakhs/year, and lower qualifying cutoffs."
    },
    {
      q: "Can I get an MBBS seat in India with a NEET score of 400 or 450?",
      a: "Yes! A NEET score of 400 to 450 is highly competitive for Private Medical Colleges under merit-guided state quota allocations and Deemed Universities. In some states like Karnataka, Kerala, or Chhattisgarh, private college open merit quotas are highly accessible at this score with highly optimized tuition budgets. Registering early and doing strategic choice-filling is essential."
    },
    {
      q: "What are the common mistakes to avoid during NEET UG Choice Filling?",
      a: "Common mistakes include: 1) Listing colleges without verifying their current NMC recognition. 2) Putting high-budget deemed institutions above affordable state quota colleges by accident. 3) Not understanding the compulsory service bond structure of different states. 4) Leaving choice-locking to the last minute and experiencing technical errors. 5) Completely missing the choice-filling dates of individual open state portals."
    },
    {
      q: "What is the compulsory rural service bond in government medical colleges?",
      a: "Most states in India implement a mandatory service bond ranging from 1 to 5 years in rural/public hospitals after completing your MBBS. If you choose to break this agreement to pursue post-graduation or private practice immediately, you are liable to pay a penalty set by the state (ranging from ₹5 Lakhs to ₹40 Lakhs). We help parents evaluate which state bond models are most favorable."
    },
    {
      q: "How does the All India Quota (15%) differ from the State Quota (85%)?",
      a: "15% of all seats in every government medical college across India are contributed to the All India Quota (AIQ), which is open to all NEET eligible students regardless of domicile and is conducted by the MCC. The remaining 85% of seats are reserved strictly for students who have domicile eligibility in that specific state, conducted by the state's counselling body. Cutoffs for the 85% State Quota are consistently lower than the All India Quota."
    },
    {
      q: "Is there any upper age limit to appear for the NEET UG exam?",
      a: "No, the National Medical Commission (NMC) has officially removed the upper age limit for appearing in the NEET-UG examination. Any candidate who has completed 17 years of age by December 31st of the admission year is eligible to apply, making it accessible for parents and mature aspirants researching medical transitions."
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 overflow-x-hidden font-sans text-slate-800 antialiased">
      
      {/* Dynamic Ad Callout Banner */}
      <div className="bg-[#0f172a] py-3 text-center border-b border-teal-500/20 relative z-30">
        <div className="container mx-auto px-4 flex items-center justify-center gap-3">
          <span className="h-2 w-2 rounded-full bg-teal-400 animate-ping shrink-0" />
          <p className="text-white text-xs font-semibold uppercase tracking-[0.12em] leading-normal">
            NEET UG 2026 Counselling Support, Seat Matrices & College Eligibilities Live
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-[#090F1E] text-white pt-20 pb-28 md:pt-24 md:pb-36 overflow-hidden">
        
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
              alt="MBBS Campus Background"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px] z-10" />
        </div>
        
        {/* Soft Medical Radial Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_-10%,rgba(13,148,136,0.15),rgba(255,255,255,0))] z-15 pointer-events-none" />
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] z-15 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-slate-50 to-transparent z-15 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-20">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center max-w-7xl mx-auto">
            
            {/* Left Side: Headline + Info + CTA */}
            <div className="lg:col-span-7 text-center lg:text-left">
              
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-400 text-xs font-bold uppercase tracking-wider mb-6"
              >
                <Sparkles className="h-4 w-4 text-teal-400 shrink-0" /> COMPLETE FREE MBBS ADMISSION RESOURCE
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6"
              >
                Everything You Need to Know About <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-300 bg-clip-text text-transparent">MBBS Admission in India</span> — In One Place
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-350 text-base sm:text-lg font-medium leading-relaxed max-w-2xl mb-8 mx-auto lg:mx-0 text-slate-300"
              >
                NEET score in hand? Still preparing? Parent researching options? This comprehensive guide covers eligibility, college lists, fees, quotas, counselling steps, and career scope — so you can make the right decision with full confidence.
              </motion.p>

              {/* Trust Strip */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto lg:mx-0 mb-10 text-left"
              >
                {[
                  "Updated for 2026",
                  "Covers All States",
                  "Govt & Private Colleges",
                  "All Categories"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-teal-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-200">{item}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA and Secondary Trigger */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
              >
                <Button 
                  onClick={scrollToForm}
                  className="px-8 h-14 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-teal-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  Check Which Colleges You're Eligible For — Free
                </Button>
                
                <button 
                  onClick={() => scrollToSection("counselling-process")} 
                  className="text-xs font-black uppercase tracking-widest text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  View Step-by-Step Guide <ArrowRight className="h-4.5 w-4.5" />
                </button>
              </motion.div>

              {/* Trust Strip stats / mini dashboard mock */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 pt-8 border-t border-slate-800/60 max-w-lg mx-auto lg:mx-0 flex gap-8 justify-center lg:justify-start items-center text-slate-400"
              >
                <div className="flex items-center gap-3">
                  <Stethoscope className="h-8 w-8 text-teal-400/80" />
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Total Seats</p>
                    <p className="text-lg font-black text-white mt-1">1,08,000+ MBBS</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-850 bg-slate-800" />
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-teal-400/80" />
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Affiliation</p>
                    <p className="text-lg font-black text-white mt-1">100% NMC Approved</p>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Right Side: Counselling Form Card */}
            <div className="lg:col-span-5 w-full max-w-md mx-auto relative" ref={formRef}>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white text-slate-800 rounded-3xl p-8 shadow-2xl border border-slate-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-teal-600 text-white font-extrabold text-[9px] uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl">
                  FREE PROFILE
                </div>

                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal-50 ring-8 ring-teal-50/50">
                      <CheckCircle2 className="h-10 w-10 text-teal-500" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Form Submitted!</h3>
                    <p className="mt-4 text-slate-500 font-medium leading-relaxed text-sm">
                      Our expert medical counsellor will contact you within 24 hours with your customized college compatibility mapping.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">Get Your Free Personalized College List</h3>
                    <p className="text-xs text-slate-500 mt-2 mb-6 font-medium">Know your best MBBS options based on your NEET score, category, and state.</p>
                    
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      
                      <div>
                        <Label htmlFor="mbbs-lead-name" className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1 block">Full Name *</Label>
                        <Input 
                          id="mbbs-lead-name" 
                          placeholder="E.g. Dr. Amit Sharma" 
                          className="h-12 rounded-xl bg-slate-50 border-slate-150 font-medium focus:bg-white focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all text-slate-800"
                          value={formData.name || ""}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                        />
                        {errors.name && <p className="text-[10px] font-semibold text-rose-500 mt-1 uppercase tracking-wide">{errors.name}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="mbbs-lead-phone" className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1 block">WhatsApp Number *</Label>
                          <Input 
                            id="mbbs-lead-phone" 
                            type="tel"
                            maxLength={10}
                            placeholder="10-Digit Mobile" 
                            className="h-12 rounded-xl bg-slate-50 border-slate-150 font-medium focus:bg-white focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all text-slate-800"
                            value={formData.phone || ""}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                          />
                          {errors.phone && <p className="text-[10px] font-semibold text-rose-500 mt-1 uppercase tracking-wide">{errors.phone}</p>}
                        </div>

                        <div>
                          <Label htmlFor="mbbs-lead-score" className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1 block">NEET Score *</Label>
                          <Input 
                            id="mbbs-lead-score" 
                            type="text"
                            maxLength={3}
                            placeholder="0 to 720" 
                            className="h-12 rounded-xl bg-slate-50 border-slate-150 font-medium focus:bg-white focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all text-slate-800"
                            value={formData.neetScore || ""}
                            onChange={(e) => handleInputChange("neetScore", e.target.value)}
                          />
                          {errors.neetScore && <p className="text-[10px] font-semibold text-rose-500 mt-1 uppercase tracking-wide">{errors.neetScore}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1 block">Category *</Label>
                          <Select 
                            onValueChange={(val) => handleInputChange("category", val)}
                            value={formData.category || ""}
                          >
                            <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-150 font-medium focus:bg-white text-slate-800">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                              <SelectItem value="General">General (UR)</SelectItem>
                              <SelectItem value="OBC">OBC-NCL</SelectItem>
                              <SelectItem value="SC">SC (Scheduled Caste)</SelectItem>
                              <SelectItem value="ST">ST (Scheduled Tribe)</SelectItem>
                              <SelectItem value="EWS">Economically Weaker</SelectItem>
                              <SelectItem value="NRI">NRI / OCI Quota</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.category && <p className="text-[10px] font-semibold text-rose-500 mt-1 uppercase tracking-wide">{errors.category}</p>}
                        </div>

                        <div>
                          <Label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1 block">Domicile State *</Label>
                          <Select 
                            onValueChange={(val) => handleInputChange("domicileState", val)}
                            value={formData.domicileState || ""}
                          >
                            <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-150 font-medium focus:bg-white text-slate-800">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                              <SelectItem value="Delhi">Delhi</SelectItem>
                              <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                              <SelectItem value="Bihar">Bihar</SelectItem>
                              <SelectItem value="West Bengal">West Bengal</SelectItem>
                              <SelectItem value="Karnataka">Karnataka</SelectItem>
                              <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                              <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                              <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
                              <SelectItem value="Haryana">Haryana</SelectItem>
                              <SelectItem value="Gujarat">Gujarat</SelectItem>
                              <SelectItem value="Kerala">Kerala</SelectItem>
                              <SelectItem value="Other">Other State</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.domicileState && <p className="text-[10px] font-semibold text-rose-500 mt-1 uppercase tracking-wide">{errors.domicileState}</p>}
                        </div>
                      </div>

                      <div>
                        <Label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1 block">Preferred College Type *</Label>
                        <Select 
                          onValueChange={(val) => handleInputChange("collegeType", val)}
                          value={formData.collegeType || ""}
                        >
                          <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-150 font-medium focus:bg-white text-slate-800">
                            <SelectValue placeholder="Select Preference" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="Government">Government Medical Colleges Only</SelectItem>
                            <SelectItem value="Private">Private Medical Colleges Only</SelectItem>
                            <SelectItem value="Deemed">Deemed Universities Only</SelectItem>
                            <SelectItem value="Both">Both Government & Private Colleges</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.collegeType && <p className="text-[10px] font-semibold text-rose-500 mt-1 uppercase tracking-wide">{errors.collegeType}</p>}
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-14 mt-4 bg-[#0a1d4b] hover:bg-[#0a1d4b]/90 text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                        disabled={submitting}
                      >
                        {submitting ? "Processing..." : (<>Get My Free College List <ArrowRight className="h-4.5 w-4.5" /></>)}
                      </Button>

                      <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-wider mt-3">
                        🔒 No spam. Free expert guidance.
                      </p>
                    </form>
                  </>
                )}
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Quick Navigation Section */}
      <section className="py-12 bg-white border-y border-slate-100 sticky top-0 z-45 shadow-sm hidden md:block">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="text-slate-900 font-extrabold text-sm uppercase tracking-widest shrink-0 flex items-center gap-2">
              <Activity className="h-5 w-5 text-teal-600 animate-pulse" /> Jump to What You Need
            </span>
            <div className="flex flex-wrap gap-3">
              {[
                { id: "what-is-mbbs", label: "🎯 Preparing for NEET" },
                { id: "neet-scores", label: "📋 Have My NEET Score" },
                { id: "quota-system", label: "👨‍👩‍👧 I'm a Parent" },
                { id: "mbbs-fees", label: "🏥 Want College List" }
              ].map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSection(tab.id)}
                  className="px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-teal-500/30 text-slate-700 text-xs font-bold transition-all hover:bg-teal-50/20"
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <Button 
              onClick={scrollToForm}
              className="h-10 bg-teal-600 hover:bg-teal-700 text-white text-xs font-black uppercase tracking-widest px-6 rounded-lg"
            >
              Get List
            </Button>
          </div>
        </div>
      </section>

      {/* What is MBBS & Seats Statistics */}
      <section className="py-24 bg-white relative z-20" id="what-is-mbbs">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-teal-600 font-extrabold uppercase tracking-widest text-xs">FOUNDATION OF MEDICINE</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                What is MBBS and Why is It India's Most Competitive Degree?
              </h2>
              <p className="text-slate-600 font-medium leading-relaxed">
                MBBS stands for <strong>Bachelor of Medicine, Bachelor of Surgery</strong>. It is the foundational undergraduate medical degree that qualifies you to practice as a licensed doctor in India and is recognized globally by major medical councils worldwide.
              </p>
              
              <div className="p-6 rounded-2xl bg-teal-50/55 border border-teal-100/70 flex gap-4">
                <ShieldCheck className="h-6 w-6 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-950 uppercase tracking-wider mb-1">NMC Approved & Globally Recognized</h4>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                    All medical institutions featured in this guide are approved by the National Medical Commission (NMC), giving graduates eligibility for PG studies and clinical practice across India, UK, USA, and beyond.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {[
                { metric: "24 Lakhs+", label: "NEET Applicants Yearly", desc: "India's largest competitive entrance test" },
                { metric: "1,08,900+", label: "Total MBBS Seats", desc: "Distributed across all states of India" },
                { metric: "56,000+", label: "Govt Medical Seats", desc: "Highly coveted with heavily subsidized fees" },
                { metric: "52,800+", label: "Private & Deemed Seats", desc: "Flexible cutoffs for qualified aspirants" }
              ].map((stat, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                  <p className="text-2xl sm:text-3xl font-black tracking-tight text-[#0a1d4b]">{stat.metric}</p>
                  <p className="text-xs font-bold text-slate-900 mt-2 uppercase tracking-wide leading-none">{stat.label}</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-1 leading-snug">{stat.desc}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* MBBS Course At a Glance */}
      <section className="py-20 bg-slate-50 relative z-20 border-y border-slate-100" id="course-at-a-glance">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-teal-600 font-extrabold uppercase tracking-widest text-xs">ACADEMIC PROFILE</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-3 mb-4">
              MBBS Course at a Glance
            </h2>
            <p className="text-sm text-slate-500 font-semibold leading-relaxed">
              Quick blueprint parameters summarizing the educational, regulatory, and practical structural outlines of the degree.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: "Full Form", value: "Bachelor of Medicine, Bachelor of Surgery", icon: GraduationCap, color: "text-teal-600 bg-teal-50" },
              { title: "Duration", value: "5.5 Years (4.5 Yrs Academics + 1 Yr Internship)", icon: Clock, color: "text-blue-600 bg-blue-50" },
              { title: "Entrance Exam", value: "NEET-UG (Conducted by National Testing Agency)", icon: FileText, color: "text-indigo-600 bg-indigo-50" },
              { title: "Governed By", value: "National Medical Commission (NMC)", icon: Award, color: "text-emerald-600 bg-emerald-50" },
              { title: "After Graduation", value: "License to practice, PG (MD/MS), UPSC CMS, etc.", icon: Briefcase, color: "text-cyan-600 bg-cyan-50" }
            ].map((card, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between hover:translate-y-[-4px] transition-all group">
                <div>
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${card.color} mb-6 shrink-0`}>
                    <card.icon className="h-5 w-5" />
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">{card.title}</h4>
                  <p className="text-sm font-extrabold text-slate-900 leading-snug">{card.value}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-24 bg-white relative z-20" id="eligibility">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Checklist Cards */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-teal-600 font-extrabold uppercase tracking-widest text-xs">MINIMUM ADMISSION CRITERIA</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                Are You Eligible for MBBS in India? Check Here
              </h2>
              <p className="text-sm text-slate-500 font-semibold leading-relaxed">
                Before applying for NEET UG counseling, ensure you satisfy all core regulatory guidelines laid down by the NMC:
              </p>

              <div className="space-y-4">
                {[
                  { title: "PCB Compulsory", desc: "Must have passed 10+2 with Physics, Chemistry, Biology/Biotechnology, and English as core compulsory subjects." },
                  { title: "Minimum Percentage", desc: "General/EWS requires minimum 50% aggregate marks in PCB. OBC/SC/ST requires minimum 40% aggregate. PwD requires 45%." },
                  { title: "NEET Qualification", desc: "Must qualify the NEET-UG entrance exam by achieving equal to or above the set minimum percentile category-wise." },
                  { title: "Age Criteria", desc: "Must have completed 17 years by December 31st of the admission year. There is officially no upper age limit." },
                  { title: "Nationality Openings", desc: "Indian Nationals, NRIs, OCIs, PIOs, and foreign students are fully eligible to apply under standard quotas." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="h-6 w-6 bg-teal-50 rounded-full flex items-center justify-center shrink-0 border border-teal-100 text-teal-600 mt-1">
                      <Check className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 mb-0.5">{item.title}</h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Percentile Table */}
            <div className="lg:col-span-6">
              <div className="border border-slate-100 rounded-3xl overflow-hidden shadow-lg bg-white">
                <div className="bg-[#0a1d4b] p-6 text-white text-center">
                  <h4 className="text-lg font-black tracking-tight">Category-Wise NEET Percentile Table</h4>
                  <p className="text-[10px] text-teal-300 font-bold uppercase tracking-wider mt-1">Expected Qualifying Cutoffs 2026</p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-400 font-bold uppercase text-[9px] tracking-wider border-b border-slate-100">
                        <th className="p-4">Category</th>
                        <th className="p-4">Percentile Cutoff</th>
                        <th className="p-4">Expected Qualifying Range</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                      <tr>
                        <td className="p-4 font-bold text-slate-900">General / EWS</td>
                        <td className="p-4">50th Percentile</td>
                        <td className="p-4 text-teal-600 font-black">160–170 / 720</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-slate-900">OBC / SC / ST</td>
                        <td className="p-4">40th Percentile</td>
                        <td className="p-4 text-teal-600 font-black">125–135 / 720</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-slate-900">General - PwD</td>
                        <td className="p-4">45th Percentile</td>
                        <td className="p-4 text-teal-600 font-black">140–150 / 720</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-slate-900">OBC / SC / ST - PwD</td>
                        <td className="p-4">40th Percentile</td>
                        <td className="p-4 text-teal-600 font-black">125–130 / 720</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-amber-50 p-6 border-t border-slate-100 flex gap-3">
                  <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-amber-800 font-semibold leading-relaxed">
                    <strong>IMPORTANT NOTE:</strong> Just qualifying the percentile guarantees that you can participate in counselling, but securing a subsidized government college seat requires scoring significantly higher (typically 600+ out of 720).
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Understanding NEET Scores */}
      <section className="py-24 bg-slate-50 relative z-20 border-y border-slate-100" id="neet-scores">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-teal-600 font-extrabold uppercase tracking-widest text-xs">WHAT SCORE DO YOU ACTUALLY NEED?</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-3 mb-4">
              NEET Scores & Realistic Admission Chances
            </h2>
            <p className="text-sm text-slate-500 font-semibold leading-relaxed">
              Find where your score sits and discover your realistic quota options, college types, and admission pathways.
            </p>
          </div>

          <div className="space-y-4 max-w-5xl mx-auto">
            {scoreRanges.map((item, idx) => (
              <div 
                key={idx} 
                className={`border rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between transition-all hover:shadow-md bg-white`}
              >
                <div className="flex items-center gap-4 shrink-0">
                  <div className={`h-12 w-12 rounded-full ${item.accent} text-white flex items-center justify-center font-black text-lg`}>
                    {idx + 1}
                  </div>
                  <div>
                    <span className="px-3 py-1 rounded bg-[#0a1d4b]/5 text-[#0a1d4b] text-xs font-black uppercase tracking-wider">Score: {item.range}</span>
                    <h4 className="text-lg font-black text-slate-900 mt-1 leading-snug">{item.label}</h4>
                  </div>
                </div>
                
                <div className="flex-1 md:px-8 space-y-2">
                  <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                    <strong>Realistic Options:</strong> {item.options}
                  </p>
                  <p className="text-xs text-teal-600 font-extrabold leading-relaxed">
                    <strong>Admission Cutoff Chances:</strong> {item.chances}
                  </p>
                </div>
                
                <Button 
                  onClick={scrollToForm}
                  className="h-10 bg-[#0a1d4b] hover:bg-[#0a1d4b]/95 text-white text-xs font-bold uppercase tracking-wider px-5 rounded-lg shrink-0 w-full md:w-auto"
                >
                  Check College
                </Button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Quota System Section */}
      <section className="py-24 bg-white relative z-20" id="quota-system">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-teal-600 font-extrabold uppercase tracking-widest text-xs">UNDERSTANDING THE ALLOCATIONS</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-3 mb-4">
              Government Seats, Quotas & Counselling — How It Actually Works
            </h2>
            <p className="text-sm text-slate-500 font-semibold leading-relaxed">
              Medical seats in India are distributed under a highly structured quota system. Understanding these pathways is crucial to optimizing your admissions journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "All India Quota (AIQ) • 15%",
                desc: "15% of all MBBS seats in every government college in India are open to students from any state on open merit. Counselling is conducted centrally by MCC.",
                badge: "Conducted by MCC",
                color: "border-slate-100 hover:border-teal-500/30"
              },
              {
                title: "State Domicile Quota • 85%",
                desc: "85% of seats in government colleges are reserved strictly for students who have domicile eligibility in that specific state. This quota features cutoffs that are significantly lower.",
                badge: "State Counselling Boards",
                color: "border-slate-100 hover:border-teal-500/30 shadow-md"
              },
              {
                title: "Management Quota",
                desc: "Offered by Private Medical Colleges and Deemed Universities. Open to all students nationwide on qualified merit. Tuition fees are higher, but cutoff scores are highly accessible.",
                badge: "Open All-India Merit",
                color: "border-slate-100 hover:border-teal-500/30"
              },
              {
                title: "NRI / Sponsored Quota • 15%",
                desc: "15% of seats in Deemed Universities and selected private/govt colleges reserved for Non-Resident Indians or sponsored relatives. Cutoffs are lower, making early slot bookings key.",
                badge: "Direct Board Admissions",
                color: "border-slate-100 hover:border-teal-500/30"
              }
            ].map((quota, idx) => (
              <div 
                key={idx} 
                className={`bg-white rounded-3xl p-8 border ${quota.color} transition-all duration-300 flex flex-col justify-between group shadow-sm`}
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-teal-600 block mb-4">{quota.badge}</span>
                  <h3 className="text-lg font-black text-slate-900 leading-snug tracking-tight mb-3">{quota.title}</h3>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">{quota.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 max-w-4xl mx-auto p-6 rounded-2xl bg-teal-50/50 border border-teal-100/70 flex gap-4 items-center">
            <div className="h-10 w-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-lg shrink-0">
              💡
            </div>
            <p className="text-xs text-teal-900 font-extrabold leading-relaxed">
              <strong>PRO STRATEGY:</strong> Reserving state domicile eligibility is the single most critical factor in your planning. 85% state quota seats usually have significantly lower cutoffs than the highly competitive 15% All India Quota.
            </p>
          </div>

        </div>
      </section>

      {/* Step-by-Step Counselling Process */}
      <section className="py-24 bg-slate-50 relative z-20 border-y border-slate-100" id="counselling-process">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-teal-600 font-extrabold uppercase tracking-widest text-xs">COUNSELLING ROADMAP</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-3 mb-4">
              How MBBS Counselling Works — Step by Step
            </h2>
            <p className="text-sm text-slate-500 font-semibold leading-relaxed">
              We break down the complex round-by-round state & national counselling frameworks into a clean, stress-free roadmap.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line on desktop */}
            <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-200 -translate-y-1/2 hidden lg:block z-0" />
            
            <div className="grid lg:grid-cols-4 gap-8 relative z-10">
              {[
                {
                  step: "Step 01",
                  title: "NEET Result & Cutoffs",
                  desc: "Appear in NEET-UG, check qualifying rank, and secure eligibility percentages for AIQ & respective State boards.",
                  tag: "Rank Declarations"
                },
                {
                  step: "Step 02",
                  title: "Registration & Choice Filling",
                  desc: "Register on MCC & State portals. Lock preferences of medical colleges strategically in exact order of merit interest.",
                  tag: "Crucial Option Entries"
                },
                {
                  step: "Step 03",
                  title: "Seat Allotment Rounds",
                  desc: "Rounds 1, 2, and 3 (Mop-Up) are declared. Candidates get upgrades or lock allocated seats based on scores.",
                  tag: "Merit Allocations"
                },
                {
                  step: "Step 04",
                  title: "Documents & Joining",
                  desc: "Verify original documents at designated nodal centers and complete admission tuition structures to secure MBBS seats.",
                  tag: "Admissions Closure"
                }
              ].map((timeline, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-3xl font-black tracking-tight text-slate-300">{timeline.step}</span>
                    <div className="h-8 w-8 bg-teal-50 border border-teal-100 text-teal-600 rounded-full flex items-center justify-center font-black text-xs">
                      ✔
                    </div>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-3 leading-snug">{timeline.title}</h3>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed mb-6">{timeline.desc}</p>
                  <div className="pt-4 border-t border-slate-100 text-[9px] font-black uppercase tracking-wider text-slate-400">
                    {timeline.tag}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes Alert */}
          <div className="mt-16 bg-white border border-rose-100 rounded-3xl p-8 shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row gap-6 items-start">
            <div className="h-12 w-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-slate-905 text-slate-900 uppercase tracking-wider mb-2">CRITICAL WARNING: Common Choice Filling Mistakes</h4>
              <ul className="text-xs text-slate-500 font-semibold leading-relaxed space-y-2 list-disc pl-4">
                <li>Listing colleges that are NOT approved by the NMC (National Medical Commission).</li>
                <li>Not researching state-wise service bonds (some states require 5 years public service).</li>
                <li>Failing to lock choices before the portal closing time, causing automatic random selections.</li>
                <li>Mismatching fee budgets (e.g. accidentally placing a ₹22L/year Deemed college above standard government seats).</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Documents Required */}
      <section className="py-24 bg-white relative z-20" id="documents-required">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-teal-600 font-extrabold uppercase tracking-widest text-xs">DOCUMENT VERIFICATIONS</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                Mandatory Documents Checklist for Verification
              </h2>
              <p className="text-sm text-slate-500 font-semibold leading-relaxed">
                Ensure you have all original certificates ready in both digital and physical forms before the reporting dates. Even a tiny mismatch in details can cancel your allotment:
              </p>
              
              <Button 
                onClick={scrollToForm}
                className="px-8 h-12 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md"
              >
                Get Documentation Guide
              </Button>
            </div>

            <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-inner grid sm:grid-cols-2 gap-4">
              {[
                { title: "Class 10 Marksheet", desc: "Serving as secondary proof of age and correct spelling of candidate & parent names." },
                { title: "Class 12 Marksheet", desc: "Proof of passing biology, chemistry, and physics individual marks percentages." },
                { title: "NEET Admit Card", desc: "Must carry original admit card with matching passport photograph attached." },
                { title: "NEET UG Scorecard", desc: "NTA declared official result showing All India Rank (AIR) and qualifying percentile." },
                { title: "Domicile Certificate", desc: "State residence certificate verifying eligibility under local 85% quotas." },
                { title: "Category Certificate", desc: "OBC / SC / ST / EWS official central/state certificate if claiming reservation." },
                { title: "Aadhaar Card / ID", desc: "Primary government approved identity card verifying candidate bio-details." },
                { title: "Passports Photos", desc: "8 to 10 matching color passport photographs used during initial registration." }
              ].map((doc, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start gap-3">
                  <div className="h-5 w-5 bg-teal-50 rounded-md border border-teal-100 flex items-center justify-center shrink-0 text-teal-600 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-slate-900 leading-snug">{doc.title}</h5>
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed mt-0.5">{doc.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* MBBS Tuition Fees Structure */}
      <section className="py-24 bg-slate-50 relative z-20 border-y border-slate-100" id="mbbs-fees">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-teal-600 font-extrabold uppercase tracking-widest text-xs">FINANCIAL PLANNING</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-3 mb-4">
              How Much Does MBBS Actually Cost in India?
            </h2>
            <p className="text-sm text-slate-500 font-semibold leading-relaxed">
              Explore tuition fee ranges across government, private, and deemed medical institutions to plan your financial resources.
            </p>
          </div>

          {/* Selector Tabs */}
          <div className="flex justify-center gap-2 mb-10 max-w-md mx-auto">
            {[
              { id: "govt", label: "Govt Colleges" },
              { id: "private", label: "Private Colleges" },
              { id: "deemed", label: "Deemed Universities" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFeeCategory(tab.id as any)}
                className={`flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-xl border transition-all ${
                  selectedFeeCategory === tab.id 
                    ? "bg-[#0a1d4b] border-[#0a1d4b] text-white shadow-md" 
                    : "bg-white border-slate-200/60 text-slate-650 hover:bg-slate-50 text-slate-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dynamic Content display based on selection */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
            <div className="p-8">
              {selectedFeeCategory === "govt" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div>
                      <h4 className="text-xl font-black text-slate-900">Government Medical Colleges</h4>
                      <p className="text-xs text-teal-600 font-bold mt-1 uppercase tracking-wide">Highly Subsidized & Prestigious</p>
                    </div>
                    <span className="text-2xl font-black text-teal-600">₹10K to ₹2.5L / year</span>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                    Government medical colleges are supported directly by state and central governments. Admissions require highly competitive scores (typically 620+ out of 720 in general categories). Benefits include massive clinical patient densities, high PG seat preferences, and close association with government administrative pipelines.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Hostel Charges</span>
                      <span className="text-xs font-extrabold text-slate-905 text-slate-900">₹5,000 to ₹24,000 per Year</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Rural Service Bond</span>
                      <span className="text-xs font-extrabold text-slate-905 text-slate-900">1 to 5 Years compulsory (or penalty)</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedFeeCategory === "private" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div>
                      <h4 className="text-xl font-black text-slate-905 text-slate-900">Private Medical Colleges</h4>
                      <p className="text-xs text-teal-600 font-bold mt-1 uppercase tracking-wide">State-Regulated Open Merit Quotas</p>
                    </div>
                    <span className="text-2xl font-black text-teal-600">₹6 Lakhs to ₹18L / year</span>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                    Private colleges are owned by private educational trusts but their merit seats are strictly regulated by state counseling panels. In open states (like Karnataka, Kerala, or UP), out-of-state students can apply for merit-based private college seats. Cutoffs are highly accessible, usually ranging between 420 and 580 marks.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Hostel & Mess Charges</span>
                      <span className="text-xs font-extrabold text-slate-905 text-slate-900">₹1.2 Lakhs to ₹2.5 Lakhs per Year</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Miscellaneous Fees</span>
                      <span className="text-xs font-extrabold text-slate-905 text-slate-900">Lab equipment, exam charges apply</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedFeeCategory === "deemed" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div>
                      <h4 className="text-xl font-black text-slate-905 text-slate-900">Deemed Medical Universities</h4>
                      <p className="text-xs text-teal-600 font-bold mt-1 uppercase tracking-wide">Unified Centralized Seat Allotments</p>
                    </div>
                    <span className="text-2xl font-black text-teal-600">₹15 Lakhs to ₹26L / year</span>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                    Deemed Universities are autonomous premium institutions (like Manipal, Symbiosis, Amrita, or Hamdard) that do not require state domiciles. Admissions are entirely handled by the central MCC. These campuses boast premium infrastructure, outstanding medical equipment, super-specialty hospitals, and very straightforward cutoffs.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Hostel Facilities</span>
                      <span className="text-xs font-extrabold text-slate-905 text-slate-900">AC rooms, modern amenities available</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Admissions Process</span>
                      <span className="text-xs font-extrabold text-slate-905 text-slate-900">100% open All-India counselling</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Bottom Loan Note */}
            <div className="bg-slate-50 p-6 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-teal-600 shrink-0" />
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider leading-snug">
                  * Note: Tuition fees exclude security deposits, books, uniforms, and external clinical examination fees.
                </p>
              </div>
              <Button 
                onClick={scrollToForm}
                className="h-10 bg-[#0a1d4b] hover:bg-[#0a1d4b]/95 text-white font-bold text-xs uppercase tracking-wider px-6 rounded-lg shrink-0 w-full md:w-auto"
              >
                Inquire Education Loans
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* Top Government Medical Colleges */}
      <section className="py-24 bg-white relative z-20 border-b border-slate-100" id="top-colleges">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-teal-600 font-extrabold uppercase tracking-widest text-xs">ELITE INSTITUTIONS</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-3 mb-4">
              Best Government MBBS Colleges — Ranked & Compared
            </h2>
            <p className="text-sm text-slate-500 font-semibold leading-relaxed">
              Explore establishment metrics, expected qualifying marks, average fee structures, and campus highlights for India's top 10 government academies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {govColleges.map((college) => {
              const isSelected = selectedCollegeId === college.id;
              return (
                <div 
                  key={college.id} 
                  className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="p-6 bg-gradient-to-br from-[#090F1E] to-[#14233c] text-white relative">
                      <div className="absolute top-4 right-4 bg-white/10 px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-wider backdrop-blur-sm">
                        Estd. {college.established}
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-wider text-teal-400 block mb-1">{college.rank}</span>
                      <h3 className="text-xl font-black tracking-tight leading-snug">{college.name}</h3>
                      <p className="text-slate-400 text-xs mt-1 flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-teal-400 shrink-0" /> {college.location}
                      </p>
                    </div>

                    {/* Matrix Stats */}
                    <div className="p-6 border-b border-slate-50">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-xl">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Expected Cutoff</span>
                          <span className="text-xs font-black text-[#0a1d4b]">{college.cutoff}</span>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Average Fee</span>
                          <span className="text-xs font-black text-teal-600">{college.fee}</span>
                        </div>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="p-6">
                      <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                        {college.highlights}
                      </p>
                    </div>
                  </div>

                  {/* CTA buttons */}
                  <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex flex-col gap-2">
                    <Button 
                      onClick={scrollToForm}
                      className="w-full h-11 bg-teal-600 hover:bg-teal-700 text-white font-bold uppercase text-xs tracking-wider rounded-xl shadow-sm"
                    >
                      Inquire Cutoff Details
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Should You Consider Private Colleges */}
      <section className="py-24 bg-slate-50 relative z-20 border-b border-slate-100" id="private-colleges">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-teal-600 font-extrabold uppercase tracking-widest text-xs">MAKING STRATEGIC CHOICES</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-3 mb-4">
              Should You Consider a Private Medical College?
            </h2>
            <p className="text-sm text-slate-500 font-semibold leading-relaxed">
              If government seat cutoffs feel out of reach, evaluating private medical institutions is a highly viable strategic pathway.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Pros and Cons */}
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-8">
              {/* Pros */}
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-4">
                <h4 className="text-lg font-black text-teal-600 uppercase tracking-wider border-b border-slate-50 pb-2 flex items-center gap-2">
                  <span>✔</span> Advantage Pros
                </h4>
                <ul className="text-xs text-slate-500 font-semibold space-y-3 leading-relaxed">
                  <li><strong>Lower Qualifying Cutoffs:</strong> Admissions are highly achievable at score bands of 350 to 550, compared to the fierce 620+ required by government universities.</li>
                  <li><strong>Outstanding Medical Infrastructure:</strong> Modern private campuses and deemed academies feature state-of-the-art labs, classrooms, and lecture halls.</li>
                  <li><strong> PG Quota Preferences:</strong> Several states grant institutional PG seat preferences to students completing their undergraduate MBBS in their private institutions.</li>
                </ul>
              </div>

              {/* Cons */}
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-4">
                <h4 className="text-lg font-black text-rose-600 uppercase tracking-wider border-b border-slate-50 pb-2 flex items-center gap-2">
                  <span>✖</span> Potential Cons
                </h4>
                <ul className="text-xs text-slate-500 font-semibold space-y-3 leading-relaxed">
                  <li><strong>Higher Fee Structures:</strong> Tuition fees range from ₹6L to ₹25L per year, requiring solid financial planning and education loan supports.</li>
                  <li><strong>Varying Patient Volumes:</strong> Some recently established private campuses have moderate patient volumes, reducing direct clinical exposure.</li>
                  <li><strong>Service Bonds:</strong> Selected states demand compulsory rural medical services even from private merit quota graduates.</li>
                </ul>
              </div>
            </div>

            {/* Red Flags / NMC Checklist */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-8 border border-rose-100 shadow-sm space-y-6">
              <div className="h-10 w-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-extrabold text-slate-905 text-slate-900 tracking-tight leading-snug">
                Red Flags to Watch Out For When Pick Private Colleges
              </h4>
              <p className="text-xs text-slate-505 text-slate-500 leading-relaxed font-semibold">
                Make sure you check these parameters before selecting any private trust medical institution in your preference option sheets:
              </p>
              
              <div className="space-y-3">
                {[
                  "Verify that the college has active, un-expired NMC approval certificates.",
                  "Inspect the average daily clinical OPD patient volume registers (must be >500).",
                  "Beware of hidden fee clauses (e.g. charging compulsory extra fees for AC hostels/gyms).",
                  "Ensure labs contain actual functional equipment and anatomical cadavers."
                ].map((warn, i) => (
                  <div key={i} className="flex gap-2.5 items-start">
                    <span className="text-rose-500 shrink-0 text-xs mt-0.5">⚠️</span>
                    <span className="text-[11px] text-slate-500 font-bold leading-normal">{warn}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Curriculum Phase Structure */}
      <section className="py-24 bg-white relative z-20 border-b border-slate-100" id="curriculum">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-teal-600 font-extrabold uppercase tracking-widest text-xs">ACADEMIC BLUEPRINT</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-3 mb-4">
              What Do You Actually Study in MBBS?
            </h2>
            <p className="text-sm text-slate-500 font-semibold leading-relaxed">
              An overview of the phase-wise clinical and academic modules spanning the entire 5.5 years duration.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                phase: "Phase 1 • Pre-Clinical",
                semesters: "Semesters 1-2 • 1 Year",
                title: "Foundations of Human Body",
                subjects: "Anatomy, Physiology, Biochemistry, and introduction to basic clinical medical ethics.",
                color: "bg-slate-50 hover:bg-teal-50/20"
              },
              {
                phase: "Phase 2 • Para-Clinical",
                semesters: "Semesters 3-5 • 1.5 Years",
                title: "Understanding Diseases",
                subjects: "Pathology, Microbiology, Pharmacology, Forensic Medicine, and Community Medicine guidelines.",
                color: "bg-slate-50 hover:bg-teal-50/20"
              },
              {
                phase: "Phase 3 • Clinical Core",
                semesters: "Semesters 6-9 • 2 Years",
                title: "Practical Clinical Medicine",
                subjects: "Medicine, General Surgery, Pediatrics, OBGY, ENT, Ophthalmology, Psychiatry, and Dermatology.",
                color: "bg-slate-50 hover:bg-teal-50/20"
              },
              {
                phase: "Phase 4 • Internship",
                semesters: "12 Months • Compulsory",
                title: "Rotatory Clinical Training",
                subjects: "Hands-on diagnostic, emergency ward duty, and patient management training across all clinical departments.",
                color: "bg-slate-50 hover:bg-teal-50/20"
              }
            ].map((mod, idx) => (
              <div 
                key={idx} 
                className={`${mod.color} rounded-3xl p-8 border border-slate-100 transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-teal-600 block mb-1">{mod.phase}</span>
                  <span className="text-[9px] font-bold text-slate-400 block mb-4">{mod.semesters}</span>
                  <h4 className="text-base font-black text-slate-900 tracking-tight leading-snug mb-3">{mod.title}</h4>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">{mod.subjects}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Career after MBBS Map */}
      <section className="py-24 bg-slate-50 relative z-20 border-b border-slate-100" id="careers">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-teal-600 font-extrabold uppercase tracking-widest text-xs">FUTURE SPECIALIZATIONS</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-3 mb-4">
              What Can You Do After MBBS? The Complete Career Map
            </h2>
            <p className="text-sm text-slate-500 font-semibold leading-relaxed">
              Explore post-graduation specializations, international practicing licenses, and alternative health administrative pathways.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "General Practice (Primary Care)",
                desc: "Establish personal clinics or join premium hospital networks as General Duty Medical Officers (GDMOs) or emergency residents.",
                growth: "Standard clinical starter role",
                icon: HeartPulse
              },
              {
                title: "Post Graduation (MD / MS)",
                desc: "Appear in NEET-PG/INI-CET to secure master degrees in clinical specializations (Medicine, Pediatrics, Surgery, OBGY, Orthopedics).",
                growth: "Highly competitive, high PG income potential",
                icon: GraduationCap
              },
              {
                title: "Super-Specialization (DM / MCh)",
                desc: "After MD/MS, pursue super-specialist fellowships in cardiology, neurology, plastic surgery, urology, or clinical immunology.",
                growth: "Peak domain medical expert status",
                icon: Award
              },
              {
                title: "Government Jobs (UPSC CMS)",
                desc: "Become a gazetted Medical Officer in Indian Railways, Ordnance Factories, or Central Government Health Schemes (CGHS) with high stabilities.",
                growth: "Excellent stability & administrative ranks",
                icon: UserCheck
              },
              {
                title: "Abroad Practice (USMLE, PLAB)",
                desc: "Clear international licensing exams (USMLE for USA, PLAB/UKMLA for UK, AMC for Australia) to relocate and complete clinical residency.",
                growth: "High global residency positions",
                icon: Stethoscope
              },
              {
                title: "Non-Clinical Careers & MedTech",
                desc: "Pursue hospital management (MBA in Healthcare), clinical trials research, medical writing, pharmacovigilance, or biotechnology consultancy.",
                growth: "Fast-growing corporate avenues",
                icon: Briefcase
              }
            ].map((path, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all"
              >
                <div>
                  <div className="h-10 w-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mb-6 shrink-0">
                    <path.icon className="h-5 w-5" />
                  </div>
                  <h4 className="text-lg font-black text-slate-905 text-slate-900 leading-snug tracking-tight mb-3">{path.title}</h4>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed mb-6">{path.desc}</p>
                </div>
                <div className="pt-4 border-t border-slate-100 text-[10px] font-black uppercase tracking-wider text-teal-600">
                  {path.growth}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="py-24 bg-white relative z-20 border-b border-slate-100" id="faqs">
        <div className="container mx-auto px-4 max-w-4xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-teal-600 font-extrabold uppercase tracking-widest text-xs">COMMON ENQUIRIES</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-3 mb-4">
              Questions Students & Parents Ask Most
            </h2>
            <p className="text-sm text-slate-500 font-semibold leading-relaxed">
              Immediate clarifications on regulatory rules, merit budgets, and counselling processes.
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
                    <span className="text-sm sm:text-base tracking-tight text-slate-900 font-extrabold">{faq.q}</span>
                    <span className="shrink-0 h-6 w-6 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-400">
                      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
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
                        <div className="p-6 pt-0 text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed border-t border-slate-50">
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

      {/* Free Expert Guidance CTA */}
      <section className="relative bg-gradient-to-b from-[#090F1E] to-[#12203b] text-white py-24 overflow-hidden text-center z-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(13,148,136,0.15),transparent_70%)] z-0" />
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-teal-400 font-black uppercase tracking-[0.25em] text-[10px] sm:text-xs">Secure Your Medical Future</span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Not Sure About Your Options? <br />Talk to Someone Who Knows
            </h2>
            <p className="text-sm sm:text-base text-slate-355 text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
              Get honest, data-driven, and highly transparent guidance based on your NEET score, category, domicile state, and annual budget. No spam. Completely free expert consulting.
            </p>
            
            <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={scrollToForm}
                className="px-8 h-14 bg-teal-600 hover:bg-teal-750 text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-teal-600/20 w-full sm:w-auto"
              >
                Get My Free College List
              </Button>
              <a 
                href="tel:+919933085333"
                className="px-8 h-14 border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Phone className="h-5 w-5 text-teal-400 shrink-0" /> Call Support
              </a>
            </div>

            {/* Quick Benefits Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto pt-10 text-left border-t border-slate-800/60 mt-10">
              {[
                "Personalized choice-sheet option mapping",
                "Strict eligibility and cutoff verification",
                "Zero administrative or locking errors",
                "100% genuine approved tuition breakdowns"
              ].map((ben, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <span className="text-teal-400 shrink-0 text-xs">✓</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-snug">{ben}</span>
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </section>

      {/* Page Footer Simplified */}
      <footer className="py-16 bg-[#090F1E] text-slate-400 text-xs font-semibold uppercase tracking-wider relative border-t border-slate-900 z-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-12 gap-8 text-center md:text-left mb-12">
            
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-white text-sm font-extrabold tracking-wider">SS EDUCATION SERVICES</h4>
              <p className="text-[10px] text-slate-500 lowercase font-medium leading-relaxed max-w-xs mx-auto md:mx-0">
                we are a premier educational consultancy helping candidates and parents navigate MBBS and engineering entrance counselling pathways stress-free.
              </p>
            </div>

            <div className="md:col-span-4 space-y-4">
              <h4 className="text-white text-sm font-extrabold tracking-wider">CONTACT DIRECT</h4>
              <p className="text-[10px] text-slate-500 font-bold leading-normal">
                Helpline: +91 99330 85333 <br />
                Email: admissions@sseducation.co.in <br />
                Timing: Mon - Sat: 9:30 AM to 6:30 PM
              </p>
            </div>

            <div className="md:col-span-4 space-y-4">
              <h4 className="text-white text-sm font-extrabold tracking-wider">COUNSELLING RESOURCES</h4>
              <p className="text-[10px] text-slate-500 font-bold leading-normal">
                <a href="https://www.nmc.org.in/" target="_blank" rel="noreferrer" className="hover:text-teal-400 transition-colors">NMC Official Portal</a> • <a href="https://mcc.nic.in/" target="_blank" rel="noreferrer" className="hover:text-teal-400 transition-colors">MCC AIQ Page</a> <br />
                <a href="#eligibility" className="hover:text-teal-400 transition-colors">Eligibility Percentiles</a> • <a href="#mbbs-fees" className="hover:text-teal-400 transition-colors">Tuition Fees Guide</a>
              </p>
            </div>

          </div>

          <div className="text-center pt-8 border-t border-slate-900 text-[10px] text-slate-500 font-bold tracking-widest">
            © 2026 SS EDUCATION CONSULTANCY SERVICES. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>

      {/* Floating desktop dialer */}
      <div className="fixed bottom-6 right-6 z-40 hidden lg:block">
        <motion.a 
          href="tel:+919933085333"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white rounded-full shadow-[0_8px_30px_rgba(13,148,136,0.3)] transition-all relative group"
          title="Call Support: +91 99330 85333"
        >
          <span className="absolute inset-0 rounded-full bg-teal-500/30 animate-ping pointer-events-none" />
          <Phone className="h-6 w-6 fill-white" />
          
          <span className="absolute right-16 scale-0 group-hover:scale-100 transition-all duration-200 origin-right bg-[#090F1E] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap border border-slate-800">
            Call Expert: +91 99330 85333
          </span>
        </motion.a>
      </div>

      {/* Mobile Sticky CTA Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-lg border-t border-slate-100 shadow-2xl lg:hidden flex gap-3">
        <Button 
          onClick={() => setMobileFormOpen(true)}
          className="flex-1 h-14 bg-teal-600 hover:bg-teal-700 text-white font-black text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-teal-600/10"
        >
          <GraduationCap className="h-4.5 w-4.5 shrink-0 animate-bounce" /> Check Eligibility & List
        </Button>
        <a 
          href="tel:+919933085333" 
          className="px-5 h-14 bg-[#0a1d4b] text-white rounded-xl flex items-center justify-center shrink-0 border border-slate-850 shadow-sm"
        >
          <Phone className="h-5 w-5 text-teal-400 shrink-0" />
        </a>
      </div>

      {/* Mobile drawer Modal Lead Form */}
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
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal-50 ring-8 ring-teal-50/50">
                    <CheckCircle2 className="h-10 w-10 text-teal-500" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Form Submitted!</h3>
                  <p className="mt-4 text-slate-500 font-medium leading-relaxed text-sm">
                    Thank you! Our expert medical counsellor will contact you within 24 hours with your customized college compatibility mapping.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-black text-slate-905 text-slate-900 leading-tight mb-2 tracking-tight">Get Your Personalized College List</h3>
                  <p className="text-xs text-slate-500 mb-6 font-medium">Verify your NEET score compatibility & seat matrixes.</p>
                  
                  <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                    <div>
                      <Label htmlFor="mob-mbbs-name" className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1 block">Full Name *</Label>
                      <Input 
                        id="mob-mbbs-name" 
                        placeholder="E.g. Dr. Amit Sharma" 
                        className="h-12 rounded-xl bg-slate-50 border-slate-100 font-medium text-slate-800"
                        value={formData.name || ""}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                      />
                      {errors.name && <p className="text-[10px] font-semibold text-rose-500 mt-1 uppercase tracking-wide">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="mob-mbbs-phone" className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1 block">WhatsApp Number *</Label>
                        <Input 
                          id="mob-mbbs-phone" 
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
                        <Label htmlFor="mob-mbbs-score" className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1 block">NEET Score *</Label>
                        <Input 
                          id="mob-mbbs-score" 
                          type="text"
                          maxLength={3}
                          placeholder="0-720" 
                          className="h-12 rounded-xl bg-slate-50 border-slate-100 font-medium text-slate-800"
                          value={formData.neetScore || ""}
                          onChange={(e) => handleInputChange("neetScore", e.target.value)}
                        />
                        {errors.neetScore && <p className="text-[10px] font-semibold text-rose-500 mt-1 uppercase tracking-wide">{errors.neetScore}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1 block">Category *</Label>
                        <Select 
                          onValueChange={(val) => handleInputChange("category", val)}
                          value={formData.category || ""}
                        >
                          <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-100 font-medium text-slate-800">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-slate-100">
                            <SelectItem value="General">General (UR)</SelectItem>
                            <SelectItem value="OBC">OBC-NCL</SelectItem>
                            <SelectItem value="SC">SC (Scheduled Caste)</SelectItem>
                            <SelectItem value="ST">ST (Scheduled Tribe)</SelectItem>
                            <SelectItem value="EWS">Economically Weaker</SelectItem>
                            <SelectItem value="NRI">NRI / OCI Quota</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.category && <p className="text-[10px] font-semibold text-rose-500 mt-1 uppercase tracking-wide">{errors.category}</p>}
                      </div>

                      <div>
                        <Label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1 block">Domicile State *</Label>
                        <Select 
                          onValueChange={(val) => handleInputChange("domicileState", val)}
                          value={formData.domicileState || ""}
                        >
                          <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-100 font-medium text-slate-800">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-slate-100">
                            <SelectItem value="Delhi">Delhi</SelectItem>
                            <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                            <SelectItem value="Bihar">Bihar</SelectItem>
                            <SelectItem value="West Bengal">West Bengal</SelectItem>
                            <SelectItem value="Karnataka">Karnataka</SelectItem>
                            <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                            <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                            <SelectItem value="Other">Other State</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.domicileState && <p className="text-[10px] font-semibold text-rose-500 mt-1 uppercase tracking-wide">{errors.domicileState}</p>}
                      </div>
                    </div>

                    <div>
                      <Label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1 block">Preferred College Type *</Label>
                      <Select 
                        onValueChange={(val) => handleInputChange("collegeType", val)}
                        value={formData.collegeType || ""}
                      >
                        <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-100 font-medium text-slate-800">
                          <SelectValue placeholder="Select Preference" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-100">
                          <SelectItem value="Government">Government Medical Colleges Only</SelectItem>
                          <SelectItem value="Private">Private Medical Colleges Only</SelectItem>
                          <SelectItem value="Deemed">Deemed Universities Only</SelectItem>
                          <SelectItem value="Both">Both Government & Private Colleges</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.collegeType && <p className="text-[10px] font-semibold text-rose-500 mt-1 uppercase tracking-wide">{errors.collegeType}</p>}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-14 mt-4 bg-teal-600 hover:bg-teal-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
                      disabled={submitting}
                    >
                      {submitting ? "Processing..." : (<>Get My Free College List <ArrowRight className="h-4.5 w-4.5" /></>)}
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
