import { motion } from "framer-motion";
import { Plus, Minus, Search, HelpCircle } from "lucide-react";
import { useState } from "react";

const FAQS = [
  {
    category: "General",
    questions: [
      { q: "What services does SS Education provide?", a: "We provide comprehensive educational consultancy, including career counseling, college selection, admission guidance, and support for management/NRI quota seats in top Engineering, Medical, and Management colleges." },
      { q: "Is SS Education a registered consultancy?", a: "Yes, SS Education is a registered and trusted educational consultancy with over 15 years of experience in helping students secure admissions in prestigious institutions." },
      { q: "How can I book a counseling session?", a: "You can book a free counseling session by calling us at +91 99330 85333 or filling out the inquiry form on our website." }
    ]
  },
  {
    category: "Engineering",
    questions: [
      { q: "Can I get admission in RVCE without KCET?", a: "Yes, students from outside Karnataka (Bihar, Jharkhand, etc.) can secure admission in RVCE through management quota or COMEDK seats. We specialize in guiding students through this process." },
      { q: "What is the average placement package at KIIT?", a: "The average package at KIIT University is around ₹8.2 LPA, with the highest package reaching ₹53 LPA (2024 data)." },
      { q: "Which engineering branch is most in demand?", a: "Currently, Computer Science (CSE) and its specializations like AI/ML and Data Science are in highest demand, followed by Electronics (ECE) and Information Technology (IT)." }
    ]
  },
  {
    category: "Medical (MBBS)",
    questions: [
      { q: "Is NEET mandatory for MBBS in India?", a: "Yes, qualifying NEET UG is mandatory for admission to any medical college in India, including private and deemed universities." },
      { q: "What are 'Deemed Universities' in medical education?", a: "Deemed Universities are high-performing medical institutions that have been granted autonomy by the UGC. They often have excellent infrastructure and clinical exposure." },
      { q: "Can SS Education help with admissions in Karnataka medical colleges?", a: "Yes, we have extensive experience in helping students secure seats in top private medical colleges in Karnataka, Maharashtra, and other states." }
    ]
  }
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-primary' : 'text-slate-900 group-hover:text-primary'}`}>
          {question}
        </span>
        <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'}`}>
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-slate-600 leading-relaxed max-w-4xl">
          {answer}
        </p>
      </motion.div>
    </div>
  );
};

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main className="pt-24 min-h-screen bg-white">
      {/* Header */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-3xl rounded-full" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary text-xs font-bold uppercase tracking-widest mb-8"
          >
            <HelpCircle className="h-4 w-4" /> Got Questions?
          </motion.div>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-8">
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 h-6 w-6" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-8 py-5 rounded-[2rem] bg-white text-slate-900 shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary/20 text-lg"
            />
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          {FAQS.map((category, idx) => {
            const filteredQuestions = category.questions.filter(
              q => q.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
                   q.a.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (filteredQuestions.length === 0) return null;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 last:mb-0"
              >
                <h2 className="text-sm font-extrabold text-primary uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                  {category.category}
                  <div className="h-[1px] bg-slate-100 flex-grow" />
                </h2>
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl px-10">
                  {filteredQuestions.map((item, qidx) => (
                    <FAQItem key={qidx} question={item.q} answer={item.a} />
                  ))}
                </div>
              </motion.div>
            );
          })}

          {searchTerm && FAQS.every(c => c.questions.filter(q => q.q.toLowerCase().includes(searchTerm.toLowerCase()) || q.a.toLowerCase().includes(searchTerm.toLowerCase())).length === 0) && (
            <div className="text-center py-20">
              <div className="text-slate-300 text-6xl mb-4 italic">No results found</div>
              <p className="text-slate-500">Try searching for different keywords or contact us directly.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Still Have Questions?</h2>
          <p className="text-slate-500 mb-10 max-w-xl mx-auto">Our counseling team is available to help you with any queries regarding your admission and career.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+919933085333" className="px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:scale-105 transition-all">
              Call Support
            </a>
            <a href="https://wa.me/919933085333" className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:scale-105 transition-all">
              Message on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQ;
