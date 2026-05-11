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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success("Thank you! Our counsellor will call you within 30 minutes.");
    }, 800);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-card p-8 shadow-[var(--shadow-float)] text-center border border-border"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-success/15 ring-8 ring-success/5"
        >
          <CheckCircle2 className="h-11 w-11 text-success" />
        </motion.div>
        <h3 className="text-2xl font-bold text-foreground">Request Received!</h3>
        <p className="mt-2 text-muted-foreground">
          Our KIIT admission counsellor will call you within 30 minutes.
        </p>
        <a
          href="tel:+919933085333"
          className="mt-5 inline-flex items-center gap-2 text-primary font-semibold hover:underline"
        >
          <Phone className="h-4 w-4" /> Or call now: +91 99330 85333
        </a>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-2xl bg-card p-6 sm:p-7 shadow-[var(--shadow-float)] border border-border overflow-hidden"
    >
      <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[image:var(--gradient-accent)] opacity-15 blur-3xl" />
      <div className="relative">
      <div className="mb-5 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent-foreground uppercase tracking-wide">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          Limited Seats — 2026
        </span>
        <h3 className="mt-3 text-2xl font-bold text-foreground leading-tight">
          Book Free Counselling Call.
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Get instant seat & fee guidance for KIIT B.Tech
        </p>
      </div>

      <div className="space-y-3.5">
        <div>
          <Label htmlFor="name" className="text-xs font-semibold">Full Name *</Label>
          <Input id="name" name="name" placeholder="Your full name" className="mt-1" />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="phone" className="text-xs font-semibold">Mobile Number *</Label>
          <Input id="phone" name="phone" type="tel" placeholder="10-digit mobile" maxLength={10} className="mt-1" />
          {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
        </div>
        <div>
          <Label htmlFor="email" className="text-xs font-semibold">Email (optional)</Label>
          <Input id="email" name="email" type="email" placeholder="name@example.com" className="mt-1" />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="state" className="text-xs font-semibold">State *</Label>
            <Select name="state">
              <SelectTrigger id="state" className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Bihar">Bihar</SelectItem>
                <SelectItem value="Jharkhand">Jharkhand</SelectItem>
                <SelectItem value="West Bengal">West Bengal</SelectItem>
                <SelectItem value="Odisha">Odisha</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.state && <p className="text-xs text-destructive mt-1">{errors.state}</p>}
          </div>
          <div>
            <Label htmlFor="branch" className="text-xs font-semibold">Branch *</Label>
            <Select name="branch">
              <SelectTrigger id="branch" className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="CSE">CSE</SelectItem>
                <SelectItem value="AI/ML">AI / ML</SelectItem>
                <SelectItem value="ECE">ECE</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="Mechanical">Mechanical</SelectItem>
                <SelectItem value="Civil">Civil</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.branch && <p className="text-xs text-destructive mt-1">{errors.branch}</p>}
          </div>
        </div>

        <Button type="submit" variant="hero" size="lg" className="w-full mt-2 whitespace-normal text-center leading-tight" disabled={submitting}>
          {submitting ? "Submitting..." : (<><span>Get Free Counselling</span><ArrowRight className="h-4 w-4" /></>)}
        </Button>
        <p className="text-[11px] text-center text-muted-foreground">
          🔒 Your info is 100% safe. No spam — counsellor call only.
        </p>
      </div>
      </div>
    </form>
  );
}