import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, GraduationCap, Users, BookOpen, Globe, MessageCircle, Phone, ShieldCheck, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Stats } from "@/components/landing/Stats";
import { CollegeCard } from "@/components/landing/CollegeCard";
import { LeadForm } from "@/components/landing/LeadForm";

// Sample images (I'll use placeholder-like paths or existing ones)
import kiitImg from "@/assets/rvce-campus.jpg"; // Placeholder
import rvceImg from "@/assets/rvce-building.jpg";
import ramaiahImg from "@/assets/ramaiah-campus.jpg";
import iemImg from "@/assets/iem-campus.jpg";

const FEATURED_COLLEGES = [
  {
    name: "KIIT University",
    location: "Bhubaneswar, Odisha",
    image: kiitImg,
    rating: "4.8",
    tags: ["NIRF 36", "Direct Admission"],
    href: "/rv-college-btech-admission-2026", // Existing path
  },
  {
    name: "RV College of Engineering",
    location: "Bangalore, Karnataka",
    image: rvceImg,
    rating: "4.9",
    tags: ["Top 50", "Bangalore Hub"],
    href: "/rv-college-btech-admission-2026",
  },
  {
    name: "MS Ramaiah Institute",
    location: "Bangalore, Karnataka",
    image: ramaiahImg,
    rating: "4.7",
    tags: ["60+ Yrs Legacy", "Premium"],
    href: "/ramaiah-institute-btech-admission-2026",
  },
  {
    name: "IEM Kolkata",
    location: "Kolkata, WB",
    image: iemImg,
    rating: "4.6",
    tags: ["Affordable", "Best Placements"],
    href: "/iem-kolkata-btech-admission-2026",
  },
];

const COURSES = [
  { title: "Engineering (B.Tech)", icon: GraduationCap, color: "bg-red-600", desc: "Top B.Tech colleges direct admission support." },
  { title: "MBA & Management", icon: BookOpen, color: "bg-blue-600", desc: "Premium MBA/PGDM colleges with placements." },
  { title: "Medical (MBBS)", icon: Users, color: "bg-slate-900", desc: "NMC approved medical colleges admission guidance." },
  { title: "Law & BCA/MCA", icon: Globe, color: "bg-indigo-600", desc: "Specialized guidance for law and computer applications." },
];

const Home = () => {
  return (
    <main className="overflow-hidden">
      {/* Hero Section - Single Section Landing */}
      <section className="relative min-h-screen flex flex-col pt-40 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://directcollegeadmissions.com/wp-content/uploads/2025/11/1-scaled.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        </div>

        {/* Content Area - Centered in Viewport */}
        <div className="flex-grow flex items-center relative z-10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-6 tracking-tight">
                Get Expert Guidance for Your <br />
                <span className="underline decoration-red-600 underline-offset-8 decoration-4">College Admission</span> Journey
              </h1>
              <p className="text-base lg:text-lg text-white/80 mb-8 leading-relaxed font-normal max-w-xl">
                Get personalised admission guidance, direct application assistance, and complete support to help you join the college that fits your goals simple, transparent, and stress-free.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-red-600 text-white font-bold rounded-lg shadow-xl uppercase text-xs tracking-widest transition-all"
              >
                Enquire Now
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Feature Cards - Smaller & More Spaced */}
        <div className="relative z-10 mt-auto">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 items-end max-w-5xl mx-auto">
              {/* Skilled Counsellors - Deep Blue */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-[#0B1221]/95 backdrop-blur-sm p-8 rounded-t-2xl text-white flex flex-col gap-4 group hover:bg-[#0f172a] transition-all min-h-[200px] justify-center shadow-2xl"
              >
                <div className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="text-lg font-bold mb-2">Skilled Counsellors</h3>
                    <p className="text-white/60 text-xs leading-relaxed">
                      Expert consultants helping you choose the right college based on your strengths and career goals.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Scholarship Guidance - Blue */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-[#0066B2]/95 backdrop-blur-sm p-8 rounded-t-2xl text-white flex flex-col gap-4 group hover:bg-[#0077cf] transition-all min-h-[240px] justify-center shadow-2xl"
              >
                <div className="flex items-start gap-3">
                  <BookOpen className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="text-lg font-bold mb-2">Scholarship Guidance</h3>
                    <p className="text-white/70 text-xs leading-relaxed">
                      Guidance on available scholarships and application processes to reduce your education costs.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Top Student Success Rate - Red (Tallest) */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-red-600 p-8 rounded-t-2xl text-white flex flex-col gap-6 relative overflow-hidden min-h-[280px] justify-center shadow-2xl md:rounded-tl-[3rem]"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="h-7 w-7 rounded-full border-2 border-red-600 bg-white/10" />
                    ))}
                    <div className="h-7 w-7 rounded-full bg-blue-500 flex items-center justify-center text-[8px] font-bold border-2 border-red-600">12K+</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                  <div>
                    <h3 className="text-lg font-bold mb-2 leading-tight">Student Success Rate</h3>
                    <p className="text-white/90 text-xs leading-relaxed">
                      More than <span className="font-bold">12,000+ students</span> successfully secured admissions.
                    </p>
                  </div>
                </div>

                {/* WhatsApp Widget */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white text-slate-900 px-3 py-1.5 rounded-lg shadow-xl cursor-pointer hover:scale-105 transition-transform group">
                  <div className="text-[8px] font-bold uppercase tracking-wider whitespace-nowrap text-red-600">Chat</div>
                  <div className="h-7 w-7 bg-green-500 rounded-full flex items-center justify-center text-white">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Professional Split Layout */}
      <section className="py-24 bg-white relative z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-red-600 font-bold uppercase tracking-[0.2em] text-xs">About</span>
                <div className="h-[2px] w-12 bg-red-600" />
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-8">
                Welcome to <span className="text-red-600">SS Education</span>, <br />
                Your Trusted Partner for a Clear & Guided Admission Journey
              </h2>
              
              <div className="space-y-6 text-slate-600 leading-relaxed text-sm lg:text-base">
                <p>
                  Choosing the right college can feel overwhelming that's why we're here. At <span className="font-bold text-slate-900">SS Education</span>, we simplify the entire process by offering personalised counselling, direct application support, and transparent guidance for students across India.
                </p>
                <p>
                  With experienced counselors and a student-first approach, we ensure every student gets the right information, genuine advice, and complete support from shortlisting colleges to completing applications.
                </p>
              </div>

              <div className="mt-10 flex items-center gap-8 border-t border-slate-100 pt-8">
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Established with Expertise</p>
                  <p className="text-4xl font-bold text-blue-600">2015</p>
                </div>
                <button className="px-8 py-4 bg-red-600 text-white font-bold rounded shadow-lg uppercase text-xs tracking-widest hover:bg-red-700 transition-colors">
                  Learn More
                </button>
              </div>
            </motion.div>

            {/* Right Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:w-1/2 w-full border border-slate-100 rounded-lg overflow-hidden shadow-2xl bg-white"
            >
              {/* Stat 1 */}
              <div className="p-10 border-l-4 border-red-600 flex items-center gap-8 border-b border-slate-50 group hover:bg-slate-50/50 transition-colors">
                <div className="min-w-[120px]">
                  <motion.p 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
                    className="text-4xl font-bold text-red-600 mb-1"
                  >
                    98%
                  </motion.p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase leading-tight">Student Satisfaction Rate</p>
                </div>
                <div className="text-slate-500 text-xs leading-relaxed overflow-hidden">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    {"Students appreciate our honest guidance, transparent process, and personalised support throughout their journey.".split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, filter: "blur(4px)" }}
                        whileInView={{ opacity: 1, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.5 + (i * 0.05) }}
                        className="inline-block mr-1"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.span>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="p-10 border-l-4 border-blue-500 flex items-center gap-8 bg-[#F3F7FB] border-b border-slate-50 group hover:bg-[#ebf2f8] transition-colors">
                <div className="min-w-[120px]">
                  <motion.p 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
                    className="text-4xl font-bold text-[#0066B2] mb-1"
                  >
                    12K+
                  </motion.p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase leading-tight">Students Guided Across India</p>
                </div>
                <div className="text-slate-500 text-xs leading-relaxed overflow-hidden">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.7 }}
                  >
                    {"We have helped thousands of students explore the right colleges and courses for their future success.".split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, filter: "blur(4px)" }}
                        whileInView={{ opacity: 1, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.7 + (i * 0.05) }}
                        className="inline-block mr-1"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.span>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="p-10 border-l-4 border-blue-700 flex items-center gap-8 bg-[#F3F7FB] group hover:bg-[#ebf2f8] transition-colors">
                <div className="min-w-[120px]">
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.7 }}
                    className="flex items-center gap-2 mb-1"
                  >
                    <p className="text-4xl font-bold text-[#0B1221]">10</p>
                    <span className="text-2xl font-bold text-[#0B1221]">Years +</span>
                  </motion.div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase leading-tight">Experience in Admission Guidance</p>
                </div>
                <div className="text-slate-500 text-xs leading-relaxed overflow-hidden">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.9 }}
                  >
                    {"Our team brings years of expertise in counselling and supporting students with reliable, step-by-step assistance.".split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, filter: "blur(4px)" }}
                        whileInView={{ opacity: 1, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.9 + (i * 0.05) }}
                        className="inline-block mr-1"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Building Reveal Section */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full"
        >
          <img 
            src="/src/assets/buildings.png" 
            alt="SS Education Campus" 
            className="w-full h-auto block"
          />
        </motion.div>
      </section>

      {/* Trusted by Leading Colleges Section */}
      <section className="py-20 bg-[#0B1D4B] text-white relative z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between gap-12 mb-20 max-w-7xl mx-auto">
            <div className="lg:w-1/2">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                Trusted by Leading <br />
                Colleges & Universities <br />
                Across India
              </h2>
            </div>
            <div className="lg:w-5/12 text-blue-100/80 space-y-6 text-sm lg:text-base leading-relaxed">
              <p>
                At <span className="font-bold text-white">SS Education</span>, we work with a wide network of recognised and reputed colleges to help students explore the best options for their careers.
              </p>
              <p>
                Our guidance covers institutions known for quality education, strong placement support, and excellent academic environments.
              </p>
            </div>
          </div>

          {/* College Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
            {/* KIIT */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center gap-4 group cursor-pointer"
            >
              <div className="h-28 w-28 bg-white/5 rounded-full flex flex-col items-center justify-center backdrop-blur-md border border-white/10 group-hover:bg-white/10 group-hover:border-white/30 group-hover:scale-110 transition-all duration-500 shadow-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-2xl font-black tracking-tighter text-white/40 group-hover:text-white transition-all duration-500 drop-shadow-lg">KIIT</span>
                <div className="w-8 h-[2px] bg-red-600/40 group-hover:bg-red-600 transition-colors mt-1" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 group-hover:text-white transition-colors duration-500">KIIT University</p>
            </motion.div>

            {/* RVCE */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center gap-4 group cursor-pointer"
            >
              <div className="h-28 w-28 bg-white/5 rounded-full flex flex-col items-center justify-center backdrop-blur-md border border-white/10 group-hover:bg-white/10 group-hover:border-white/30 group-hover:scale-110 transition-all duration-500 shadow-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-2xl font-black tracking-tighter text-white/40 group-hover:text-white transition-all duration-500 drop-shadow-lg">RVCE</span>
                <div className="w-8 h-[2px] bg-red-600/40 group-hover:bg-red-600 transition-colors mt-1" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 group-hover:text-white transition-colors duration-500">RV College of Engineering</p>
            </motion.div>

            {/* MS Ramaiah */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center gap-4 group cursor-pointer"
            >
              <div className="h-28 w-28 bg-white/5 rounded-full flex flex-col items-center justify-center backdrop-blur-md border border-white/10 group-hover:bg-white/10 group-hover:border-white/30 group-hover:scale-110 transition-all duration-500 shadow-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-2xl font-black tracking-tighter text-white/40 group-hover:text-white transition-all duration-500 drop-shadow-lg">MSRIT</span>
                <div className="w-8 h-[2px] bg-red-600/40 group-hover:bg-red-600 transition-colors mt-1" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 group-hover:text-white transition-colors duration-500">MS Ramaiah Institute</p>
            </motion.div>

            {/* IEM Kolkata */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center gap-4 group cursor-pointer"
            >
              <div className="h-28 w-28 bg-white/5 rounded-full flex flex-col items-center justify-center backdrop-blur-md border border-white/10 group-hover:bg-white/10 group-hover:border-white/30 group-hover:scale-110 transition-all duration-500 shadow-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-2xl font-black tracking-tighter text-white/40 group-hover:text-white transition-all duration-500 drop-shadow-lg">IEM</span>
                <div className="w-8 h-[2px] bg-red-600/40 group-hover:bg-red-600 transition-colors mt-1" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 group-hover:text-white transition-colors duration-500">IEM Kolkata</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Colleges / University Snapshot - Pushed Lower */}
      <section className="py-24 bg-slate-50 relative z-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
          >
            <div>
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Top Universities</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                Dream Colleges for <span className="text-primary">2026</span>
              </h2>
            </div>
            <Link to="/courses" className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-primary group">
              View All Colleges <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10"
          >
            {FEATURED_COLLEGES.map((college, idx) => (
              <motion.div key={idx} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <CollegeCard {...college} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-32 bg-slate-50/50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">Choose Your Path to a <span className="text-primary">Brighter Future</span></h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed italic">We offer expert counseling and direct admission support for a wide range of professional courses in India's most prestigious institutions.</p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10"
          >
            {COURSES.map((course, idx) => (
              <motion.div
                key={idx}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.08)] group transition-all duration-500"
              >
                <div className={`${course.color} h-16 w-16 rounded-[1.5rem] flex items-center justify-center text-white mb-8 shadow-xl shadow-${course.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform duration-500`}>
                  <course.icon className="h-9 w-9" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{course.title}</h3>
                <p className="text-slate-500 mb-8 leading-relaxed font-medium text-sm">{course.desc}</p>
                <Link to="/courses" className="inline-flex items-center gap-1.5 text-xs font-black text-slate-900 uppercase tracking-widest group-hover:text-primary transition-colors">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section - Corrected Layout */}
      <section className="py-24 bg-white relative z-20 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Top Row: Headline & Description */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px]">Why SS Education?</span>
                <div className="h-[2px] w-12 bg-primary/20" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
                Why We Are the Right Choice <br />
                for Your Career & Admission Journey
              </h2>
            </div>
            <div className="lg:w-5/12 text-slate-500 font-medium leading-relaxed pt-8 lg:pt-16">
              <p className="mb-6">
                Choosing the right college is a big decision and we make the process easier.
              </p>
              <p>
                At <span className="text-slate-900 font-bold">SS Education</span>, we offer personalised support, verified information, and transparent guidance to help you secure admission into top Engineering and MBA colleges across India.
              </p>
            </div>
          </div>

          {/* Bottom Row: Image & Cards Grid */}
          <div className="flex flex-col lg:flex-row gap-12 items-stretch">
            {/* Left: Graduation Image */}
            <div className="lg:w-5/12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative h-full min-h-[400px] lg:min-h-full rounded-[2.5rem] overflow-hidden shadow-2xl group"
              >
                <img 
                  src="https://directcollegeadmissions.com/wp-content/uploads/2025/11/3-4-scaled.png" 
                  alt="Students celebrating graduation" 
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Accent Box */}
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-3xl -z-10" />
              </motion.div>
            </div>

            {/* Right: 2x2 Feature Grid */}
            <div className="lg:w-7/12">
              <div className="grid md:grid-cols-2 gap-6 h-full">
                {/* Expert Admission Counselling */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 group transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-3 tracking-tight">Expert Admission <br />Counselling</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Get personalised guidance from counsellors who understand Engineering & MBA admissions, college requirements, and career pathways.
                  </p>
                </motion.div>

                {/* Genuine & Verified Information */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] group transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-3 tracking-tight">Genuine & Verified <br />Information</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    We provide accurate details about colleges, fees, specialisations, placements, eligibility, and admission procedures-no misleading promises.
                  </p>
                </motion.div>

                {/* End-to-End Application Assistance */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] group transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-3 tracking-tight">End-to-End <br />Application Assistance</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    From shortlisting colleges to preparing documents and submitting applications, we support you at every step for a smooth admission experience.
                  </p>
                </motion.div>

                {/* Wide Network of Trusted Colleges */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 group transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <Globe className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-3 tracking-tight">Wide Network of <br />Trusted Colleges</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    We help students explore top institutions across India with diverse specialisations and recognized academic programs in Engineering and MBA.
                  </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white relative z-20 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-20">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px]">Testimonial</span>
                <div className="h-[2px] w-12 bg-primary/20" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
                Stories of <br />
                <span className="text-primary">Student Achievement</span>
              </h2>
            </div>
            <div className="lg:w-5/12 text-slate-500 font-medium leading-relaxed">
              <p>
                We've helped students find the right Engineering and MBA colleges with clear guidance, verified information, and a smooth admission process. Here's what our students say about their journey with SS Education.
              </p>
            </div>
          </div>

          {/* Infinite Scroll Testimonials Track */}
          <div className="relative mt-20 overflow-hidden py-10">
            {/* Fade Gradients for edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
            
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                repeat: Infinity, 
                duration: 40, 
                ease: "linear" 
              }}
              className="flex gap-8 w-max"
            >
              {[
                {
                  name: "Kunal Mehta",
                  course: "B.Tech Aspirant",
                  text: "I had no idea how to begin my B.Tech admission. Their team supported me with documents, comparison, and application submission.",
                  img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop"
                },
                {
                  name: "Ananya Verma",
                  course: "MBA Student",
                  text: "The counselling sessions were clear and very helpful. They explained fees, placements, and specialisations in detail. I'm now pursuing my MBA.",
                  img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop"
                },
                {
                  name: "Rahul Sharma",
                  course: "Engineering Student",
                  text: "SS Education made my RVCE admission journey incredibly smooth. From selecting the branch to paperwork, they were with me at every step.",
                  img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop"
                },
                {
                  name: "Priya Das",
                  course: "Medical Aspirant",
                  text: "I was so confused about NEET counseling, but the team here explained everything so simply. I'm finally in my dream medical college!",
                  img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop"
                },
                {
                  name: "Vikram Singh",
                  course: "B.Tech Student",
                  text: "The direct admission support was a lifesaver. No hidden fees, no stress. Just genuine help when I needed it most. Highly recommended!",
                  img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&auto=format&fit=crop"
                },
                {
                  name: "Sanya Malhotra",
                  course: "MBA Aspirant",
                  text: "Best consultancy for MBA. They helped me with CAT score analysis and suggested colleges that I actually had a chance with.",
                  img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&auto=format&fit=crop"
                },
                {
                  name: "Arjun Reddy",
                  course: "Engineering Student",
                  text: "Their network of colleges is huge. I got options I hadn't even heard of, and one turned out to be the perfect fit for my budget.",
                  img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200&h=200&auto=format&fit=crop"
                },
                // Duplicate for seamless loop
                {
                  name: "Kunal Mehta",
                  course: "B.Tech Aspirant",
                  text: "I had no idea how to begin my B.Tech admission. Their team supported me with documents, comparison, and application submission.",
                  img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop"
                },
                {
                  name: "Ananya Verma",
                  course: "MBA Student",
                  text: "The counselling sessions were clear and very helpful. They explained fees, placements, and specialisations in detail. I'm now pursuing my MBA.",
                  img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop"
                },
                {
                  name: "Rahul Sharma",
                  course: "Engineering Student",
                  text: "SS Education made my RVCE admission journey incredibly smooth. From selecting the branch to paperwork, they were with me at every step.",
                  img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop"
                },
                {
                  name: "Priya Das",
                  course: "Medical Aspirant",
                  text: "I was so confused about NEET counseling, but the team here explained everything so simply. I'm finally in my dream medical college!",
                  img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop"
                }
              ].map((t, idx) => (
                <div 
                  key={idx}
                  className="w-[350px] p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex flex-col items-center text-center hover:bg-white hover:shadow-2xl hover:border-primary/10 transition-all duration-500 group"
                >
                  <div className="h-20 w-20 rounded-full overflow-hidden mb-6 border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <img src={t.img} alt={t.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex gap-1 mb-4 text-amber-400">
                    {[1,2,3,4,5].map(s => <Star key={s} className="h-3 w-3 fill-current" />)}
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-1">{t.name}</h4>
                  <p className="text-[9px] font-bold text-primary uppercase tracking-widest mb-4">{t.course}</p>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* How to Apply Section */}
      <section className="py-32 bg-slate-50/30 relative z-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-24">
            <div className="flex flex-col items-center gap-4 mb-6">
              <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px]">How to Apply</span>
              <div className="h-[2px] w-12 bg-primary/20" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 tracking-tight">
              Your Admission Journey Starts Here <br />
              <span className="text-primary">Simple, Clear & Guided</span>
            </h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              We make the admission process easy and stress free. Our team supports you in every step from choosing the right course to completing the admission procedure through genuine, verified channels.
            </p>
          </div>

          {/* Stepper Logic */}
          <div className="relative">
            {/* Vertical Dotted Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-primary/20 -translate-x-1/2 hidden md:block" />
            
            <div className="space-y-20 relative">
              {[
                {
                  id: 1,
                  title: "Choose Your Program (MBA or Engineering)",
                  desc: "Tell us your preferred course, specialisation, and location so we can guide you toward the best-fit colleges."
                },
                {
                  id: 2,
                  title: "Understand Eligibility & Requirements",
                  desc: "We explain the admission criteria, entrance requirements (if any), fees, specialisations, and placement details for each college."
                },
                {
                  id: 3,
                  title: "Submit Your Documents",
                  desc: "Share your academic records and required documents we help you prepare and verify everything before application submission."
                },
                {
                  id: 4,
                  title: "Application Submission & Counselling",
                  desc: "We assist you in applying directly to colleges through the official process and help you prepare for interviews or counselling rounds (if applicable)."
                },
                {
                  id: 5,
                  title: "Receive Your Admission Updates",
                  desc: "Stay updated with your application status, counselling results, and admission confirmation with our continuous support."
                }
              ].map((step, idx) => (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col md:flex-row items-center gap-8 md:gap-0"
                >
                  {/* Left Side: Number & Title */}
                  <div className="md:w-1/2 flex items-center md:justify-end md:pr-16 text-center md:text-right">
                    <div className="flex flex-col md:items-end gap-4">
                      <div className="flex items-center gap-6 md:flex-row-reverse">
                        <div className="h-14 w-14 bg-primary text-white font-black text-xl flex items-center justify-center rounded-xl shadow-lg shadow-primary/20 shrink-0">
                          {step.id}
                        </div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Center Dot (Desktop Only) */}
                  <div className="relative hidden md:flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-primary ring-4 ring-primary/20 z-10" />
                  </div>

                  {/* Right Side: Description */}
                  <div className="md:w-1/2 md:pl-16 text-center md:text-left">
                    <p className="text-slate-500 font-medium leading-relaxed max-w-sm mx-auto md:mx-0">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;