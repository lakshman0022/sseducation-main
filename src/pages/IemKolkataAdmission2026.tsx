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
  UserCheck,
  Building,
  Check,
  Compass,
  Briefcase,
  Library,
  Wifi,
  Trophy,
  Activity,
  HeartPulse,
  Mail,
  Zap,
  Dribbble,
  Play,
  ArrowUpRight
} from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import iemCampus from "@/assets/iem-campus-new.png";
import iemBuilding from "@/assets/iem-building.jpg";
import iemLab from "@/assets/iem-lab.jpg";

import axisBankLogo from "@/assets/partner-logos/Axis Bank p11.png";
import capgeminiLogo from "@/assets/partner-logos/Capgemini p5.jpg";
import daburLogo from "@/assets/partner-logos/Dabur p15.png";
import eyLogo from "@/assets/partner-logos/EY p10.png";
import ibmLogo from "@/assets/partner-logos/IBM p8.png";
import kotakMahindraLogo from "@/assets/partner-logos/Kotak Mahindra p14.png";
import metlifeLogo from "@/assets/partner-logos/MetLife p16.png";
import oracleLogo from "@/assets/partner-logos/Oracle p9.png";
import pwcLogo from "@/assets/partner-logos/PwC p6.png";
import relianceLogo from "@/assets/partner-logos/Reliance p13.png";
import tcsLogo from "@/assets/partner-logos/TCS p2.jpg";
import techMahindraLogo from "@/assets/partner-logos/Tech Mahindra p12.png";
import wiproLogo from "@/assets/partner-logos/Wipro p4.png";
import amazonLogo from "@/assets/partner-logos/amazon p1.png";
import cognizantLogo from "@/assets/partner-logos/cognizant p7.png";
import infosysLogo from "@/assets/partner-logos/infosys p3.png";

// Form Validation Schema
const leadFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().trim().email("Enter a valid email address").max(120).optional().or(z.literal("")),
  state: z.string().min(1, "Select your state"),
  course: z.string().min(1, "Select preferred course"),
});

type FormDataType = z.infer<typeof leadFormSchema>;

export default function IemKolkataAdmission2026() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>("about-iem");
  const [activeCourseCategory, setActiveCourseCategory] = useState<"engineering" | "management" | "computing">("engineering");
  const [mobileTOCOpen, setMobileTOCOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Partial<FormDataType>>({
    name: "",
    phone: "",
    email: "",
    state: "",
    course: "",
  });

  const formRef = useRef<HTMLDivElement>(null);
  const sectionsRef = {
    "about-iem": useRef<HTMLElement>(null),
    "key-highlights": useRef<HTMLElement>(null),
    "rankings-accreditation": useRef<HTMLElement>(null),
    "courses-offered": useRef<HTMLElement>(null),
    "btech-branches": useRef<HTMLElement>(null),
    "fees-structure": useRef<HTMLElement>(null),
    "admission-eligibility": useRef<HTMLElement>(null),
    "admission-process": useRef<HTMLElement>(null),
    "placements": useRef<HTMLElement>(null),
    "facilities": useRef<HTMLElement>(null),
    "why-iem": useRef<HTMLElement>(null),
    "faqs": useRef<HTMLElement>(null),
    "contact": useRef<HTMLElement>(null),
  };

  // Scroll spy to highlight active section in table of contents
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;

      for (const [key, ref] of Object.entries(sectionsRef)) {
        if (ref.current) {
          const offsetTop = ref.current.offsetTop;
          const offsetHeight = ref.current.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(key);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const nameInput = document.getElementById("iem-lead-name");
      nameInput?.focus();
    }, 800);
  };

  const scrollToSection = (id: keyof typeof sectionsRef) => {
    const element = sectionsRef[id].current;
    if (element) {
      const headerOffset = 140;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
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

    const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdLoigxaiQ05jssy6oUcVgENjCRBFjE1yFBmmCmB1EnPVZghw/formResponse";

    const googleFormData = new FormData();
    googleFormData.append("entry.1502716309", parsed.data.name);
    googleFormData.append("entry.1202722742", parsed.data.phone);
    googleFormData.append("entry.267493369", parsed.data.email || "No Email Provided");
    googleFormData.append("entry.921865976", parsed.data.state);
    googleFormData.append("entry.85122333", `IEM Kolkata Showcase - Preferred Course: ${parsed.data.course}`);

    try {
      await fetch(FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: googleFormData
      });
      setSubmitting(false);
      setSubmitted(true);
      toast.success("Profile saved! Our senior counselor will get in touch with you shortly.");
    } catch (error) {
      setSubmitting(false);
      setSubmitted(true);
      toast.success("Profile saved! Our senior counselor will contact you shortly.");
    }
  };

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const menuItems = [
    { id: "about-iem", label: "Overview" },
    { id: "key-highlights", label: "Highlights" },
    { id: "rankings-accreditation", label: "Rankings" },
    { id: "courses-offered", label: "Courses" },
    { id: "fees-structure", label: "Fees" },
    { id: "admission-eligibility", label: "Eligibility" },
    { id: "placements", label: "Placements" },
    { id: "facilities", label: "Facilities" },
    { id: "faqs", label: "FAQs" },
  ] as const;

  const highlights = [
    { title: "Established", value: "1989", desc: "First Private Engineering College in WB", icon: Calendar },
    { title: "Type", value: "Private Autonomous", desc: "UEMK / MAKAUT Affiliated", icon: Building2 },
    { title: "Approvals", value: "AICTE & UGC", desc: "Governed by Ministry of Education", icon: ShieldCheck },
    { title: "Accreditation", value: "NAAC Grade A", desc: "Re-accredited in 2024", icon: Award },
    { title: "NBA Status", value: "Tier 1 Accredited", desc: "For CSE, IT, ECE, EE & MBA", icon: Trophy },
    { title: "Campus", value: "Salt Lake Sec V", desc: "Located in the Tech & IT Hub", icon: MapPin },
    { title: "Faculty", value: "349+ Members", desc: "Highly experienced academic crew", icon: UserCheck },
    { title: "Recruiters", value: "100+ Companies", desc: "Annual drives with top corporations", icon: Building },
    { title: "Highest Package", value: "₹40 LPA", desc: "Acquired by a B.Tech CSE student", icon: DollarSign },
    { title: "Admission Via", value: "WBJEE / JEE / IEMJEE", desc: "Entrance merit-based counseling", icon: FileText },
  ];

  const rankingList = {
    nirf: [
      { year: "2025", category: "Engineering Category", rank: "#151–200 in India" },
      { year: "2024", category: "Engineering Category", rank: "#151–200 in India" },
    ],
    other: [
      { media: "The Week", rank: "#93 in India", category: "B.Tech Colleges Overall", year: "2025" },
      { media: "India Today", rank: "#53 in India", category: "Top Private B.Tech Colleges", year: "2023" },
      { media: "Times of India", rank: "#1 in Kolkata", category: "B.Tech Private Colleges", year: "2024" },
      { media: "IIRF Ranking", rank: "#107 in India", category: "Top B.Tech Colleges", year: "2025" },
    ]
  };

  const coursesList = {
    ug: [
      { name: "B.Tech (Bachelor of Technology)", duration: "4 Years", details: "Available branches in Computer Science, IT, ECE, EE, Mechanical, etc. Heavy emphasis on lab modules and tech innovation." },
      { name: "BCA (Bachelor of Computer Applications)", duration: "3 Years", details: "Curriculum designed for professional software development, database managers, and internet technologists." },
      { name: "BBA (Bachelor of Business Administration)", duration: "3 Years", details: "Core marketing, finance, HR training. Prepares students for leadership and corporate operations." },
      { name: "BBA LLB (Integrated Law Degree)", duration: "5 Years", details: "Dual-domain integration covering business strategy with comprehensive civil, corporate, and technology law." },
      { name: "BHM / BHHM (Hospitality Management)", duration: "3/4 Years", details: "Hospitality and hotel management training with industrial attachments." },
    ],
    pg: [
      { name: "MBA (Master of Business Administration)", duration: "2 Years", details: "Accredited program with dual specialisations. Heavy recruiter involvement and outstanding average salaries." },
      { name: "MCA (Master of Computer Applications)", duration: "2 Years", details: "Advanced computational concepts, artificial intelligence design, software engineering methodologies, and mobile architectures." },
      { name: "M.Tech (Master of Technology)", duration: "2 Years", details: "Specialised research-oriented B.Tech extensions. Involves publishing papers, specialized projects, and lab instructions." },
      { name: "M.Sc. (Master of Science)", duration: "2 Years", details: "Specialist post-graduate domain focus. Pure scientific research extensions in technological fields." },
    ]
  };

  const btechBranches = [
    { title: "Computer Science & Engineering (CSE)", desc: "The flagship branch of IEM. Features excellent placement ratios and competitive cutoffs.", tag: "Most Coveted" },
    { title: "CSE with AI & ML", desc: "Advanced training in neural networks, cognitive algorithms, and machine learning models.", tag: "Trending" },
    { title: "CSE with Artificial Intelligence", desc: "Focuses on knowledge engineering, natural language processing, and robotic automation.", tag: "Future Tech" },
    { title: "CSE with IoT & Blockchain", desc: "Distributed ledger development, smart contracts, and micro-hardware network frameworks.", tag: "Specialised" },
    { title: "CSE with Data Science", desc: "Data warehousing, big data compute models, predictive analysis, and enterprise visualization.", tag: "High Demand" },
    { title: "CSE with Cyber Security", desc: "Penetration testing, cloud firewall administration, cryptographics, and network security audit.", tag: "Critical Core" },
    { title: "Cloud Computing", desc: "SaaS architecture, AWS/Azure configurations, virtualization mechanics, and enterprise deployments.", tag: "In Demand" },
    { title: "Information Technology", desc: "Software lifecycle operations, web engines, database systems, and networking solutions.", tag: "Strong Placements" },
    { title: "Electronics & Communication Engineering", desc: "Semiconductors, signal transmitters, cellular communications, and embedded IoT processors.", tag: "Core Legacy" },
    { title: "Electrical Engineering", desc: "Power matrices, electrical motor grids, high-voltage mechanics, and renewable energy conversion.", tag: "Core Legacy" },
    { title: "Mechanical Engineering", desc: "Thermal computation, fluid engines, CAD/CAM drafting, automated manufacturing, and heavy machines.", tag: "Core Legacy" },
  ];

  const placementStats = {
    highlights2024: [
      { label: "Total Students Placed", value: "1,054", desc: "Across all B.Tech and postgraduate branches" },
      { label: "B.Tech Students Placed", value: "774", desc: "High-density technical and core placements" },
      { label: "Median Annual Package", value: "₹6.0 LPA", desc: "Leading median return inside West Bengal private sector" },
      { label: "Highest Annual Package", value: "₹40.0 LPA", desc: "Offered by a top-tier product multinational corporation" },
    ],
    highlights2023: [
      { label: "Median Annual Package", value: "₹4.8 LPA", desc: "Consistent output across core and tech fields" },
      { label: "Highest Annual Package", value: "₹32.0 LPA", desc: "Premium product development role recruitment" },
    ]
  };

  const recruiters = [
    { name: "Amazon", logo: amazonLogo },
    { name: "TCS", logo: tcsLogo },
    { name: "Infosys", logo: infosysLogo },
    { name: "Wipro", logo: wiproLogo },
    { name: "Cognizant", logo: cognizantLogo },
    { name: "Capgemini", logo: capgeminiLogo },
    { name: "PwC", logo: pwcLogo },
    { name: "IBM", logo: ibmLogo },
    { name: "Oracle", logo: oracleLogo },
    { name: "EY", logo: eyLogo },
    { name: "Axis Bank", logo: axisBankLogo },
    { name: "Tech Mahindra", logo: techMahindraLogo },
    { name: "Reliance", logo: relianceLogo },
    { name: "Kotak Mahindra", logo: kotakMahindraLogo },
    { name: "Dabur", logo: daburLogo },
    { name: "MetLife", logo: metlifeLogo }
  ];

  const facilities = [
    { title: "Boys & Girls Hostels", desc: "Highly secure, fully operational clean hostels separate for boys and girls with modern mess facilities.", icon: Building },
    { title: "Central Library", desc: "Spacious academic library containing over 50,000+ reference volumes, international journals, and research index gateways.", icon: Library },
    { title: "Wi-Fi Campus", desc: "High-speed optical fiber wireless network access across classrooms, labs, offices, and central common lawns.", icon: Wifi },
    { title: "Sports Complex", desc: "Physical fitness training grids with outdoor fields, indoor table grids, and gymnasiums.", icon: Dribbble },
    { title: "Modern Labs", desc: "High-end compute machines, electronics oscilloscopes, electrical machines, and structural fabrication workshops.", icon: Zap },
    { title: "Cafeteria", desc: "A clean, spacious, multi-cuisine hub serving nutritious food, quick snacks, and fresh beverages at subsidized rates.", icon: UserCheck },
    { title: "Medical Facilities", desc: "First-aid response rooms, active counselor panels, and 24/7 dedicated tie-ups with leading Salt Lake superspecialty hospitals.", icon: HeartPulse },
    { title: "Transportation", desc: "Excellent bus routing connectivity across major drop points of Kolkata and nearby suburban sectors.", icon: Compass },
    { title: "Auditorium", desc: "A premium air-conditioned central hall equipped with modern sound interfaces hosting technical talks and cultural fests.", icon: BookOpen },
    { title: "Industrial Tours", desc: "Organized quarterly visits to IT hubs and manufacturing units to provide direct exposure to industry workflows.", icon: Briefcase },
  ];

  const chooseReasons = [
    { title: "Strong Placements", desc: "Consistent records of placing over 90% of students, with a ₹6 LPA median and packages hitting up to ₹40 LPA in top corporations." },
    { title: "Salt Lake IT Hub Location", desc: "Located in Sector V — the technology center of Eastern India — providing direct industry proximity, project channels, and recruiter tie-ups." },
    { title: "AI & Tech-Focused Curriculum", desc: "Industry-oriented programs tailored to contemporary technology domains like Artificial Intelligence, Machine Learning, and Blockchain." },
    { title: "Industry Exposure", desc: "Regular technical conventions, hackathons, and corporate workshops with senior software architects and directors." },
    { title: "Research Ecosystem", desc: "Vibrant environment for publishing research papers, file patents, and working on funded industrial project initiatives." },
    { title: "Strong Alumni Network", desc: "Alumni currently holding leading positions at Fortune 500 giants including Google, Microsoft, Meta, Amazon, and top banks." },
    { title: "Modern Infrastructure", desc: "State-of-the-art computational laboratories, smart multimedia classrooms, and advanced hardware prototyping suites." },
    { title: "Internship Opportunities", desc: "Active internship counseling pathways that place students with multinational companies during their pre-final semesters." },
  ];

  const faqItems = [
    {
      q: "Is IEM Kolkata good for CSE?",
      a: "Yes! Institute of Engineering & Management (IEM) Kolkata is renowned as one of the best private colleges for Computer Science & Engineering (CSE) in Eastern India. It boasts NAAC Grade 'A' and NBA Tier 1 accreditation specifically for its CSE department. The branch features highly qualified faculty, advanced laboratories (specializing in AI/ML, Data Science, and Cyber Security), and an exceptional placement record with top recruiters like Amazon, PwC, Cognizant, and TCS conducting dedicated placement drives."
    },
    {
      q: "What is the highest package at IEM Kolkata?",
      a: "The highest package secured at IEM Kolkata has reached ₹40 LPA in the recent placement drives. The average B.Tech placement package lies in the range of ₹5.5 LPA to ₹6.5 LPA, with the B.Tech CSE and tech branch median package standing strongly at ₹6 LPA. This represents one of the highest return-on-investments (ROI) among private engineering institutions in West Bengal."
    },
    {
      q: "Which entrance exams are accepted?",
      a: "For B.Tech admissions, IEM Kolkata primarily accepts West Bengal Joint Entrance Examination (WBJEE) ranks and Joint Entrance Exam (JEE) Main ranks. The institute also conducts its own national entrance test called IEMJEE for candidates looking to secure direct merit seats or admissions in specific courses. For other streams, examinations like JECA (for MCA), MAT/JEMAT/CAT (for MBA), and MAKAUT merit tests are accepted."
    },
    {
      q: "Is hostel available?",
      a: "Yes, separate, highly secure hostels are available for both boys and girls at IEM Kolkata. The hostels provide comfortable, well-furnished rooms, 24/7 power backup, high-speed Wi-Fi, and recreational facilities. The mess provides clean, healthy, and nutritious meals prepared under hygienic conditions. Since the campus is located in Salt Lake Sector V, several private PG options and apartments are also easily available nearby."
    },
    {
      q: "Is IEM AICTE approved?",
      a: "Yes, Institute of Engineering & Management (IEM) is fully approved by the All India Council for Technical Education (AICTE), Ministry of Education, Government of India, and recognized by the University Grants Commission (UGC). It is affiliated with the University of Engineering & Management (UEMK) and also maintains legacy affiliations with Maulana Abul Kalam Azad University of Technology (MAKAUT), formerly WBUT."
    },
    {
      q: "What are the fees for B.Tech?",
      a: "For B.Tech courses starting in 2026, the fee structure is structured sem-by-sem: the 1st Semester admission and tuition fees amount to ₹1,40,000, and semesters 2nd through 8th are priced at ₹1,15,000 each. The total B.Tech course fee stands at ₹9,45,000. It does not include hostel accommodation or exam registration fees, which are charged separately."
    },
    {
      q: "Is scholarship available?",
      a: "Yes! IEM Kolkata provides various merit-based scholarships and fee concession frameworks for deserving candidates. Students who achieve outstanding ranks in WBJEE or JEE Main, as well as state board topper lists, are eligible for tuition concessions. Additionally, government scholarships like the Swami Vivekananda Merit-cum-Means (SVMCM) scholarship, Kanyashree, and national scholarship portals are fully supported."
    },
    {
      q: "What is the placement record?",
      a: "IEM Kolkata holds an exceptional placement record in West Bengal. In 2024, the institute placed over 1,054 students across all programs, including 774 B.Tech candidates. Over 100 top companies recruit from the campus annually. The placement cell provides pre-placement training modules, including mock interviews, coding bootcamps, and resume-building sessions to ensure high eligibility."
    }
  ];
const relatedArticles = [
    { title: "Best Engineering Colleges in Kolkata", desc: "A comprehensive analysis of top government and private engineering institutes in Kolkata based on infrastructure, fees, and placements.", link: "#" },
    { title: "WBJEE Counselling Guide 2026", desc: "A complete step-by-step walkthrough of the WBJEE counseling process, seat allocation, document verification, and choice-filling.", link: "#" },
    { title: "Top CSE Colleges in West Bengal", desc: "Discover which colleges offer the best computer science curriculum, laboratories, and product placements in West Bengal.", link: "#" },
    { title: "Engineering Admission Guide 2026", desc: "Everything you need to know about preparing for, applying to, and choosing the right engineering college in India this academic year.", link: "#" },
  ];

  return (
    <main className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-amber-100 selection:text-amber-900">

      {/* Dynamic SEO Academic Banner */}
      <div className="bg-[#0b172a] py-3 text-center border-b border-white/5 relative z-40">
        <div className="container mx-auto px-4 flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 animate-pulse" />
          <p className="text-white text-[10px] font-black uppercase tracking-[0.2em] leading-none font-sans">
            Institute of Engineering & Management (IEM), Kolkata — 2026 Academic Showcase
          </p>
        </div>
      </div>

      {/* Cinematic Showcase Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0c2340] via-[#091b33] to-[#050f1e] text-white pt-24 pb-28 md:pt-32 md:pb-36 overflow-hidden">
        {/* Full-bleed Backdrop Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={iemCampus}
            className="absolute inset-0 w-full h-full object-cover scale-105 transform transition-transform duration-1000"
            alt="IEM Kolkata Campus Backdrop"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c2340] via-[#0c2340]/95 to-[#091b33]/85" />
        </div>

        <div className="container mx-auto px-4 relative z-20 max-w-7xl">
          <div className="max-w-4xl space-y-6">
            {/* Breadcrumb Navigation in Hero */}
            <nav className="inline-flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.2em] text-slate-350 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <span className="text-amber-500 font-bold">/</span>
              <a href="/engineering" className="hover:text-white transition-colors">Colleges</a>
              <span className="text-amber-500 font-bold">/</span>
              <span className="text-amber-400">IEM Kolkata Admission 2026</span>
            </nav>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.1] text-white">
                IEM Kolkata Admission 2026 — Complete College Guide
              </h1>

              <p className="text-slate-300 text-sm sm:text-lg font-sans font-medium leading-relaxed max-w-3xl">
                Comprehensive public guide to Institute of Engineering & Management (IEM), Kolkata. Explore rankings, detailed B.Tech programs, placement metrics, and dynamic step-by-step admission roadmap for 2026.
              </p>
            </div>

            {/* 4 Important Statistics in a Horizontal Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10 mt-8 max-w-3xl">
              <div>
                <span className="block text-[10px] font-sans font-extrabold text-[#c5a880] uppercase tracking-widest leading-none mb-2">Established</span>
                <span className="block text-2xl md:text-3xl font-serif font-bold text-white leading-none">1989</span>
              </div>
              <div>
                <span className="block text-[10px] font-sans font-extrabold text-[#c5a880] uppercase tracking-widest leading-none mb-2">NAAC</span>
                <span className="block text-2xl md:text-3xl font-serif font-bold text-white leading-none">Grade A</span>
              </div>
              <div>
                <span className="block text-[10px] font-sans font-extrabold text-[#c5a880] uppercase tracking-widest leading-none mb-2">NBA</span>
                <span className="block text-2xl md:text-3xl font-serif font-bold text-white leading-none">Tier 1</span>
              </div>
              <div>
                <span className="block text-[10px] font-sans font-extrabold text-[#c5a880] uppercase tracking-widest leading-none mb-2">Highest Package</span>
                <span className="block text-2xl md:text-3xl font-serif font-bold text-white leading-none">₹40 LPA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Double-Column Layout */}
      <div className="container mx-auto px-4 max-w-7xl py-16">
        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* Mobile Table of Contents Accordion */}
          <div className="block lg:hidden mb-8 relative z-30">
            <div className="bg-slate-50/90 backdrop-blur-sm border border-slate-200/80 border-l-4 border-l-[#0c2340] rounded-2xl shadow-sm overflow-hidden">
              <button
                onClick={() => setMobileTOCOpen(!mobileTOCOpen)}
                className="w-full flex items-center justify-between p-4 px-5 text-left text-[#0c2340]"
              >
                <div className="flex flex-col">
                  <span className="text-[9px] font-sans font-black uppercase tracking-[0.2em] text-[#c5a880]">Guide Navigator</span>
                  <span className="text-sm font-serif font-black flex items-center gap-2 mt-0.5">
                    Jump to Section
                    <span className="text-[10px] font-sans font-black uppercase tracking-wider text-slate-500 bg-slate-200/50 px-2 py-0.5 rounded-full">
                      {menuItems.find(item => item.id === activeSection || (item.id === "admission-eligibility" && (activeSection === "admission-eligibility" || activeSection === "admission-process")))?.label || "Overview"}
                    </span>
                  </span>
                </div>
                <ChevronDown className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${mobileTOCOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {mobileTOCOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden border-t border-slate-200/60 bg-white"
                  >
                    <div className="p-3 grid grid-cols-2 gap-2">
                      {menuItems.map((item) => {
                        const isActive = activeSection === item.id || 
                          (item.id === "admission-eligibility" && (activeSection === "admission-eligibility" || activeSection === "admission-process"));
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              scrollToSection(item.id);
                              setMobileTOCOpen(false);
                            }}
                            className={`flex items-center text-left py-2.5 px-3 rounded-xl transition-all text-[10px] font-sans font-black uppercase tracking-widest ${
                              isActive 
                                ? "bg-[#0c2340]/5 text-[#0c2340]" 
                                : "text-slate-500 hover:bg-slate-50"
                            }`}
                          >
                            <span className={isActive ? "text-[#0c2340]" : ""}>
                              {item.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Left Sticky Table of Contents (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-[120px] self-start w-full max-w-[280px]">
            <div className="bg-slate-50/50 backdrop-blur-sm border border-slate-200/60 border-l-4 border-l-[#0c2340] rounded-2xl p-6 shadow-sm space-y-6">
              <div>
                <span className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-[#c5a880] block">Guide Navigator</span>
                <h3 className="text-base font-serif font-black text-[#0c2340] mt-1">Table of Contents</h3>
              </div>
              <div className="h-[1px] bg-slate-200/60 w-full" />
              <ul className="space-y-1.5 text-xs font-sans font-bold">
                {menuItems.map((item) => {
                  const isActive = activeSection === item.id || 
                    (item.id === "admission-eligibility" && (activeSection === "admission-eligibility" || activeSection === "admission-process"));
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full flex items-center text-left py-2 px-3.5 rounded-xl transition-all duration-300 relative group ${
                          isActive 
                            ? "bg-[#0c2340]/5 text-[#0c2340]" 
                            : "text-slate-500 hover:text-[#0c2340] hover:bg-slate-100/40"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#0c2340] rounded-r-lg"
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                          />
                        )}
                        <span className={`transition-all duration-300 uppercase tracking-widest text-[10px] font-black ${isActive ? "pl-3 text-[#0c2340]" : "pl-1 hover:pl-2"}`}>
                          {item.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Right Column: Main Content Sections */}
          <div className="lg:col-span-9 space-y-24">

            {/* SECTION 1: ABOUT IEM */}
            <section id="about-iem" ref={sectionsRef["about-iem"]} className="scroll-mt-28 bg-white py-4">
              <div className="grid md:grid-cols-12 gap-8 items-start border-b border-slate-100 pb-12">
                {/* Left side: Section Heading */}
                <div className="md:col-span-4">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0c2340] border-l-4 border-[#c5a880] pl-4 tracking-tight leading-tight">
                    About IEM Kolkata
                  </h2>
                </div>

                {/* Right side: Readable paragraphs */}
                <div className="md:col-span-8 space-y-6 text-slate-650 text-sm md:text-base leading-relaxed font-sans font-medium text-slate-600">
                  <p>
                    The Institute of Engineering & Management (IEM), Kolkata, is the oldest and most prestigious private engineering college in West Bengal. Established in 1989, the college is globally recognized for academic excellence and high placements.
                  </p>
                  <p>
                    Located in the IT Hub of Sector V, Salt Lake — the IT epicenter of Eastern India — the college provides extensive industry exposure to students, preparing them for highly competitive global careers.
                  </p>
                  <p className="text-slate-900 font-serif font-bold italic border-l-2 border-slate-350 pl-4 py-1">
                    Known as the "Jewel of the East," the campus focuses on professional development, technology incubation, and research-driven workflows.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: HIGHLIGHTS */}
            <section id="key-highlights" ref={sectionsRef["key-highlights"]} className="scroll-mt-28 bg-white py-4 border-b border-slate-100 pb-12">
              <div className="grid md:grid-cols-12 gap-8 items-start">
                {/* Left side: Section Heading */}
                <div className="md:col-span-4">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0c2340] border-l-4 border-[#c5a880] pl-4 tracking-tight leading-tight">
                    Key Highlights
                  </h2>
                </div>

                {/* Right side: Statistics Grid */}
                <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8 pt-2">
                  <div className="bg-white border-t border-slate-200/60 pt-4">
                    <span className="block text-3xl font-serif font-bold text-[#0c2340]">349+</span>
                    <span className="block text-[10px] font-sans font-extrabold text-[#c5a880] uppercase tracking-widest mt-1">Expert Faculty</span>
                  </div>
                  <div className="bg-white border-t border-slate-200/60 pt-4">
                    <span className="block text-3xl font-serif font-bold text-[#0c2340]">100+</span>
                    <span className="block text-[10px] font-sans font-extrabold text-[#c5a880] uppercase tracking-widest mt-1">Recruiter Alliances</span>
                  </div>
                  <div className="bg-white border-t border-slate-200/60 pt-4">
                    <span className="block text-3xl font-serif font-bold text-[#0c2340]">₹40 LPA</span>
                    <span className="block text-[10px] font-sans font-extrabold text-[#c5a880] uppercase tracking-widest mt-1">Highest Package</span>
                  </div>
                  <div className="bg-white border-t border-slate-200/60 pt-4">
                    <span className="block text-3xl font-serif font-bold text-[#0c2340]">Sector V</span>
                    <span className="block text-[10px] font-sans font-extrabold text-[#c5a880] uppercase tracking-widest mt-1">Prime Location</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: RANKINGS */}
            <section id="rankings-accreditation" ref={sectionsRef["rankings-accreditation"]} className="scroll-mt-28 bg-white py-4 border-b border-slate-100 pb-12">
              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-4">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0c2340] border-l-4 border-[#c5a880] pl-4 tracking-tight leading-tight">
                    Rankings & Accreditations
                  </h2>
                </div>

                <div className="md:col-span-8">
                  <div className="bg-white border border-slate-250 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#0c2340] text-white text-[10px] font-sans font-bold uppercase tracking-widest border-b border-slate-200">
                          <th className="p-4">Agency</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Ranking</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs font-sans text-slate-700 font-semibold">
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 font-bold text-slate-900">NIRF 2025</td>
                          <td className="p-4">Engineering Category</td>
                          <td className="p-4 text-[#0c2340] font-bold">#151–200 in India</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 font-bold text-slate-900">NIRF 2024</td>
                          <td className="p-4">Engineering Category</td>
                          <td className="p-4 text-[#0c2340] font-bold">#151–200 in India</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 font-bold text-slate-900">The Week</td>
                          <td className="p-4">B.Tech Colleges Overall (2025)</td>
                          <td className="p-4 text-[#0c2340] font-bold">#93 in India</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 font-bold text-slate-900">India Today</td>
                          <td className="p-4">Top Private B.Tech Colleges (2023)</td>
                          <td className="p-4 text-[#0c2340] font-bold">#53 in India</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 font-bold text-slate-900">Times of India</td>
                          <td className="p-4">B.Tech Private Colleges (2024)</td>
                          <td className="p-4 text-[#0c2340] font-bold">#1 in Kolkata</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 font-bold text-slate-900">IIRF Ranking</td>
                          <td className="p-4">Top B.Tech Colleges (2025)</td>
                          <td className="p-4 text-[#0c2340] font-bold">#107 in India</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: COURSES */}
            <section id="courses-offered" ref={sectionsRef["courses-offered"]} className="scroll-mt-28 bg-white py-4 border-b border-slate-100 pb-12">
              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-4">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0c2340] border-l-4 border-[#c5a880] pl-4 tracking-tight leading-tight">
                    Courses Offered
                  </h2>
                </div>

                <div className="md:col-span-8 space-y-6">
                  {/* Category Selection Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: "engineering", title: "Engineering", desc: "B.Tech & M.Tech Programs" },
                      { id: "management", title: "Management", desc: "MBA, BBA & Hospitality Streams" },
                      { id: "computing", title: "Computer Applications", desc: "BCA, MCA, M.Sc & Law Degrees" },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCourseCategory(cat.id as any)}
                        className={`text-left p-5 rounded-2xl border transition-all duration-300 ${
                          activeCourseCategory === cat.id
                            ? "bg-[#0c2340] text-white border-[#0c2340] shadow-md"
                            : "bg-[#FAF9F6] text-slate-800 border-slate-200/60 hover:bg-slate-100/60"
                        }`}
                      >
                        <h4 className="text-sm font-serif font-bold uppercase tracking-wider leading-none mb-2">{cat.title}</h4>
                        <p className={`text-[10px] font-semibold leading-relaxed ${activeCourseCategory === cat.id ? "text-slate-350 text-slate-300" : "text-slate-500"}`}>{cat.desc}</p>
                      </button>
                    ))}
                  </div>

                  {/* Expandable Courses Details Area */}
                  <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-slate-100 mt-4 space-y-6">
                    {activeCourseCategory === "engineering" && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h4 className="text-lg font-serif font-bold text-[#0c2340]">B.Tech (Bachelor of Technology) — 4 Years</h4>
                          <p className="text-slate-500 text-xs font-semibold leading-relaxed font-sans">
                            Flagship technical programs featuring lab-based learning modules and heavy corporate placements. Specializations include:
                          </p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {btechBranches.map((branch, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200/50 shadow-sm flex flex-col justify-between">
                              <span className="text-xs font-serif font-bold text-[#0c2340] leading-snug">{branch.title}</span>
                              <span className="text-[9px] font-sans font-bold text-[#b8860b] uppercase tracking-wider mt-1">{branch.tag}</span>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-slate-200/60 pt-4 space-y-2">
                          <h4 className="text-base font-serif font-bold text-[#0c2340]">M.Tech (Master of Technology) — 2 Years</h4>
                          <p className="text-slate-500 text-xs font-semibold leading-relaxed font-sans">
                            Research-driven post-graduate credentials with advanced computational extensions. Publishing papers and specialized lab operations compiled in legacy channels.
                          </p>
                        </div>
                      </div>
                    )}

                    {activeCourseCategory === "management" && (
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <h4 className="text-lg font-serif font-bold text-[#0c2340]">MBA (Master of Business Administration) — 2 Years</h4>
                          <p className="text-slate-500 text-xs font-semibold leading-relaxed font-sans">
                            Accredited management program with dual specialisations. Recruiter involvement in finance, marketing, and HR. Must hold a valid Graduation degree in any discipline with a minimum of 50% marks aggregate. Accepted entrance marks include JEMAT, MAT, CAT, or equivalent score indices.
                          </p>
                        </div>
                        <div className="border-t border-slate-200/60 pt-4 space-y-2">
                          <h4 className="text-base font-serif font-bold text-[#0c2340]">BBA (Bachelor of Business Administration) — 3 Years</h4>
                          <p className="text-slate-500 text-xs font-semibold leading-relaxed font-sans">
                            Core administration credentials preparing young learners for corporate leadership and business operations.
                          </p>
                        </div>
                        <div className="border-t border-slate-200/60 pt-4 space-y-2">
                          <h4 className="text-base font-serif font-bold text-[#0c2340]">BHM / BHHM (Hospitality Management) — 3/4 Years</h4>
                          <p className="text-slate-500 text-xs font-semibold leading-relaxed font-sans">
                            Structured hands-on hotel management pipelines with active industry placements and attachments.
                          </p>
                        </div>
                      </div>
                    )}

                    {activeCourseCategory === "computing" && (
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <h4 className="text-lg font-serif font-bold text-[#0c2340]">BCA (Bachelor of Computer Applications) — 3 Years</h4>
                          <p className="text-slate-500 text-xs font-semibold leading-relaxed font-sans">
                            Curriculum designed for professional software development, database managers, and internet technologists. Prepares candidates with hands-on coding paradigms.
                          </p>
                        </div>
                        <div className="border-t border-slate-200/60 pt-4 space-y-2">
                          <h4 className="text-base font-serif font-bold text-[#0c2340]">MCA (Master of Computer Applications) — 2 Years</h4>
                          <p className="text-slate-500 text-xs font-semibold leading-relaxed font-sans">
                            Advanced computational concepts, artificial intelligence design, software engineering methodologies, and mobile architectures. Must have passed BCA or B.Sc in Computer Science/Mathematics with Mathematics as a compulsory subject. Requires a qualifying rank in JECA.
                          </p>
                        </div>
                        <div className="border-t border-slate-200/60 pt-4 space-y-2">
                          <h4 className="text-base font-serif font-bold text-[#0c2340]">M.Sc. (Master of Science) — 2 Years</h4>
                          <p className="text-slate-500 text-xs font-semibold leading-relaxed font-sans">
                            Pure scientific postgraduate focus. Concentrated on mathematical models, big data computing, and tech systems.
                          </p>
                        </div>
                        <div className="border-t border-slate-200/60 pt-4 space-y-2">
                          <h4 className="text-base font-serif font-bold text-[#0c2340]">BBA LLB (Integrated Law) — 5 Years</h4>
                          <p className="text-slate-500 text-xs font-semibold leading-relaxed font-sans">
                            Dual-domain integration covering business strategy with comprehensive civil, corporate, and technology law. Bridges administrative capability with technical compliance paradigms.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: FEES */}
            <section id="fees-structure" ref={sectionsRef["fees-structure"]} className="scroll-mt-28 bg-white py-4 border-b border-slate-100 pb-12">
              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-4">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0c2340] border-l-4 border-[#c5a880] pl-4 tracking-tight leading-tight">
                    Tuition & Fee Structure
                  </h2>
                </div>

                <div className="md:col-span-8">
                  <div className="bg-white border border-slate-250 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#0c2340] text-white text-[10px] font-sans font-bold uppercase tracking-widest border-b border-slate-200">
                          <th className="p-4">Course Program</th>
                          <th className="p-4">Admission / 1st Sem</th>
                          <th className="p-4">Semesters (2nd to 8th)</th>
                          <th className="p-4 text-right">Total Est. Fees</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs font-sans text-slate-700 font-semibold">
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 font-bold text-slate-900">B.Tech (Engineering Streams)</td>
                          <td className="p-4">₹1,40,000</td>
                          <td className="p-4">₹1,15,000 / Sem</td>
                          <td className="p-4 font-bold text-[#0c2340] text-right">₹9,45,000</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 font-bold text-slate-900">MBA (Master of Business)</td>
                          <td className="p-4">₹2,00,000 approx.</td>
                          <td className="p-4">₹1,50,000 - ₹2,00,000 / Sem</td>
                          <td className="p-4 font-bold text-[#0c2340] text-right">₹7.0 - ₹8.0 Lakhs</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 font-bold text-slate-900">BCA / BBA (Undergraduate)</td>
                          <td className="p-4">₹65,000 approx.</td>
                          <td className="p-4">₹55,000 - ₹60,000 / Sem</td>
                          <td className="p-4 font-bold text-[#0c2340] text-right">₹1,15,000 (1st Yr)</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 font-bold text-slate-900">M.Tech / MCA (Technical PG)</td>
                          <td className="p-4">₹75,000 approx.</td>
                          <td className="p-4">₹60,000 - ₹75,000 / Sem</td>
                          <td className="p-4 font-bold text-[#0c2340] text-right">₹2.0 - ₹3.0 Lakhs</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans font-bold uppercase tracking-wider mt-4">
                    * Hostel charges and exam registration fees are separate under college policy. Installment options are supported.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 6: ELIGIBILITY */}
            <section id="admission-eligibility" ref={sectionsRef["admission-eligibility"]} className="scroll-mt-28 bg-white py-4 border-b border-slate-100 pb-12">
              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-4">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0c2340] border-l-4 border-[#c5a880] pl-4 tracking-tight leading-tight">
                    Eligibility Criteria
                  </h2>
                </div>

                <div className="md:col-span-8 space-y-6">
                  {/* B.Tech Prerequisites Checklist */}
                  <div className="bg-[#FAF9F6] border border-slate-200/50 rounded-2xl p-6 space-y-6">
                    <h3 className="text-base font-serif font-bold text-[#0c2340]">B.Tech Admission Requirements</h3>
                    <ul className="space-y-4 text-xs sm:text-sm font-sans font-semibold text-slate-650 leading-relaxed">
                      <li className="flex gap-3">
                        <Check className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>**Eligibility**: Class 12 or equivalent qualification with Physics, Chemistry, and Mathematics (PCM) as core compulsory subjects.</span>
                      </li>
                      <li className="flex gap-3">
                        <Check className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>**Exams Accepted**: West Bengal Joint Entrance Examination (**WBJEE**), **JEE Main**, or **IEMJEE** (Institute Entrance Exam).</span>
                      </li>
                      <li className="flex gap-3">
                        <Check className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>**Minimum Marks**: Minimum **45% aggregate** in PCM (40% for SC/ST category) from a recognized state board.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Other programs lists */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-[#FAF9F6] p-4 rounded-xl border border-slate-200/50">
                      <span className="block text-[9px] font-sans font-extrabold text-[#c5a880] uppercase tracking-widest">MBA stream</span>
                      <span className="block text-xs font-semibold text-slate-650 leading-normal mt-2">Graduation with 50% marks + CAT, MAT, or JEMAT.</span>
                    </div>
                    <div className="bg-[#FAF9F6] p-4 rounded-xl border border-slate-200/50">
                      <span className="block text-[9px] font-sans font-extrabold text-[#c5a880] uppercase tracking-widest">MCA stream</span>
                      <span className="block text-xs font-semibold text-slate-650 leading-normal mt-2">BCA/B.Sc with Mathematics + JECA counseling rank.</span>
                    </div>
                    <div className="bg-[#FAF9F6] p-4 rounded-xl border border-slate-200/50">
                      <span className="block text-[9px] font-sans font-extrabold text-[#c5a880] uppercase tracking-widest">M.Tech stream</span>
                      <span className="block text-xs font-semibold text-slate-650 leading-normal mt-2">B.Tech/BE in matching stream with 55% marks + GATE preference.</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: ADMISSION PROCESS */}
            <section id="admission-process" ref={sectionsRef["admission-process"]} className="scroll-mt-28 bg-white py-4 border-b border-slate-100 pb-12">
              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-4">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0c2340] border-l-4 border-[#c5a880] pl-4 tracking-tight leading-tight">
                    Admissions Flow
                  </h2>
                </div>

                <div className="md:col-span-8">
                  {/* Vertical Timeline */}
                  <div className="relative border-l border-slate-200 ml-4 pl-8 space-y-8 py-2">
                    <div className="relative">
                      <span className="absolute -left-[40px] top-0 h-5 w-5 rounded-full bg-[#0c2340] text-white flex items-center justify-center text-[9px] font-sans font-extrabold shadow shadow-[#0c2340]/25">1</span>
                      <div className="space-y-1">
                        <h4 className="text-sm font-sans font-extrabold text-slate-900 uppercase tracking-wider">Step 1: Digital Registration</h4>
                        <p className="text-slate-500 text-xs leading-relaxed font-sans font-semibold">
                          Visit the official IEM/UEM online portal (or WBJEE board counseling site) and register. Fill out primary demographics, contact numbers, and basic qualifications.
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-[40px] top-0 h-5 w-5 rounded-full bg-[#0c2340] text-white flex items-center justify-center text-[9px] font-sans font-extrabold shadow shadow-[#0c2340]/25">2</span>
                      <div className="space-y-1">
                        <h4 className="text-sm font-sans font-extrabold text-slate-900 uppercase tracking-wider">Step 2: Choice Options Selection</h4>
                        <p className="text-slate-500 text-xs leading-relaxed font-sans font-semibold">
                          Select B.Tech or preferred stream options, making sure to rank IEM Kolkata at the top of your choice-filling priority during online counseling setups.
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-[40px] top-0 h-5 w-5 rounded-full bg-[#0c2340] text-white flex items-center justify-center text-[9px] font-sans font-extrabold shadow shadow-[#0c2340]/25">3</span>
                      <div className="space-y-1">
                        <h4 className="text-sm font-sans font-extrabold text-slate-900 uppercase tracking-wider">Step 3: Document Upload & Fees Deposit</h4>
                        <p className="text-slate-500 text-xs leading-relaxed font-sans font-semibold">
                          Upload verified academic credentials (10th/12th marksheets, Entrance admit card, Caste indices if relevant) and pay the initial seat processing / semesters fees.
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-[40px] top-0 h-5 w-5 rounded-full bg-[#0c2340] text-white flex items-center justify-center text-[9px] font-sans font-extrabold shadow shadow-[#0c2340]/25">4</span>
                      <div className="space-y-1">
                        <h4 className="text-sm font-sans font-extrabold text-slate-900 uppercase tracking-wider">Step 4: Verification & Admission Confirmation</h4>
                        <p className="text-slate-500 text-xs leading-relaxed font-sans font-semibold">
                          Complete final physical verification of original documents at the Salt Lake Sector V campus, collect your registration index, and lock your seat.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: PLACEMENT */}
            <section id="placements" ref={sectionsRef["placements"]} className="scroll-mt-28 bg-[#091b33] text-white rounded-[2rem] p-8 md:p-12 border border-white/5 shadow-xl space-y-10">
              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-4 space-y-4">
                  <span className="text-[10px] font-sans font-extrabold text-[#c5a880] uppercase tracking-widest block">SUCCESS RECORD</span>
                  <h2 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
                    Placements & Career Opportunities
                  </h2>
                  <p className="text-slate-350 text-xs md:text-sm font-sans leading-relaxed font-semibold">
                    IEM Kolkata holds an exceptional placement record in West Bengal, placing students in top-tier multinational corporations.
                  </p>
                </div>

                <div className="md:col-span-8 space-y-8">
                  {/* Large placement highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                      <span className="block text-[8px] font-sans font-extrabold text-slate-400 uppercase tracking-widest">STUDENTS PLACED</span>
                      <span className="block text-3xl font-serif font-bold text-white mt-2">1,054+</span>
                      <span className="block text-slate-400 text-[10px] font-semibold mt-1">B.Tech and PG Branches</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                      <span className="block text-[8px] font-sans font-extrabold text-[#c5a880] uppercase tracking-widest">HIGHEST PACKAGE</span>
                      <span className="block text-3xl font-serif font-bold text-amber-400 mt-2">₹40 LPA</span>
                      <span className="block text-slate-400 text-[10px] font-semibold mt-1">Product MNC Recruitment</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                      <span className="block text-[8px] font-sans font-extrabold text-slate-400 uppercase tracking-widest">MEDIAN PACKAGE</span>
                      <span className="block text-3xl font-serif font-bold text-white mt-2">₹6 LPA</span>
                      <span className="block text-slate-400 text-[10px] font-semibold mt-1">West Bengal Private Sector Peak</span>
                    </div>
                  </div>

                  {/* Recruiter Logos Grid */}
                  <div className="space-y-4">
                    <h4 className="text-[9px] font-sans font-bold text-slate-400 uppercase tracking-widest text-center">Top Hiring Partners</h4>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-3 justify-items-center">
                      {recruiters.map((rec, i) => (
                        <div
                          key={i}
                          className="w-full h-11 bg-white rounded-xl flex items-center justify-center p-2 shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
                        >
                          <img
                            src={rec.logo}
                            alt={`${rec.name} Logo`}
                            className="h-6 max-w-full object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Placement insights text */}
                  <p className="text-slate-300 text-xs font-semibold leading-relaxed font-sans">
                    🏆 **Placement Insights**: Over 100+ recruiters participate in annual hiring drives. In the B.Tech CSE department alone, high-density placement ratios were maintained. Pre-placement coding bootcamps and mock interview drills conducted by the training cell support excellent returns on academic investment.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 9: FACILITIES */}
            <section id="facilities" ref={sectionsRef["facilities"]} className="scroll-mt-28 bg-white py-4 border-b border-slate-100 pb-12">
              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-4">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0c2340] border-l-4 border-[#c5a880] pl-4 tracking-tight leading-tight">
                    Campus Facilities
                  </h2>
                </div>

                <div className="md:col-span-8">
                  {/* Clean 3x2 grid of modern facilities */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                      { title: "Central Library", desc: "Spacious academic library containing over 50,000+ reference volumes, international journals, and research index gateways.", icon: Library },
                      { title: "Boys & Girls Hostels", desc: "Highly secure, fully operational clean hostels separate for boys and girls with modern mess facilities.", icon: Building },
                      { title: "Wi-Fi Campus", desc: "High-speed optical fiber wireless network access across classrooms, labs, offices, and central common lawns.", icon: Wifi },
                      { title: "Modern Labs", desc: "High-end compute machines, electronics oscilloscopes, electrical machines, and structural fabrication workshops.", icon: Zap },
                      { title: "Sports Complex", desc: "Physical fitness training grids with outdoor fields, indoor table grids, and gymnasiums.", icon: Dribbble },
                      { title: "Medical Facilities", desc: "First-aid response rooms, active counselor panels, and 24/7 dedicated tie-ups with leading superspecialty hospitals.", icon: HeartPulse }
                    ].map((fac, idx) => {
                      const IconComp = fac.icon;
                      return (
                        <div key={idx} className="bg-[#FAF9F6] border border-slate-200/50 p-5 rounded-2xl hover:shadow-md transition-all duration-300 space-y-3 group">
                          <div className="h-10 w-10 rounded-full bg-[#0c2340]/5 flex items-center justify-center shrink-0 text-[#0c2340] group-hover:bg-[#0c2340] group-hover:text-white transition-colors duration-300">
                            <IconComp className="h-5 w-5" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-xs font-serif font-bold text-[#0c2340] leading-snug">{fac.title}</h4>
                            <p className="text-slate-500 text-[10px] font-semibold leading-relaxed font-sans">{fac.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: FAQs */}
            <section id="faqs" ref={sectionsRef["faqs"]} className="scroll-mt-28 bg-white py-4 border-b border-slate-100 pb-12">
              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-4">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0c2340] border-l-4 border-[#c5a880] pl-4 tracking-tight leading-tight">
                    Frequently Asked Questions
                  </h2>
                </div>

                <div className="md:col-span-8">
                  <div className="space-y-3">
                    {faqItems.map((faq, idx) => {
                      const isOpen = activeFAQ === idx;
                      return (
                        <div
                          key={idx}
                          className="bg-[#FAF9F6] rounded-xl border border-slate-100 overflow-hidden transition-all shadow-sm"
                        >
                          <button
                            onClick={() => toggleFAQ(idx)}
                            className="w-full text-left p-4.5 flex justify-between items-center gap-4 text-xs font-serif font-bold text-[#0c2340] hover:bg-slate-100/50 transition-colors"
                          >
                            <span>{faq.q}</span>
                            {isOpen ? <ChevronUp className="h-4.5 w-4.5 text-[#c5a880] shrink-0" /> : <ChevronDown className="h-4.5 w-4.5 text-slate-400 shrink-0" />}
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden border-t border-slate-100 bg-white"
                              >
                                <p className="p-4.5 text-xs text-slate-650 leading-relaxed font-sans font-semibold text-[#0c2340]">
                                  {faq.a}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: CONTACT & INQUIRY */}
            <section id="contact" ref={sectionsRef["contact"]} className="scroll-mt-28 bg-[#FAF9F6] py-12 border-t border-slate-150 rounded-3xl">
              <div className="max-w-4xl mx-auto space-y-12 px-6">
                {/* Yellow-Gold Contact Card (inspired by the reference page) */}
                <div className="bg-amber-400/80 rounded-3xl p-8 border border-amber-500 shadow-md flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="space-y-2 text-center md:text-left">
                    <h3 className="text-lg md:text-xl font-serif font-black text-[#0c2340]">Need Help with IEM Kolkata Information?</h3>
                    <p className="text-xs text-slate-800 font-sans font-semibold leading-relaxed max-w-xl">
                      Talk to our expert counselors at SS Education to guide your registration, choosing branches, and complete seat locking.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                    <a
                      href="tel:+919933085333"
                      className="flex h-11 bg-[#0c2340] hover:bg-[#0c2340]/90 text-white font-sans font-bold text-xs uppercase tracking-widest px-6 rounded-xl transition-all shadow-md items-center justify-center gap-2"
                    >
                      <Phone className="h-4 w-4" /> Call advisor
                    </a>
                    <a
                      href="https://wa.me/919933085333"
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-11 bg-white hover:bg-slate-50 text-slate-900 font-sans font-bold text-xs uppercase tracking-widest px-6 rounded-xl transition-all shadow-md items-center justify-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4 text-emerald-600" /> WhatsApp
                    </a>
                  </div>
                </div>

                {/* Lead counseling form (elegant, quiet, bottom-placed) */}
                <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-sm">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 ring-6 ring-emerald-50/50">
                        <Check className="h-6 w-6 text-emerald-600" />
                      </div>
                      <h3 className="text-base font-serif font-bold text-slate-900">Request Profile Submitted!</h3>
                      <p className="mt-2 text-slate-500 font-sans text-xs font-semibold leading-relaxed">
                        Thank you. Our senior counselor from SS Education will call you within 24 hours to assist with your IEM Kolkata admission process.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      <div className="pb-3 border-b border-slate-100">
                        <h3 className="text-sm font-sans font-black uppercase tracking-widest text-[#0c2340]">Advisor Request Profile</h3>
                        <p className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest mt-0.5">Talk to SS Education Counselor</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="iem-lead-name" className="text-[10px] font-sans font-bold uppercase tracking-widest text-slate-400 mb-1.5 block">Full Name *</Label>
                          <Input
                            id="iem-lead-name"
                            placeholder="E.g. Akash Roy"
                            className="h-11 rounded-xl bg-slate-50 border-slate-200/50 font-medium focus:bg-white text-xs text-slate-800 transition-all font-sans"
                            value={formData.name || ""}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                          />
                          {errors.name && <p className="text-[9px] font-sans font-bold text-rose-500 mt-1">{errors.name}</p>}
                        </div>

                        <div>
                          <Label htmlFor="iem-lead-phone" className="text-[10px] font-sans font-bold uppercase tracking-widest text-slate-400 mb-1.5 block">Phone Number *</Label>
                          <Input
                            id="iem-lead-phone"
                            type="tel"
                            maxLength={10}
                            placeholder="10-digit number"
                            className="h-11 rounded-xl bg-slate-50 border-slate-200/50 font-medium focus:bg-white text-xs text-slate-800 transition-all font-sans"
                            value={formData.phone || ""}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                          />
                          {errors.phone && <p className="text-[9px] font-sans font-bold text-rose-500 mt-1">{errors.phone}</p>}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <Label htmlFor="iem-lead-email" className="text-[10px] font-sans font-bold uppercase tracking-widest text-slate-400 mb-1.5 block">Email (Optional)</Label>
                          <Input
                            id="iem-lead-email"
                            type="email"
                            placeholder="name@example.com"
                            className="h-11 rounded-xl bg-slate-50 border-slate-200/50 font-medium focus:bg-white text-xs text-slate-800 transition-all font-sans"
                            value={formData.email || ""}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                          />
                        </div>

                        <div>
                          <Label className="text-[10px] font-sans font-bold uppercase tracking-widest text-slate-400 mb-1.5 block">Domicile State *</Label>
                          <Select
                            onValueChange={(val) => handleInputChange("state", val)}
                            value={formData.state || ""}
                          >
                            <SelectTrigger className="h-11 rounded-xl bg-slate-55 bg-slate-50 border-slate-200/50 text-xs text-slate-800 font-sans">
                              <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl font-sans">
                              <SelectItem value="West Bengal">West Bengal</SelectItem>
                              <SelectItem value="Bihar">Bihar</SelectItem>
                              <SelectItem value="Jharkhand">Jharkhand</SelectItem>
                              <SelectItem value="Odisha">Odisha</SelectItem>
                              <SelectItem value="Tripura">Tripura</SelectItem>
                              <SelectItem value="Assam">Assam</SelectItem>
                              <SelectItem value="Other">Other State</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.state && <p className="text-[9px] font-sans font-bold text-rose-500 mt-1">{errors.state}</p>}
                        </div>

                        <div>
                          <Label className="text-[10px] font-sans font-bold uppercase tracking-widest text-slate-400 mb-1.5 block">Preferred Course *</Label>
                          <Select
                            onValueChange={(val) => handleInputChange("course", val)}
                            value={formData.course || ""}
                          >
                            <SelectTrigger className="h-11 rounded-xl bg-slate-55 bg-slate-50 border-slate-200/50 text-xs text-slate-800 font-sans">
                              <SelectValue placeholder="Select Course" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl font-sans">
                              <SelectItem value="BTech CSE">B.Tech - CSE</SelectItem>
                              <SelectItem value="BTech CSE Specialisations">B.Tech - CSE Specialisations</SelectItem>
                              <SelectItem value="BTech IT/ECE/EE">B.Tech - IT/ECE/EE</SelectItem>
                              <SelectItem value="BCA">BCA</SelectItem>
                              <SelectItem value="BBA">BBA</SelectItem>
                              <SelectItem value="MBA">MBA</SelectItem>
                              <SelectItem value="MCA">MCA</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.course && <p className="text-[9px] font-sans font-bold text-rose-500 mt-1">{errors.course}</p>}
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 bg-[#0c2340] hover:bg-[#0c2340]/90 text-white font-sans font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow shadow-[#0c2340]/10 flex items-center justify-center gap-1.5 active:scale-95"
                        disabled={submitting}
                      >
                        {submitting ? "Processing..." : "Submit Inquiry to SS Education"}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </section>

          </div>

        </div>
      </div>

      {/* RELATED ARTICLES CAROUSEL SECTION */}
      <section className="bg-[#FAF9F6] py-20 border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-7xl space-y-10">

          <div className="space-y-1.5">
            <span className="text-[#0c2340] font-sans font-black uppercase tracking-widest text-[10px] block">Related Guides</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
              Related Articles & Admission Guides
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {relatedArticles.map((art, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-slate-150 hover:border-amber-500/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <h4 className="text-sm font-serif font-bold text-slate-950 leading-snug">{art.title}</h4>
                  <p className="text-[11px] text-slate-500 font-sans font-semibold leading-relaxed">{art.desc}</p>
                </div>
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-1 text-[9px] font-sans font-extrabold text-[#0c2340] uppercase tracking-wider hover:underline text-left mt-6"
                >
                  Explore Guide ➔
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
