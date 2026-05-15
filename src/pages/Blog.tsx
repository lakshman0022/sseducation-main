import { motion } from "framer-motion";
import { Search, Calendar, User, ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const BLOG_POSTS = [
  {
    slug: "direct-btech-admission-bangalore-2026",
    title: "Direct B.Tech Admission in Bangalore 2026: A Complete Guide",
    excerpt: "Everything you need to know about securing a B.Tech seat in Bangalore's top colleges like RVCE, Ramaiah, and BMSCE for the 2026 academic session.",
    date: "May 10, 2024",
    author: "S.K. Basu",
    image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800",
    category: "Engineering"
  },
  {
    slug: "mbbs-admission-india-neet-score",
    title: "How to Get MBBS Admission in India with Low NEET Score",
    excerpt: "Exploring options for medical aspirants who couldn't score high in NEET. Private and deemed medical colleges guidance and fee structure details.",
    date: "May 08, 2024",
    author: "Anita Sharma",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    category: "Medical"
  },
  {
    slug: "kiit-university-placements-2024",
    title: "KIIT University Placements 2024: Record Breaking Packages",
    excerpt: "An in-depth analysis of the recent placement trends at KIIT University Bhubaneswar and why it's a top choice for students from Bihar & Jharkhand.",
    date: "May 05, 2024",
    author: "Rahul Verma",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
    category: "College Review"
  },
  {
    slug: "top-mba-colleges-india-without-cat",
    title: "Top MBA Colleges in India Offering Admission Without CAT",
    excerpt: "Looking for management admissions but missed the CAT deadline? Check out these prestigious B-schools accepting MAT, CMAT, and XAT scores.",
    date: "May 02, 2024",
    author: "S.K. Basu",
    image: "https://images.unsplash.com/photo-1523240715639-96030800b651?auto=format&fit=crop&q=80&w=800",
    category: "Management"
  }
];

const Blog = () => {
  return (
    <main className="pt-24 min-h-screen">
      {/* Header */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-extrabold text-slate-900 mb-6"
            >
              SS Education <span className="text-primary">Insights</span>
            </motion.h1>
            <p className="text-xl text-slate-500 mb-10">
              Latest news, admission guides, and expert advice for students and parents.
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-14 pr-8 py-4 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:border-primary shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured & Latest Posts */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_350px] gap-16">
            {/* Posts Grid */}
            <div className="grid md:grid-cols-2 gap-10">
              {BLOG_POSTS.map((post, idx) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group flex flex-col"
                >
                  <Link to={`/blog/${post.slug}`} className="block relative h-64 rounded-[2.5rem] overflow-hidden mb-6">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest text-primary">
                        {post.category}
                      </span>
                    </div>
                  </Link>
                  <div className="flex items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-primary" /> {post.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-primary" /> {post.author}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors leading-tight">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-slate-500 mb-6 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="mt-auto flex items-center gap-2 font-bold text-primary group-hover:gap-3 transition-all"
                  >
                    Read Article <ArrowRight className="h-5 w-5" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Sidebar */}
            <aside className="space-y-12">
              {/* Popular Posts */}
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-primary" /> Popular Now
                </h4>
                <div className="space-y-6">
                  {BLOG_POSTS.slice(0, 3).map((post, i) => (
                    <Link key={i} to={`/blog/${post.slug}`} className="flex gap-4 group">
                      <div className="h-20 w-20 rounded-2xl overflow-hidden shrink-0">
                        <img src={post.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-900 line-clamp-2 text-sm group-hover:text-primary transition-colors">{post.title}</h5>
                        <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">{post.date}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-primary rounded-[2.5rem] p-8 text-white">
                <h4 className="text-xl font-bold mb-4">Stay Updated</h4>
                <p className="text-primary-foreground/70 text-sm mb-6">Get the latest admission news and guides directly in your inbox.</p>
                <div className="space-y-3">
                  <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none" />
                  <button className="w-full py-3 bg-white text-primary rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform">Subscribe</button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
