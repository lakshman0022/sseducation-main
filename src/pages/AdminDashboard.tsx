import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Users, FileText, Settings, LogOut, Search, Plus, Trash2, Edit3, CheckCircle2, Clock, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import mainLogo from "@/assets/main logo.png";

const LEADS = [
  { id: 1, name: "Amit Kumar", phone: "+91 98765 43210", course: "B.Tech", college: "RVCE", date: "2024-05-15 14:20", status: "New" },
  { id: 2, name: "Sneha Roy", phone: "+91 87654 32109", course: "MBBS", college: "KIMS", date: "2024-05-15 12:45", status: "Follow-up" },
  { id: 3, name: "Rahul Singh", phone: "+91 76543 21098", course: "MBA", college: "KIIT", date: "2024-05-14 18:10", status: "Closed" },
];

const BLOGS = [
  { id: 1, title: "Direct B.Tech Admission in Bangalore 2026", date: "2024-05-10", views: "1.2k" },
  { id: 2, title: "Top Medical Colleges for Bihar Students", date: "2024-05-08", views: "850" },
];

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("leads");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "ssadmin2026") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid Password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-[3rem] p-12 shadow-2xl"
        >
          <div className="text-center mb-10">
            <div className="h-20 w-auto flex items-center justify-center mb-6">
              <img src={mainLogo} alt="SS Education" className="h-full w-auto object-contain" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900">Admin Portal</h1>
            <p className="text-slate-500 mt-2">Enter password to access dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                placeholder="••••••••"
              />
            </div>
            <button className="w-full py-5 bg-primary text-white rounded-2xl font-extrabold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Log In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-slate-200 p-8 hidden lg:flex flex-col">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-10 w-auto flex items-center justify-center">
            <img src={mainLogo} alt="SS Education" className="h-full w-auto object-contain" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-extrabold text-slate-900 tracking-tight">SS EDUCATION</span>
            <span className="text-[10px] uppercase tracking-widest font-semibold opacity-60">Admin Dashboard</span>
          </div>
        </div>

        <nav className="space-y-2 flex-grow">
          {[
            { id: "leads", label: "Lead Management", icon: Users },
            { id: "blogs", label: "Blog Posts", icon: FileText },
            { id: "stories", label: "Success Stories", icon: CheckCircle2 },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all",
                activeTab === item.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <button 
          onClick={() => setIsAuthenticated(false)}
          className="flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-colors mt-auto"
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 lg:p-12 overflow-y-auto max-h-screen">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 capitalize">{activeTab.replace("-", " ")}</h2>
            <p className="text-slate-500 mt-1">Manage your website content and leads from here.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-12 pr-6 py-3 rounded-2xl bg-white border border-slate-200 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <button className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors relative">
              <Clock className="h-5 w-5 text-slate-500" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full" />
            </button>
          </div>
        </header>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "leads" && (
            <motion.div
              key="leads"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                  { label: "Total Leads", value: "248", color: "text-blue-600" },
                  { label: "New Leads", value: "12", color: "text-primary" },
                  { label: "Conversions", value: "85%", color: "text-emerald-600" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                    <div className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-1">{stat.label}</div>
                    <div className={cn("text-4xl font-black", stat.color)}>{stat.value}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Student Name</th>
                      <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Course & College</th>
                      <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                      <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {LEADS.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="font-bold text-slate-900">{lead.name}</div>
                          <div className="text-sm text-slate-500">{lead.phone}</div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="text-sm font-bold text-slate-700">{lead.course}</div>
                          <div className="text-xs text-slate-500">{lead.college}</div>
                        </td>
                        <td className="px-8 py-6 text-sm text-slate-500">{lead.date}</td>
                        <td className="px-8 py-6">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                            lead.status === "New" ? "bg-primary/10 text-primary" : 
                            lead.status === "Follow-up" ? "bg-amber-100 text-amber-600" : 
                            "bg-emerald-100 text-emerald-600"
                          )}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"><Eye className="h-4 w-4" /></button>
                            <button className="p-2 hover:bg-primary/10 rounded-lg text-primary"><Edit3 className="h-4 w-4" /></button>
                            <button className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash2 className="h-4 w-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "blogs" && (
            <motion.div
              key="blogs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900">All Articles</h3>
                <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                  <Plus className="h-5 w-5" /> New Post
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {BLOGS.map((blog) => (
                  <div key={blog.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest">{blog.date}</div>
                      <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                        <Eye className="h-3 w-3" /> {blog.views}
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-6 group-hover:text-primary transition-colors">{blog.title}</h4>
                    <div className="flex items-center gap-2">
                      <button className="flex-1 py-3 bg-slate-50 rounded-xl font-bold text-slate-600 text-sm hover:bg-slate-100 transition-colors">Edit</button>
                      <button className="py-3 px-4 bg-red-50 rounded-xl text-red-500 hover:bg-red-100 transition-colors"><Trash2 className="h-5 w-5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
