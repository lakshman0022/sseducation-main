import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CheckCircle2, Phone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile"),
  email: z.string().trim().email("Enter a valid email").max(120).optional().or(z.literal("")),
  state: z.string().min(1, "Select your state"),
  branch: z.string().min(1, "Select preferred branch"),
});

export function LeadForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const parsed = leadSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        if (i.path[0]) fieldErrors[String(i.path[0])] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdLoigxaiQ05jssy6oUcVgENjCRBFjE1yFBmmCmB1EnPVZghw/formResponse";
    const googleFormData = new FormData();
    googleFormData.append("entry.1502716309", parsed.data.name);
    googleFormData.append("entry.1202722742", parsed.data.phone);
    googleFormData.append("entry.267493369", parsed.data.email || "");
    googleFormData.append("entry.921865976", parsed.data.state);
    googleFormData.append("entry.85122333", parsed.data.branch);

    try {
      await fetch(FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: googleFormData
      });
      setSubmitting(false);
      setSubmitted(true);
      toast.success("Thank you! Your request has been received.");
    } catch (error) {
      setSubmitting(false);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-[2.5rem] bg-white p-10 text-center border border-slate-100"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/50"
        >
          <CheckCircle2 className="h-12 w-12 text-emerald-500" />
        </motion.div>
        <h3 className="text-3xl font-black text-slate-900 tracking-tight">Request Received!</h3>
        <p className="mt-4 text-slate-500 font-medium leading-relaxed">
          Our expert counselor will call you within 15 minutes for a free session.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative space-y-5"
    >
      <div className="space-y-4">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1.5 block">Full Name *</Label>
          <Input id="name" name="name" placeholder="E.g. Rahul Sharma" className="h-14 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium" />
          {errors.name && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-wider">{errors.name}</p>}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1.5 block">Mobile Number *</Label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input id="phone" name="phone" type="tel" placeholder="10-digit mobile number" maxLength={10} className="h-14 pl-12 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium" />
          </div>
          {errors.phone && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-wider">{errors.phone}</p>}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1.5 block">Email (optional)</Label>
          <Input id="email" name="email" type="email" placeholder="name@example.com" className="h-14 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium" />
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Label htmlFor="state" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1.5 block">State *</Label>
            <Select name="state">
              <SelectTrigger id="state" className="h-14 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all font-medium">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-slate-100 shadow-2xl">
                <SelectItem value="Bihar">Bihar</SelectItem>
                <SelectItem value="Jharkhand">Jharkhand</SelectItem>
                <SelectItem value="West Bengal">West Bengal</SelectItem>
                <SelectItem value="Odisha">Odisha</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.state && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-wider">{errors.state}</p>}
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <Label htmlFor="branch" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1.5 block">Branch *</Label>
            <Select name="branch">
              <SelectTrigger id="branch" className="h-14 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all font-medium">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-slate-100 shadow-2xl">
                <SelectItem value="CSE">CSE / IT</SelectItem>
                <SelectItem value="AI/ML">AI / ML / Data</SelectItem>
                <SelectItem value="ECE">Electronics</SelectItem>
                <SelectItem value="Mechanical">Mechanical</SelectItem>
                <SelectItem value="Civil">Civil / Architecture</SelectItem>
                <SelectItem value="Other">Others</SelectItem>
              </SelectContent>
            </Select>
            {errors.branch && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-wider">{errors.branch}</p>}
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.6 }}
          className="pt-2"
        >
          <Button 
            type="submit" 
            className="w-full h-16 rounded-2xl bg-primary hover:bg-primary-glow text-white font-black text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all flex items-center justify-center gap-3"
            disabled={submitting}
          >
            {submitting ? "Processing..." : (<>Get Free Counselling <ArrowRight className="h-5 w-5" /></>)}
          </Button>
        </motion.div>
        
        <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-[0.1em] pt-2">
          🔒 Secure & Confidential • Counsellor Call Only
        </p>
      </div>
    </form>
  );
}