import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Star, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { LeadForm } from "@/components/landing/LeadForm";

const COLLEGE_DATA: Record<string, any> = {
  kiit: {
    name: "KIIT University",
    rank: "NIRF Rank 36",
    package: "₹53 LPA Highest",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000", // Placeholder
  },
  rvce: {
    name: "RV College of Engineering",
    rank: "Top 50 in India",
    package: "₹1.15 Cr Highest",
    image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1000",
  },
  ramaiah: {
    name: "MS Ramaiah Institute",
    rank: "60+ Years Legacy",
    package: "₹50 LPA Highest",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000",
  },
  iem: {
    name: "IEM Kolkata",
    rank: "No.1 Private in WB",
    package: "₹42 LPA Highest",
    image: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&q=80&w=1000",
  },
  mbbs: {
    name: "MBBS Admission 2026",
    rank: "NMC Approved",
    package: "Direct & Counselling",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000",
  }
};

const AdLandingPage = () => {
  const { college } = useParams();
  const data = COLLEGE_DATA[college || "kiit"] || COLLEGE_DATA.kiit;

  return (
    <main className="min-h-screen bg-white">
      {/* Top Banner */}
      <div className="bg-slate-900 py-3 text-center">
        <p className="text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-4">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          Limited Management Quota Seats for 2026-27
        </p>
      </div>

      {/* Hero */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                <Star className="h-4 w-4 fill-primary" /> {data.rank}
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                Direct B.Tech Admission in <span className="text-primary">{data.name}</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 max-w-xl">
                Secure your seat in {data.name} for 2026. {data.package} Package. No Donations. 100% Genuine Guidance.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                  <span className="font-bold text-slate-700">Verified Seats</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                  <span className="font-bold text-slate-700">Expert Counseling</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                  <span className="font-bold text-slate-700">Fee Guidance</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                  <span className="font-bold text-slate-700">Hostel Support</span>
                </div>
              </div>

              {/* Sticky Mobile Buttons */}
              <div className="fixed bottom-0 left-0 right-0 z-50 p-4 lg:static lg:p-0 flex flex-col sm:flex-row gap-3 bg-white/80 backdrop-blur-lg lg:bg-transparent lg:backdrop-blur-none border-t border-slate-100 lg:border-0 shadow-2xl lg:shadow-none">
                <a
                  href="tel:+919933085333"
                  className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-extrabold flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-all"
                >
                  <Phone className="h-6 w-6" /> Call: +91 99330 85333
                </a>
                <a
                  href="https://wa.me/919933085333"
                  className="flex-1 py-4 bg-green-500 text-white rounded-2xl font-extrabold flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-all"
                >
                  <MessageCircle className="h-6 w-6" /> WhatsApp Us
                </a>
              </div>
            </div>

            <div className="w-full max-w-md">
              <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 p-8 lg:p-10 relative">
                <div className="absolute -top-6 -right-6 h-20 w-20 bg-primary rounded-full flex items-center justify-center text-white text-center leading-tight shadow-xl">
                  <span className="text-[10px] font-bold uppercase">Direct<br />Seat</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Check Eligibility</h3>
                <p className="text-slate-500 mb-8">Fill the form to get a call from our expert.</p>
                <LeadForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 lg:gap-20">
            <div className="flex items-center gap-4 text-slate-400">
              <ShieldCheck className="h-8 w-8" />
              <div className="text-sm font-bold uppercase tracking-widest">Genuine Seats</div>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <Clock className="h-8 w-8" />
              <div className="text-sm font-bold uppercase tracking-widest">Fast Response</div>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <Star className="h-8 w-8" />
              <div className="text-sm font-bold uppercase tracking-widest">Top Counseling</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (Simplified) */}
      <footer className="py-12 border-t border-slate-100 text-center">
        <div className="container mx-auto px-4">
          <p className="text-slate-400 text-sm font-medium">
            © 2026 SS Education Consultancy Services. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default AdLandingPage;
