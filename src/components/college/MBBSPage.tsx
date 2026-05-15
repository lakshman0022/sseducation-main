import { useRef } from "react";

import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { motion, useScroll, useTransform } from "framer-motion";

import {
  Sparkles,
  MapPin,
  Trophy,
  HeartPulse,
  Microscope,
  GraduationCap,
  Users2,
  Award,
  Building2,
  Code2,
  Users,
  CheckCircle2,
  HelpCircle,
  PhoneCall,
  ClipboardCheck,
  Send,
  BadgeCheck,
  Wallet,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Dna,
  type LucideIcon,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Toaster } from "@/components/ui/sonner";
import { MBBSLeadForm } from "./MBBSLeadForm";
import type { CollegeConfig } from "@/data/colleges";


const ICONS: Record<string, LucideIcon> = {
  trophy: Trophy,
  map: MapPin,
  building: Building2,
  code: Code2,
  users: Users,
  award: Award,
  sparkles: Sparkles,
  check: CheckCircle2,
  stethoscope: Stethoscope,
  heart: HeartPulse,
  microscope: Microscope,
};

const PROCESS_ICONS: LucideIcon[] = [PhoneCall, ClipboardCheck, Send, BadgeCheck, Wallet];
const SNAPSHOT_ICONS: LucideIcon[] = [MapPin, GraduationCap, HeartPulse, Microscope, Trophy, Users2];

export function MBBSPage({ config }: { config: CollegeConfig }) {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      <HeroSection config={config} />
      <StatsMarquee />
      <SnapshotSection config={config} />
      <AboutSection config={config} />
      <WhyChooseSection config={config} />
      <ProcessSection config={config} />
      <FAQSection config={config} />
      <CTASection config={config} />
      <Toaster richColors position="top-center" />
    </main>
  );
}


function HeroSection({ config }: { config: CollegeConfig }) {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-emerald-500/5 to-transparent" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -left-24 h-96 w-96 rounded-full bg-teal-500/10 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(#10b981_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-8"
            >
              <Sparkles className="h-3 w-3" /> {config.hero.eyebrow}
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
              {config.hero.headline}{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  {config.hero.headlineHighlight}
                </span>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute bottom-2 left-0 h-3 bg-emerald-500/20 -z-0" 
                />
              </span>
            </h1>
            
            <p className="mt-8 text-xl text-slate-400 leading-relaxed max-w-2xl">
              <span className="text-emerald-400 font-bold">{config.hero.subline}</span>. {config.hero.subhead}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href="tel:+919933085333" className="group relative flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-5 rounded-2xl font-black transition-all shadow-xl shadow-emerald-500/20 hover:-translate-y-1">
                <PhoneCall className="h-5 w-5" />
                GET FREE GUIDANCE
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center gap-4 px-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Student" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-bold text-white">500+ Students</div>
                  <div className="text-slate-500">Successfully Placed</div>
                </div>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/5 pt-10">
              {config.trustStats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-black text-white">{stat.value}</div>
                  <div className="text-sm font-medium text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-emerald-500/10 blur-[80px] -z-10 rounded-full" />
            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 shadow-2xl shadow-black/40">
              <div className="absolute -top-5 -right-5 h-16 w-16 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 rotate-6">
                <ShieldCheck className="h-8 w-8 text-slate-950" />
              </div>
              <MBBSLeadForm collegeShort={config.short} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatsMarquee() {
  return (
    <div className="bg-emerald-500/5 border-y border-emerald-500/10 py-6 overflow-hidden select-none">
      <div className="flex animate-marquee whitespace-nowrap gap-16">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-16 items-center">
            {["NMC APPROVED COLLEGES", "NEET UG GUIDANCE", "DIRECT ADMISSION SUPPORT", "MANAGEMENT QUOTA EXPERTS", "PAN INDIA COUNSELLING"].map(text => (
              <span key={text} className="flex items-center gap-4 text-emerald-400/50 font-black text-sm tracking-widest italic">
                <Dna className="h-4 w-4" /> {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SnapshotSection({ config }: { config: CollegeConfig }) {
  return (
    <section className="py-24 relative overflow-hidden bg-[#020617]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-end mb-16">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              MBBS Admission <span className="text-emerald-500">Quick Glance</span>
            </h2>
          </div>
          <div className="lg:w-1/2">
            <p className="text-slate-400 text-lg border-l-4 border-emerald-500 pl-6 py-2">
              Get all the vital information you need before starting your medical journey in India's top colleges.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-[2rem] overflow-hidden">
          {config.snapshot.map((item, i) => {
            const Icon = SNAPSHOT_ICONS[i % SNAPSHOT_ICONS.length];
            return (
              <motion.div
                key={i}
                whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.05)" }}
                className="bg-[#020617] p-10 group transition-colors"
              >
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">{item.label}</div>
                <div className="text-2xl font-black text-white mt-2 group-hover:text-emerald-400 transition-colors">{item.value}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AboutSection({ config }: { config: CollegeConfig }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <motion.div style={{ y }} className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 aspect-[4/5]">
              <img src={config.about.image} alt={config.about.imageAlt} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent" />
            </motion.div>
            
            {/* Floating Card */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="absolute -right-8 top-1/2 -translate-y-1/2 z-20 glass-dark p-6 rounded-3xl border border-white/10 shadow-2xl max-w-[240px]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Award className="h-5 w-5 text-slate-950" />
                </div>
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Premium Choice</div>
              </div>
              <div className="text-2xl font-black text-white">{config.about.floatStat.value}</div>
              <div className="text-sm text-slate-400 mt-1">{config.about.floatStat.label}</div>
            </motion.div>

            <div className="absolute -left-8 -bottom-8 h-48 w-48 rounded-[2rem] bg-emerald-600/20 -z-0 blur-2xl" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-1 w-20 bg-emerald-500 mb-8" />
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-8">
              {config.about.title} <br />
              <span className="text-emerald-500 italic">{config.about.titleHighlight}</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              {config.about.body}
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                <div className="text-3xl font-black text-emerald-500">{config.about.floatStat2.value}</div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">{config.about.floatStat2.label}</div>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                <div className="text-3xl font-black text-emerald-500">100%</div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Transparency</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseSection({ config }: { config: CollegeConfig }) {
  return (
    <section className="py-24 bg-slate-950 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            {config.why.title} <span className="text-emerald-500">{config.why.titleHighlight}</span>
          </h2>
          <p className="text-slate-400 text-lg">{config.why.imageOverlaySubtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="grid gap-6">
            {config.why.points.map((point, i) => {
              const Icon = ICONS[point.iconKey] ?? CheckCircle2;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex gap-6 p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
                >
                  <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{point.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{point.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="relative">
            <div className="sticky top-32">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 aspect-[4/5] group">
                <img src={config.why.image} alt={config.why.imageAlt} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="text-3xl font-black text-white">{config.why.imageOverlayTitle}</div>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="h-1 w-12 bg-emerald-500" />
                    <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs">Official Admission Partner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection({ config }: { config: CollegeConfig }) {
  return (
    <section className="py-24 bg-[#020617] relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-white">Your Path to <br /> <span className="text-emerald-500">Medical Excellence</span></h2>
          </div>
          <div className="hidden lg:block text-right">
            <div className="text-6xl font-black text-white/5">STEP BY STEP</div>
          </div>
        </div>

        <div className="relative grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {config.process.map((step, i) => {
            const Icon = PROCESS_ICONS[i % PROCESS_ICONS.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="relative group"
              >
                <div className="h-16 w-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-950 shadow-xl mb-8 group-hover:-translate-y-2 transition-transform">
                  <Icon className="h-8 w-8" />
                  <div className="absolute -bottom-4 -right-4 text-4xl font-black text-white/10 group-hover:text-emerald-500/20 transition-colors">0{i+1}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                {i < config.process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-white/5 z-0" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FAQSection({ config }: { config: CollegeConfig }) {
  return (
    <section className="py-24 relative bg-slate-950">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="h-8 w-8 text-emerald-500" />
          </div>
          <h2 className="text-4xl font-black text-white">MBBS Admission <span className="text-emerald-500">FAQ</span></h2>
          <p className="text-slate-500 mt-4">Everything you need to know about starting your medical career.</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {config.faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-none rounded-3xl bg-white/5 overflow-hidden group data-[state=open]:bg-emerald-500/5 transition-all">
              <AccordionTrigger className="px-8 py-6 text-lg font-bold text-white hover:no-underline text-left group-hover:text-emerald-400">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-slate-400 text-lg leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function CTASection({ config }: { config: CollegeConfig }) {
  return (
    <section className="relative py-32 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 opacity-40">
        <img src={config.cta.image} alt="Doctors" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-950 mb-8"
          >
            {config.cta.eyebrow}
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
            {config.cta.title} <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">{config.cta.titleHighlight}</span>
          </h2>
          <p className="mt-8 text-xl text-slate-400 max-w-xl">
            {config.cta.subline}
          </p>
          
          <div className="mt-12 flex flex-wrap gap-6">
            <a href="tel:+919933085333" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-10 py-5 rounded-2xl font-black transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-3">
              <PhoneCall className="h-6 w-6" /> CALL +91 99330 85333
            </a>
            <a href="https://wa.me/919933085333" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white px-10 py-5 rounded-2xl font-black transition-all border border-white/10 flex items-center gap-3">
              <MessageCircle className="h-6 w-6 text-emerald-500" /> WHATSAPP US
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

