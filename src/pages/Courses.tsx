import { motion } from "framer-motion";
import { GraduationCap, Stethoscope, Briefcase, Scale, Laptop, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const COURSE_LIST = [
  {
    id: "engineering",
    title: "B.Tech Engineering",
    icon: GraduationCap,
    color: "bg-blue-600",
    description: "Secure your future in India's top engineering hubs like Bangalore, Pune, and Chennai. Specializations in CSE, AI/ML, Data Science, IT, and more.",
    features: ["Direct Admission in RVCE, Ramaiah, KIIT, IEM", "Management Quota Guidance", "NIRF Top Ranked Colleges", "Guaranteed Placement Support"],
    cta: "Explore Colleges",
    link: "/engineering"
  },
  {
    id: "mbbs",
    title: "MBBS / Medical",
    icon: Stethoscope,
    color: "bg-emerald-600",
    description: "World-class medical education in NMC-approved colleges. We help NEET qualified students secure seats in prestigious private and deemed medical universities.",
    features: ["Pan-India College Options", "NMC & WHO Approved Colleges", "Legit Management Quota Support", "Clinical Exposure Focus"],
    cta: "MBBS Details",
    link: "/mbbs"
  },
  {
    id: "mba",
    title: "MBA / Management",
    icon: Briefcase,
    color: "bg-purple-600",
    description: "Transform your career with an MBA from India's leading business schools. Specialized guidance for CAT, MAT, and CMAT aspirants.",
    features: ["Top Private B-Schools", "Marketing, Finance, HR, Operations", "Industry Integrated Programs", "Excellent ROI Packages"],
    cta: "Get Counseling",
    link: "/contact"
  },
  {
    id: "law",
    title: "Law (LLB / BA-LLB)",
    icon: Scale,
    color: "bg-amber-600",
    description: "Start your legal career in prestigious law institutes. Comprehensive support for integrated 5-year and 3-year LLB programs.",
    features: ["National Law Schools Guidance", "Top Private Law Colleges", "Moot Court Exposure", "Corporate Law Focus"],
    cta: "Inquire Now",
    link: "/contact"
  },
  {
    id: "bca",
    title: "BCA / MCA",
    icon: Laptop,
    color: "bg-indigo-600",
    description: "Deep dive into computer applications and software development. Perfect for students looking for high-growth tech careers.",
    features: ["Tech-Focused Curriculum", "Bangalore & Pune Colleges", "Software Engineering Focus", "IT Industry Tie-ups"],
    cta: "View Courses",
    link: "/contact"
  },
  {
    id: "bba",
    title: "BBA / B.Com",
    icon: BarChart3,
    color: "bg-rose-600",
    description: "Build a strong foundation in business administration and commerce. Ideal for future entrepreneurs and corporate leaders.",
    features: ["Modern Business Concepts", "Internship Opportunities", "Entrepreneurship Support", "Global Business Exposure"],
    cta: "Learn More",
    link: "/contact"
  }
];

const Courses = () => {
  return (
    <main className="pt-24">
      {/* Header */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold text-slate-900 mb-6"
          >
            Find Your <span className="text-primary">Perfect Course</span>
          </motion.h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Explore a wide range of undergraduate and postgraduate programs in India's top-ranked educational institutions.
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {COURSE_LIST.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/10 transition-all flex flex-col h-full"
              >
                <div className={`${course.color} h-16 w-16 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                  <course.icon className="h-9 w-9" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{course.title}</h3>
                <p className="text-slate-500 mb-8 leading-relaxed flex-grow">
                  {course.description}
                </p>
                <div className="space-y-3 mb-10">
                  {course.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-sm font-medium text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to={course.link}
                  className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold text-center hover:bg-primary transition-all flex items-center justify-center gap-2 group-hover:gap-3"
                >
                  {course.cta} <ArrowRight className="h-5 w-5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Expert Guidance for Every Stream</h2>
              <p className="text-lg text-slate-400 mb-10 leading-relaxed">
                Choosing the right course is as important as choosing the right college. Our counselors evaluate your aptitude, interests, and career goals to suggest the most suitable academic path.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Detailed Course Mapping", desc: "Understanding specializations and future prospects." },
                  { title: "College Comparison", desc: "Analyzing fees, placements, and infrastructure." },
                  { title: "Admission Timeline", desc: "Keeping track of application deadlines and exams." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                      <span className="font-bold">{idx + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 relative z-10">
                <h3 className="text-2xl font-bold mb-6 text-center">Get Free Career Counseling</h3>
                <div className="space-y-4">
                  <input type="text" placeholder="Full Name" className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary" />
                  <input type="tel" placeholder="Phone Number" className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary" />
                  <select className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-primary appearance-none">
                    <option value="" disabled selected className="bg-slate-900">Select Interested Course</option>
                    {COURSE_LIST.map(c => <option key={c.id} value={c.id} className="bg-slate-900">{c.title}</option>)}
                  </select>
                  <button className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg hover:scale-[1.02] transition-transform">
                    Speak to an Expert
                  </button>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[100px] -z-10 rounded-full" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Courses;
