import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Building2, 
  MapPin, 
  Trophy, 
  IndianRupee, 
  TrendingUp, 
  Award, 
  Sparkles, 
  BookOpen, 
  Phone, 
  MessageCircle,
  HelpCircle,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRightLeft
} from "lucide-react";

// Detailed Comparative Data
const ENGINEERING_COLLEGES = [
  {
    name: "RV College of Engineering (RVCE)",
    short: "RVCE Bangalore",
    location: "Bangalore, Karnataka",
    nirfRank: "Top 50 in India",
    nirfScore: 50,
    highestPkg: "₹1.15 Crore",
    highestVal: 115,
    avgPkg: "₹15.24 LPA",
    avgVal: 15.24,
    fees: "₹6 – ₹8 Lakhs (Total COMEDK fee)",
    feeVal: 7, // avg total COMEDK fee
    exams: "COMEDK, KCET, Direct Quota",
    eligibility: "50% in 10+2 with PCM (45% for SC/ST)",
    recruiters: "Google, Microsoft, Amazon, Cisco, Intel",
    highlights: "No.1 Placement Record in Bangalore. Incredible tech hub exposure."
  },
  {
    name: "SRM Institute of Science and Technology",
    short: "SRM Chennai (KTR)",
    location: "Chennai, Tamil Nadu",
    nirfRank: "Top 30 in India",
    nirfScore: 30,
    highestPkg: "₹1.10 Crore",
    highestVal: 110,
    avgPkg: "₹8.50 LPA",
    avgVal: 8.50,
    fees: "₹2.50 – ₹4.50 Lakhs (per annum)",
    feeVal: 14, // avg total B.Tech fee (3.5 * 4)
    exams: "SRMJEEE, Direct Pathway",
    eligibility: "Min 60% aggregate in Physics, Chemistry, & Math (PCM) in 10+2. Age: Min 16 yrs & 6 months by July 31, 2026.",
    recruiters: "Microsoft, Amazon, TCS, Cognizant, Wipro",
    highlights: "Flagship 250+ acre KTR campus. Ultra-modern research labs."
  },
  {
    name: "KIIT University",
    short: "KIIT Bhubaneswar",
    location: "Bhubaneswar, Odisha",
    nirfRank: "NIRF Rank 36",
    nirfScore: 36,
    highestPkg: "₹53.00 LPA",
    highestVal: 53,
    avgPkg: "₹8.20 LPA",
    avgVal: 8.20,
    fees: "₹3.50 – ₹4.00 Lakhs (per annum)",
    feeVal: 15, // avg total fee (3.75 * 4)
    exams: "KIITEE, JEE Main",
    eligibility: "60% aggregate in PCM in 10+2",
    recruiters: "HighRadius, Accenture, Wipro, Infosys, Deloitte",
    highlights: "100% placement record. Lush green state-of-the-art campus infrastructure."
  },
  {
    name: "MS Ramaiah Institute (MSRIT)",
    short: "Ramaiah Bangalore",
    location: "Bangalore, Karnataka",
    nirfRank: "Top 60 in India",
    nirfScore: 60,
    highestPkg: "₹50.00 LPA",
    highestVal: 50,
    avgPkg: "₹7.66 LPA",
    avgVal: 7.66,
    fees: "₹7.00 – ₹10.00 Lakhs (Total course COMEDK fee)",
    feeVal: 8.5, // avg total COMEDK fee
    exams: "COMEDK, KCET, Direct Quota",
    eligibility: "45% in 10+2 with PCM (40% for SC/ST)",
    recruiters: "Infosys, Wipro, Bosch, Samsung, Adobe",
    highlights: "60+ years of prestigious engineering legacy in Bangalore."
  },
  {
    name: "IEM Kolkata",
    short: "IEM Kolkata",
    location: "Kolkata, West Bengal",
    nirfRank: "Top Private WB",
    nirfScore: 100, // lower priority relative score
    highestPkg: "₹42.00 LPA",
    highestVal: 42,
    avgPkg: "₹6.50 LPA",
    avgVal: 6.50,
    fees: "₹5.00 – ₹7.00 Lakhs (Total course fee)",
    feeVal: 6, // total B.Tech fee
    exams: "WBJEE, JEE Main, Direct Quota",
    eligibility: "45% aggregate in 10+2 with PCM",
    recruiters: "TCS, Cognizant, Infosys, Wipro, Capgemini",
    highlights: "Highly affordable top private college closest to Bihar/Jharkhand."
  }
];

const MEDICAL_COLLEGES = [
  {
    name: "KIMS Bhubaneswar",
    short: "KIMS Medical",
    location: "Bhubaneswar, Odisha",
    type: "Deemed University",
    clinicalBedCount: "1,500+ Beds (High patient flow)",
    bedVal: 1500,
    fees: "₹18.50 Lakhs (per annum)",
    feeVal: 18.5,
    exams: "NEET UG Qualified",
    eligibility: "50% marks in PCB in 10+2, NEET UG qualified score.",
    highlights: "Super-specialty teaching hospital. Excellent infrastructure & patient inflow."
  },
  {
    name: "MS Ramaiah Medical College",
    short: "MSRMC Bangalore",
    location: "Bangalore, Karnataka",
    type: "Private Medical College",
    clinicalBedCount: "1,000+ Beds",
    bedVal: 1000,
    fees: "₹22.00 Lakhs (per annum)",
    feeVal: 22.0,
    exams: "NEET UG Qualified",
    eligibility: "NEET UG qualified score, min 50% in PCB (Physics, Chemistry, Biology).",
    highlights: "Premier ranking, situated in core Bangalore. Highly experienced faculty."
  },
  {
    name: "Kempegowda Inst. of Medical Sciences",
    short: "KIMS Bangalore",
    location: "Bangalore, Karnataka",
    type: "Private Medical College",
    clinicalBedCount: "1,200+ Beds",
    bedVal: 1200,
    fees: "₹20.15 Lakhs (per annum)",
    feeVal: 20.15,
    exams: "NEET UG Qualified",
    eligibility: "NEET UG qualified score, min 50% PCB in board exams.",
    highlights: "Highly trusted, established in 1980. Massive clinical exposure."
  }
];

const Results = () => {
  const [activeTab, setActiveTab] = useState<"engineering" | "medical">("engineering");
  
  // Interactive Selector matchups states
  const [engColA, setEngColA] = useState<number>(0); // RVCE default
  const [engColB, setEngColB] = useState<number>(2); // KIIT default
  
  const [medColA, setMedColA] = useState<number>(0); // KIMS default
  const [medColB, setMedColB] = useState<number>(1); // MSRMC default

  // Get active items
  const colA = activeTab === "engineering" ? ENGINEERING_COLLEGES[engColA] : MEDICAL_COLLEGES[medColA];
  const colB = activeTab === "engineering" ? ENGINEERING_COLLEGES[engColB] : MEDICAL_COLLEGES[medColB];

  // Helper values for matchups
  const comparisonRows = activeTab === "engineering" 
    ? [
        {
          title: "NIRF Rank & Standing",
          valueA: colA.nirfRank,
          valueB: colB.nirfRank,
          highlightA: (colA as any).nirfScore < (colB as any).nirfScore,
          highlightB: (colB as any).nirfScore < (colA as any).nirfScore,
        },
        {
          title: "Average Placement Package",
          valueA: (colA as any).avgPkg,
          valueB: (colB as any).avgPkg,
          highlightA: (colA as any).avgVal > (colB as any).avgVal,
          highlightB: (colB as any).avgVal > (colA as any).avgVal,
        },
        {
          title: "Highest Placement Package",
          valueA: (colA as any).highestPkg,
          valueB: (colB as any).highestPkg,
          highlightA: (colA as any).highestVal > (colB as any).highestVal,
          highlightB: (colB as any).highestVal > (colA as any).highestVal,
        },
        {
          title: "Tuition Fees Structure",
          valueA: colA.fees,
          valueB: colB.fees,
          highlightA: (colA as any).feeVal < (colB as any).feeVal,
          highlightB: (colB as any).feeVal < (colA as any).feeVal, // Lower total fee is highlighted
        },
        {
          title: "Academic Eligibility Rules",
          valueA: colA.eligibility,
          valueB: colB.eligibility,
          highlightA: false,
          highlightB: false,
        },
        {
          title: "Required Entrance Exams",
          valueA: colA.exams,
          valueB: colB.exams,
          highlightA: false,
          highlightB: false,
        },
        {
          title: "Location & Campus",
          valueA: colA.location,
          valueB: colB.location,
          highlightA: false,
          highlightB: false,
        },
        {
          title: "Consultant Key Highlights",
          valueA: colA.highlights,
          valueB: colB.highlights,
          highlightA: false,
          highlightB: false,
        }
      ]
    : [
        {
          title: "Hospital Bed Count (Clinical Exposure)",
          valueA: (colA as any).clinicalBedCount,
          valueB: (colB as any).clinicalBedCount,
          highlightA: (colA as any).bedVal > (colB as any).bedVal,
          highlightB: (colB as any).bedVal > (colA as any).bedVal,
        },
        {
          title: "Annual Tuition Fee Structure",
          valueA: colA.fees,
          valueB: colB.fees,
          highlightA: (colA as any).feeVal < (colB as any).feeVal,
          highlightB: (colB as any).feeVal < (colA as any).feeVal,
        },
        {
          title: "College Type & Category",
          valueA: (colA as any).type,
          valueB: (colB as any).type,
          highlightA: false,
          highlightB: false,
        },
        {
          title: "Location & Medical Hub",
          valueA: colA.location,
          valueB: colB.location,
          highlightA: false,
          highlightB: false,
        },
        {
          title: "Required Score / Pathways",
          valueA: colA.exams,
          valueB: colB.exams,
          highlightA: false,
          highlightB: false,
        },
        {
          title: "PCB Marks Academic Eligibility",
          valueA: colA.eligibility,
          valueB: colB.eligibility,
          highlightA: false,
          highlightB: false,
        },
        {
          title: "Consultant Highlights",
          valueA: colA.highlights,
          valueB: colB.highlights,
          highlightA: false,
          highlightB: false,
        }
      ];

  return (
    <main className="pt-24 min-h-screen bg-slate-50 text-slate-800">
      {/* Hero Header */}
      <section className="relative py-20 overflow-hidden border-b border-slate-200 bg-gradient-to-b from-red-50/50 via-slate-50/20 to-slate-50">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-200 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-red-600 mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-red-500" /> 2026 Admissions Hub
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight"
          >
            Compare Top <span className="text-red-600">Colleges & Universities</span>
          </motion.h1>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Skip the guesswork. Compare authentic placement records, detailed fee structures, and strict board cutoffs side-by-side using our interactive college matching tool.
          </p>
        </div>
      </section>

      {/* Tabs Selector */}
      <section className="py-6 bg-white border-b border-slate-200 sticky top-16 z-30 backdrop-blur-md">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 flex gap-2 w-full max-w-md">
            <button
              onClick={() => setActiveTab("engineering")}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                activeTab === "engineering" 
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/20" 
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Building2 className="h-4 w-4" /> B.Tech Engineering
            </button>
            <button
              onClick={() => setActiveTab("medical")}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                activeTab === "medical" 
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/20" 
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <BookOpen className="h-4 w-4" /> MBBS Admissions
            </button>
          </div>
        </div>
      </section>

      {/* 2-COLLEGE MATCHUP COMPARATOR */}
      <section className="py-16 bg-slate-50 border-b border-slate-200 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-[3rem] border border-slate-200 p-6 md:p-12 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] relative overflow-hidden">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-200 px-4 py-1.5 rounded-full">
                <ArrowRightLeft className="h-3 w-3" /> Live Comparative Engine
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-4">Side-by-Side Dual Matchup</h2>
              <p className="text-slate-500 text-xs mt-2 max-w-md mx-auto leading-relaxed">
                Choose any two institutions below to instantly analyze average placement statistics, tuition, and board marks guidelines.
              </p>
            </div>

            {/* Dropdown Selectors Row */}
            <div className="grid md:grid-cols-2 gap-8 items-center bg-slate-50 p-6 md:p-8 rounded-[2rem] border border-slate-200/80 mb-8 relative z-10">
              {/* College A Selector */}
              <div className="flex flex-col gap-2.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 pl-1 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" /> College Selection 1
                </label>
                <div className="relative">
                  <select
                    value={activeTab === "engineering" ? engColA : medColA}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (activeTab === "engineering") setEngColA(val);
                      else setMedColA(val);
                    }}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:outline-none focus:border-red-500 appearance-none shadow-sm cursor-pointer hover:border-slate-350 transition-colors"
                  >
                    {(activeTab === "engineering" ? ENGINEERING_COLLEGES : MEDICAL_COLLEGES).map((col, idx) => (
                      <option key={idx} value={idx} className="bg-white text-slate-800 font-bold">{col.name}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 text-xs">
                    ▼
                  </div>
                </div>
              </div>

              {/* Versus Indicator */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 font-black text-xs text-red-500 shadow-md">
                VS
              </div>

              {/* College B Selector */}
              <div className="flex flex-col gap-2.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 pl-1 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" /> College Selection 2
                </label>
                <div className="relative">
                  <select
                    value={activeTab === "engineering" ? engColB : medColB}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (activeTab === "engineering") setEngColB(val);
                      else setMedColB(val);
                    }}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:outline-none focus:border-red-500 appearance-none shadow-sm cursor-pointer hover:border-slate-350 transition-colors"
                  >
                    {(activeTab === "engineering" ? ENGINEERING_COLLEGES : MEDICAL_COLLEGES).map((col, idx) => (
                      <option key={idx} value={idx} className="bg-white text-slate-800 font-bold">{col.name}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 text-xs">
                    ▼
                  </div>
                </div>
              </div>
            </div>

            {/* Matchup Results Grid */}
            <div className="space-y-4 relative z-10">
              {comparisonRows.map((row, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-[1.8rem] border border-slate-100 p-5 md:p-6 hover:border-slate-200 hover:shadow-sm transition-all duration-305"
                >
                  {/* Metric Label */}
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center mb-3">
                    {row.title}
                  </div>
                  
                  {/* Side-by-Side Values */}
                  <div className="grid md:grid-cols-2 gap-4 text-xs lg:text-sm items-stretch">
                    {/* Value A */}
                    <div 
                      className={`p-4 rounded-xl border transition-all duration-300 ${
                        row.highlightA 
                          ? "bg-red-50/40 border-red-500/20 text-slate-900 font-bold shadow-sm" 
                          : "bg-slate-50 border-slate-100 text-slate-600 font-medium"
                      }`}
                    >
                      <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5 md:hidden">
                        {colA.short}
                      </div>
                      <p className="leading-relaxed">{row.valueA}</p>
                      {row.highlightA && (
                        <span className="text-[8px] font-black text-red-600 bg-red-100 px-2 py-0.5 rounded uppercase tracking-wider mt-2 inline-block">
                          ★ Stronger placement / standings
                        </span>
                      )}
                    </div>

                    {/* Value B */}
                    <div 
                      className={`p-4 rounded-xl border transition-all duration-300 ${
                        row.highlightB 
                          ? "bg-red-50/40 border-red-500/20 text-slate-900 font-bold shadow-sm" 
                          : "bg-slate-50 border-slate-100 text-slate-600 font-medium"
                      }`}
                    >
                      <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5 md:hidden">
                        {colB.short}
                      </div>
                      <p className="leading-relaxed">{row.valueB}</p>
                      {row.highlightB && (
                        <span className="text-[8px] font-black text-red-600 bg-red-100 px-2 py-0.5 rounded uppercase tracking-wider mt-2 inline-block">
                          ★ Stronger placement / standings
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FULL DIRECTORY MATRICES SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          {activeTab === "engineering" ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="text-center max-w-xl mx-auto mb-12">
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Full Engineering (B.Tech) Matrix</h2>
                <p className="text-sm text-slate-500 mt-2 font-medium">Comprehensive side-by-side comparison of India's premier B.Tech colleges.</p>
              </div>

              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto rounded-[2rem] border border-slate-200/80 shadow-xl bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200">
                      <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">College</th>
                      <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">NIRF & Location</th>
                      <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Placements</th>
                      <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Annual Fees</th>
                      <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Eligibility & Exams</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {ENGINEERING_COLLEGES.map((college, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-6">
                          <div className="font-extrabold text-slate-900 text-base">{college.name}</div>
                          <div className="text-[10px] text-red-600 font-bold mt-1.5 bg-red-50 border border-red-200 px-2 py-0.5 rounded inline-block">
                            {college.highlights}
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex items-center gap-1.5 text-xs text-slate-700 font-bold">
                            <Trophy className="h-3.5 w-3.5 text-yellow-500" /> {college.nirfRank}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 font-medium">
                            <MapPin className="h-3.5 w-3.5" /> {college.location}
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="text-slate-600 font-bold text-sm">
                            Avg: <span className="text-slate-900 font-black">{college.avgPkg}</span>
                          </div>
                          <div className="text-slate-400 text-xs mt-1 font-semibold flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-green-600" /> Max: {college.highestPkg}
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="text-xs text-slate-600 font-medium leading-relaxed max-w-[200px]">
                            {college.fees}
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="text-xs text-slate-700 font-bold leading-normal mb-1">
                            PCM Cutoff: <span className="text-red-600">{college.eligibility}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1">
                            <Award className="h-3.5 w-3.5 text-red-500" /> {college.exams}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List View */}
              <div className="lg:hidden space-y-6">
                {ENGINEERING_COLLEGES.map((college, idx) => (
                  <div key={idx} className="bg-white border border-slate-200/80 rounded-[2rem] p-6 space-y-4 shadow-sm">
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900 leading-snug">{college.name}</h3>
                      <p className="text-xs text-red-600 font-bold mt-1 bg-red-50 border border-red-200 px-2.5 py-1 rounded-lg inline-block">
                        {college.highlights}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-xs">
                      <div>
                        <div className="text-slate-400 uppercase tracking-widest text-[9px] font-black mb-1">Rank & Location</div>
                        <div className="text-slate-700 font-bold flex items-center gap-1">
                          <Trophy className="h-3 w-3 text-yellow-500" /> {college.nirfRank}
                        </div>
                        <div className="text-slate-400 mt-0.5 font-medium">{college.location}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 uppercase tracking-widest text-[9px] font-black mb-1">Placements</div>
                        <div className="text-slate-700 font-bold">Avg: {college.avgPkg}</div>
                        <div className="text-green-600 font-bold mt-0.5">Highest: {college.highestPkg}</div>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4 text-xs space-y-2">
                      <div>
                        <div className="text-slate-400 uppercase tracking-widest text-[9px] font-black mb-0.5">Annual Fee Structure</div>
                        <p className="text-slate-600 font-medium">{college.fees}</p>
                      </div>
                      <div>
                        <div className="text-slate-400 uppercase tracking-widest text-[9px] font-black mb-0.5">Academic Eligibility</div>
                        <p className="text-red-600 font-bold leading-normal">{college.eligibility}</p>
                      </div>
                      <div>
                        <div className="text-slate-400 uppercase tracking-widest text-[9px] font-black mb-0.5">Entrance Exams</div>
                        <p className="text-slate-600 font-semibold">{college.exams}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="text-center max-w-xl mx-auto mb-12">
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Full MBBS Admissions Matrix</h2>
                <p className="text-sm text-slate-500 mt-2 font-medium">Compare verified clinical infrastructure and fee systems for medical aspirants.</p>
              </div>

              {/* Desktop Medical View */}
              <div className="hidden lg:block overflow-x-auto rounded-[2rem] border border-slate-200/80 shadow-xl bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200">
                      <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Medical College</th>
                      <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Infrastructure & Bed Count</th>
                      <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Location & Type</th>
                      <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Annual Tuition Fee</th>
                      <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Exams & Eligibility</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {MEDICAL_COLLEGES.map((college, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-6">
                          <div className="font-extrabold text-slate-900 text-base">{college.name}</div>
                          <div className="text-[10px] text-red-600 font-bold mt-1.5 bg-red-50 border border-red-200 px-2 py-0.5 rounded inline-block">
                            {college.highlights}
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="text-slate-700 font-bold text-sm">
                            {college.clinicalBedCount}
                          </div>
                          <div className="text-xs text-slate-400 mt-1 font-medium">Massive clinical flow for hands-on learning</div>
                        </td>
                        <td className="p-6">
                          <div className="text-xs text-slate-700 font-bold flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-red-500" /> {college.location}
                          </div>
                          <div className="text-xs text-slate-400 mt-1 font-medium">{college.type}</div>
                        </td>
                        <td className="p-6">
                          <div className="text-slate-700 font-bold text-sm flex items-center">
                            <IndianRupee className="h-3.5 w-3.5 text-red-500 mr-0.5" /> {college.fees}
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="text-xs text-slate-700 font-bold leading-normal mb-1">
                            PCB Marks: <span className="text-red-600">{college.eligibility}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1">
                            <Award className="h-3.5 w-3.5 text-red-500" /> {college.exams}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List View for Medical */}
              <div className="lg:hidden space-y-6">
                {MEDICAL_COLLEGES.map((college, idx) => (
                  <div key={idx} className="bg-white border border-slate-200/80 rounded-[2rem] p-6 space-y-4 shadow-sm">
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900 leading-snug">{college.name}</h3>
                      <p className="text-xs text-red-600 font-bold mt-1 bg-red-50 border border-red-200 px-2.5 py-1 rounded-lg inline-block">
                        {college.highlights}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-xs">
                      <div>
                        <div className="text-slate-400 uppercase tracking-widest text-[9px] font-black mb-1">Clinical Setup</div>
                        <div className="text-slate-700 font-bold">{college.clinicalBedCount}</div>
                        <div className="text-slate-400 mt-0.5 font-medium">High patient load</div>
                      </div>
                      <div>
                        <div className="text-slate-400 uppercase tracking-widest text-[9px] font-black mb-1">Location & Type</div>
                        <div className="text-slate-700 font-bold">{college.location}</div>
                        <div className="text-slate-400 mt-0.5 font-medium">{college.type}</div>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4 text-xs space-y-2">
                      <div>
                        <div className="text-slate-400 uppercase tracking-widest text-[9px] font-black mb-0.5">Tuition Fee Structure</div>
                        <p className="text-slate-700 font-black flex items-center">
                          <IndianRupee className="h-3.5 w-3.5 text-red-500 mr-0.5" /> {college.fees}
                        </p>
                      </div>
                      <div>
                        <div className="text-slate-400 uppercase tracking-widest text-[9px] font-black mb-0.5">Eligibility Criteria</div>
                        <p className="text-red-600 font-bold leading-normal">{college.eligibility}</p>
                      </div>
                      <div>
                        <div className="text-slate-400 uppercase tracking-widest text-[9px] font-black mb-0.5">Required Exams</div>
                        <p className="text-slate-700 font-bold">{college.exams}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Advisory Note Alert */}
      <section className="py-6 bg-white border-t border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl p-4 text-xs text-slate-500 text-left max-w-xl mx-auto leading-relaxed">
            <HelpCircle className="h-8 w-8 text-red-500 shrink-0" />
            <div>
              <span className="font-extrabold text-slate-900 block uppercase tracking-wider mb-0.5">Counselor's Advisory Note</span>
              Eligibility criteria (like SRM's Physics, Chemistry, Math 60% board cutoff or strict age limits) are heavily scrutinized by admissions registrars during counseling rounds. Avoid mistakes. Speak with us.
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Ticker/Ticker Alert CTA */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto bg-gradient-to-tr from-red-600 to-red-700 rounded-[3.5rem] p-12 lg:p-20 text-white shadow-2xl shadow-red-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <h2 className="text-3xl md:text-5xl font-black mb-6 relative z-10 tracking-tight leading-tight">Need Help Shortlisting the Best Choice?</h2>
            <p className="text-base md:text-lg text-red-100/90 mb-10 relative z-10 max-w-2xl mx-auto font-medium">
              Everyone's academic score and financial budget is different. Our seasoned consultants can audit your details and find the perfect match.
            </p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <a href="tel:+919933085333" className="px-10 py-5 bg-white text-slate-950 font-black rounded-2xl hover:scale-105 transition-all text-xs uppercase tracking-widest shadow-xl">
                Call Now: +91 99330 85333
              </a>
              <a href="https://wa.me/919933085333" className="px-10 py-5 bg-green-500 text-white font-black rounded-2xl hover:scale-105 transition-all text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl">
                <MessageCircle className="h-5 w-5" /> WhatsApp Expert
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Results;
