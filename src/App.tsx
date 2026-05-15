import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "./pages/Home.tsx";
import Engineering from "./pages/Engineering.tsx";
import About from "./pages/About.tsx";
import Courses from "./pages/Courses.tsx";
import Results from "./pages/Results.tsx";
import Contact from "./pages/Contact.tsx";
import FAQ from "./pages/FAQ.tsx";
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import AdLandingPage from "./pages/AdLandingPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import CollegeRoute from "./pages/CollegeRoute.tsx";
import { MainLayout } from "./components/layout/MainLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          {/* Main Website Pages */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/about" element={<MainLayout><About /></MainLayout>} />
          <Route path="/courses" element={<MainLayout><Courses /></MainLayout>} />
          <Route path="/engineering" element={<MainLayout><Engineering /></MainLayout>} /> {/* Current landing page */}
          <Route path="/results" element={<MainLayout><Results /></MainLayout>} />
          <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
          <Route path="/faq" element={<MainLayout><FAQ /></MainLayout>} />
          <Route path="/blog" element={<MainLayout><Blog /></MainLayout>} />
          <Route path="/blog/:slug" element={<MainLayout><BlogPost /></MainLayout>} />
          
          {/* College Pages */}
          <Route path="/college/kiit" element={<MainLayout><Engineering /></MainLayout>} />
          <Route path="/rv-college-btech-admission-2026" element={<MainLayout><CollegeRoute configKey="rvce" /></MainLayout>} />
          <Route path="/ramaiah-institute-btech-admission-2026" element={<MainLayout><CollegeRoute configKey="ramaiah" /></MainLayout>} />
          <Route path="/iem-kolkata-btech-admission-2026" element={<MainLayout><CollegeRoute configKey="iem" /></MainLayout>} />
          <Route path="/mbbs" element={<MainLayout><CollegeRoute configKey="mbbs" /></MainLayout>} />
          
          {/* Ad Landing Pages (No Nav/Footer) */}
          <Route path="/apply/:college" element={<AdLandingPage />} />
          
          {/* Specific Ad Landing Aliases */}
          <Route path="/apply/kiit" element={<AdLandingPage />} />
          <Route path="/apply/rvce" element={<AdLandingPage />} />
          <Route path="/apply/ramaiah" element={<AdLandingPage />} />
          <Route path="/apply/iem" element={<AdLandingPage />} />
          <Route path="/apply/mbbs" element={<AdLandingPage />} />
          
          {/* Admin Panel */}
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Catch-all */}
          <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
