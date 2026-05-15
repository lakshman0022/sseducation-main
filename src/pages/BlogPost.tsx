import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, Share2, Facebook, Twitter, Linkedin, MessageCircle, ArrowLeft, Clock } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();

  // In a real app, you'd fetch the post by slug. For now, we'll mock it.
  const post = {
    title: "Direct B.Tech Admission in Bangalore 2026: A Complete Guide",
    date: "May 10, 2024",
    author: "S.K. Basu",
    readTime: "8 min read",
    category: "Engineering",
    image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200",
    content: `
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Bangalore, often hailed as the "Silicon Valley of India," remains the most sought-after destination for engineering aspirants across the country. With the 2026 academic session approaching, students from Bihar, Jharkhand, and West Bengal are increasingly looking for direct admission opportunities in Bangalore's premier institutions.
      </p>
      
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Choose Bangalore for Engineering?</h2>
      <p className="text-slate-600 leading-relaxed mb-6">
        The city is home to over 100 engineering colleges, ranging from top-ranked government institutions to prestigious private universities. The biggest advantage of studying in Bangalore is the unparalleled industry exposure. Being close to major IT hubs and global tech giants like Google, Microsoft, and Amazon means students have access to better internships and high-paying placement opportunities.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">Top Engineering Colleges in Bangalore</h2>
      <ul className="list-disc pl-6 mb-8 text-slate-600 space-y-2">
        <li><strong>R.V. College of Engineering (RVCE):</strong> Consistently ranked among the top 50 in India, known for its rigorous academics and ₹1.15 Cr highest package.</li>
        <li><strong>M.S. Ramaiah Institute of Technology (MSRIT):</strong> A legacy institution with over 60 years of excellence and strong industry ties.</li>
        <li><strong>BMS College of Engineering:</strong> One of the oldest private engineering colleges in India with a vast alumni network.</li>
        <li><strong>PES University:</strong> Famous for its research-driven curriculum and modern campus life.</li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding the Direct Admission Process</h2>
      <p className="text-slate-600 leading-relaxed mb-6">
        Direct admission, often referred to as Management Quota admission, is a legitimate process where students can secure seats in private engineering colleges based on their 12th-grade marks and entrance exam qualification. While entrance exams like KCET or COMEDK are standard, many institutions reserve a portion of their seats for management quota to encourage diversity and support out-of-state students.
      </p>

      <blockquote className="border-l-4 border-primary pl-6 py-4 bg-slate-50 italic text-slate-700 text-lg mb-8">
        "Choosing the right college and branch is a critical decision. At SS Education, we ensure that students get the best possible guidance without any hidden costs or complications."
      </blockquote>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">How SS Education Can Help</h2>
      <p className="text-slate-600 leading-relaxed mb-6">
        We specialize in helping students navigate the complexities of Bangalore admissions. Our team provides end-to-end support, including eligibility checks, document preparation, and direct coordination with college admission offices.
      </p>
    `
  };

  return (
    <main className="pt-24 pb-24 min-h-screen">
      {/* Article Header */}
      <header className="container mx-auto px-4 pt-12 pb-16 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:gap-3 transition-all">
          <ArrowLeft className="h-5 w-5" /> Back to Insights
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest">
              {post.category}
            </span>
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-widest ml-4">
              <Clock className="h-3.5 w-3.5" /> {post.readTime}
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-8">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between py-8 border-y border-slate-100 mb-12">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-slate-100 overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=basu" alt={post.author} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-slate-900">{post.author}</div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2 mt-1">
                  <Calendar className="h-3 w-3" /> {post.date}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:block">Share Article</span>
              <div className="flex gap-2">
                {[Facebook, Twitter, Linkedin, Share2].map((Icon, i) => (
                  <button key={i} className="h-10 w-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all">
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Featured Image */}
      <div className="container mx-auto px-4 max-w-5xl mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="h-[500px] rounded-[3rem] overflow-hidden shadow-2xl"
        >
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </motion.div>
      </div>

      {/* Content */}
      <article className="container mx-auto px-4 max-w-3xl">
        <div 
          className="prose prose-slate prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {/* Author Bio */}
        <div className="mt-20 p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row items-center gap-8">
          <div className="h-24 w-24 rounded-3xl bg-white shadow-xl overflow-hidden shrink-0">
            <img src="https://i.pravatar.cc/150?u=basu" alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900 mb-2">Written by {post.author}</div>
            <p className="text-slate-600 leading-relaxed mb-4">
              S.K. Basu is the founder of SS Education and has over 15 years of experience in career counseling and educational consulting. He has helped thousands of students secure seats in India's top colleges.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-primary font-bold text-sm hover:underline">View Profile</a>
              <a href="#" className="text-primary font-bold text-sm hover:underline">Contact Author</a>
            </div>
          </div>
        </div>
      </article>

      {/* WhatsApp CTA Fixed */}
      <a 
        href="https://wa.me/919933085333" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 h-16 w-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all group"
      >
        <MessageCircle className="h-8 w-8" />
        <span className="absolute right-full mr-4 px-4 py-2 bg-white text-slate-900 rounded-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          Chat with an Expert
        </span>
      </a>
    </main>
  );
};

export default BlogPost;
