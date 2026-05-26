import { useState } from "react";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import mainLogo from "@/assets/main logo.png";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("Subscribed! We'll keep you posted.");
    setEmail("");
  };

  const offices = [
    {
      title: "DURGAPUR BRANCH OFFICE",
      lines: ["1st Floorm UCP-004 Bengal Ambuja, city Centre,", "Durgapur, West Bengal-713216"],
    },
    {
      title: "BANGLORE BRANCH",
      lines: [
        "Dwarkangar, Bagalur Main Road,",
        "Yelahanka Near Brindavan College of",
        "Engineering, Bangalore, Karnataka-560063",
      ],
    },
    {
      title: "Bhubaneswar BRANCH OFFICE",
      lines: ["1st Floor Jena Mansion, shanti Bihar ,", "kiit Squar Bhubaneswar 751024"],
    },
  ];

  return (
    <footer className="relative bg-foreground text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_15%_30%,oklch(0.55_0.18_280_/_0.4),transparent_50%),radial-gradient(circle_at_85%_70%,oklch(0.78_0.18_60_/_0.3),transparent_50%)]" />

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Brand + Branch offices */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <img 
                src={mainLogo} 
                alt="SS Education" 
                className="h-12 w-auto object-contain brightness-0 invert" 
              />
              <div className="flex flex-col leading-tight">
                <span className="font-black text-xl tracking-tight text-white">SS EDUCATION</span>
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/40">Consultancy Services</span>
              </div>
            </motion.div>

            <div className="space-y-8">
            {offices.map((office, i) => (
              <motion.div
                key={office.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h4 className="flex items-start gap-2 font-extrabold uppercase tracking-wide text-base text-primary-foreground">
                  <MapPin className="h-5 w-5 text-accent-glow flex-shrink-0 mt-0.5" />
                  {office.title}
                </h4>
                <div className="mt-3 pl-7 text-sm text-primary-foreground/70 leading-relaxed">
                  {office.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </motion.div>
            ))}
            </div>
          </div>

          {/* Contact + Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-10"
          >
            <div>
              <h4 className="font-extrabold uppercase tracking-wide text-base">Contact Info</h4>
              <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-accent-glow flex-shrink-0" />
                  <a href="tel:+919933085333" className="hover:text-accent-glow transition-colors">+91 99330 85333</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-accent-glow flex-shrink-0" />
                  <a href="mailto:info@sseducationalservices.com" className="hover:text-accent-glow transition-colors">
                    info@sseducationalservices.com
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-extrabold uppercase tracking-wide text-base">Quick Links</h4>
              <ul className="mt-4 grid grid-cols-2 gap-3 text-sm text-primary-foreground/80">
                {[
                  { label: "MBBS Admission", href: "/mbbs" },
                  { label: "BTech Bengaluru 2026", href: "/btech-admission-bengaluru-2026" },
                  { label: "Career", href: "#" },
                  { label: "Investor", href: "#" },
                  { label: "Terms & Conditions", href: "#" },
                  { label: "Refund Policy", href: "#" },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="inline-flex items-center gap-1.5 hover:text-accent-glow transition-colors">
                      <span className="h-1 w-1 rounded-full bg-accent-glow" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-extrabold uppercase tracking-wide text-base">Newsletter Signup</h4>
            <form onSubmit={handleSubscribe} className="mt-5 space-y-4">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-0 border-b border-primary-foreground/30 rounded-none px-0 pb-3 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-0 focus-visible:border-accent-glow shadow-none h-auto"
                />
              </div>
              <Button
                type="submit"
                variant="outline"
                className="rounded-full border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-accent-glow hover:text-foreground hover:border-accent-glow px-7 group"
              >
                <Send className="h-4 w-4 mr-2 transition-transform group-hover:translate-x-0.5" />
                Send me
              </Button>
              <p className="text-xs text-primary-foreground/50">
                <span className="text-accent-glow">*</span> Please note - we do not spam your email.
              </p>
            </form>
          </motion.div>
        </div>

        {/* Bottom row */}
        <div className="mt-14 pt-6 border-t border-primary-foreground/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex gap-3">
            {[
              { Icon: Facebook, href: "#", label: "Facebook" },
              { Icon: Twitter, href: "#", label: "Twitter" },
              { Icon: Instagram, href: "#", label: "Instagram" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-success/40 text-success hover:bg-success hover:text-foreground transition-all"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="text-xs text-primary-foreground/60">
            Copyright © 2026 SS Educational Services
          </p>
        </div>
      </div>
    </footer>
  );
}
