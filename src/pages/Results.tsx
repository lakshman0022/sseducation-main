import { motion } from "framer-motion";
import { Quote, GraduationCap, Building2, Star } from "lucide-react";

const SUCCESS_STORIES = [
  {
    name: "Aryan Gupta",
    college: "RV College of Engineering",
    course: "B.Tech CSE",
    year: "2024 Batch",
    image: "https://i.pravatar.cc/150?u=10",
    review: "SS Education made the entire admission process at RVCE seamless. From eligibility to seat booking, their guidance was spot-on. Highly recommended for students from Bihar!",
    rating: 5
  },
  {
    name: "Priya Das",
    college: "KIMS, Bhubaneswar",
    course: "MBBS",
    year: "2023 Batch",
    image: "https://i.pravatar.cc/150?u=11",
    review: "I was worried about my NEET score and college selection. The experts at SS Education helped me find the best medical college within my budget. Truly grateful.",
    rating: 5
  },
  {
    name: "Vikram Maity",
    college: "IEM Kolkata",
    course: "B.Tech IT",
    year: "2024 Batch",
    image: "https://i.pravatar.cc/150?u=12",
    review: "Being from Durgapur, I wanted a top college in Kolkata. SS Education helped me secure a seat in IEM Kolkata through management quota without any hassle.",
    rating: 5
  },
  {
    name: "Sneha Roy",
    college: "MS Ramaiah Institute",
    course: "B.Tech ECE",
    year: "2024 Batch",
    image: "https://i.pravatar.cc/150?u=13",
    review: "The counseling session was very eye-opening. They didn't just push for a college but helped me understand which branch is best for my career. Fantastic service.",
    rating: 5
  },
  {
    name: "Rahul Kumar",
    college: "KIIT University",
    course: "B.Tech CSE",
    year: "2025 Batch",
    image: "https://i.pravatar.cc/150?u=14",
    review: "Fast, reliable, and transparent. SS Education handled everything for my KIIT admission. I'm now studying in my dream college thanks to them.",
    rating: 4
  },
  {
    name: "Anjali Singh",
    college: "M.S. Ramaiah Medical College",
    course: "MBBS",
    year: "2024 Batch",
    image: "https://i.pravatar.cc/150?u=15",
    review: "The medical admission process is complex, but SS Education made it look easy. Their knowledge about colleges across India is unmatched.",
    rating: 5
  }
];

const Results = () => {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 blur-3xl rounded-full" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-extrabold text-white mb-6"
          >
            Student <span className="text-primary">Success Stories</span>
          </motion.h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Join thousands of students who have successfully secured their future in India's top institutions through SS Education.
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {SUCCESS_STORIES.map((story, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-xl relative overflow-hidden"
              >
                <Quote className="absolute top-8 right-8 h-12 w-12 text-slate-100 -z-0" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-slate-50 shadow-lg">
                      <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{story.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < story.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-primary">
                      <Building2 className="h-4 w-4" />
                      <span className="text-sm font-bold uppercase tracking-wider">{story.college}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <GraduationCap className="h-4 w-4" />
                      <span className="text-sm font-medium">{story.course} — {story.year}</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 italic leading-relaxed">
                    "{story.review}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto bg-primary rounded-[3.5rem] p-12 lg:p-20 text-white shadow-2xl shadow-primary/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <h2 className="text-4xl font-extrabold mb-6 relative z-10">Be Our Next Success Story</h2>
            <p className="text-xl text-primary-foreground/80 mb-10 relative z-10">
              Start your journey today. Get a free consultation with our expert counselors.
            </p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <a href="tel:+919933085333" className="px-10 py-5 bg-white text-primary font-extrabold rounded-2xl hover:scale-105 transition-all">
                Call Now: +91 99330 85333
              </a>
              <a href="https://wa.me/919933085333" className="px-10 py-5 bg-green-500 text-white font-extrabold rounded-2xl hover:scale-105 transition-all">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Results;
