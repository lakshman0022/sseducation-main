import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Send, Clock } from "lucide-react";

const OFFICES = [
  {
    city: "Durgapur (Head Office)",
    address: "City Centre, Durgapur, West Bengal - 713216",
    phone: "+91 99330 85333",
    email: "info@sseducation.co.in",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117070.36839352758!2d87.21852026131495!3d23.51635392231267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f9199347206121%3A0x67332c96c561b365!2sDurgapur%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1715768000000!5m2!1sen!2sin"
  },
  {
    city: "Patna Branch",
    address: "Boring Road, Patna, Bihar - 800001",
    phone: "+91 99330 85333",
    email: "patna@sseducation.co.in",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115132.86107231458!2d85.07340056976826!3d25.60817557116813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f013444850785f%3A0x92f0f49673550e50!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1715768000000!5m2!1sen!2sin"
  },
  {
    city: "Kolkata Branch",
    address: "Salt Lake, Sector V, Kolkata, WB - 700091",
    phone: "+91 99330 85333",
    email: "kolkata@sseducation.co.in",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.33439927513!2d88.2649511671239!3d22.53542730626352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sSalt%20Lake%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1715768000000!5m2!1sen!2sin"
  }
];

const Contact = () => {
  return (
    <main className="pt-24">
      {/* Header */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold text-slate-900 mb-6"
          >
            Get in <span className="text-primary">Touch</span>
          </motion.h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Have questions about admissions? Our expert counselors are ready to help you 24/7.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info & Offices */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Visit Our Offices</h2>
              <div className="space-y-8">
                {OFFICES.map((office, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50"
                  >
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{office.city}</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
                          <span className="text-slate-600 text-sm leading-relaxed">{office.address}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-primary shrink-0" />
                          <span className="text-slate-900 text-sm font-bold">{office.phone}</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-primary shrink-0" />
                          <span className="text-slate-600 text-sm">{office.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-primary shrink-0" />
                          <span className="text-slate-600 text-sm">10:00 AM - 07:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-slate-900 rounded-[3rem] p-10 lg:p-16 text-white sticky top-28 shadow-2xl">
                <h2 className="text-3xl font-bold mb-8 text-center lg:text-left">Send Us a Message</h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                      <input type="text" className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
                      <input type="tel" className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary transition-colors" placeholder="+91 99330 85333" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Interested Course</label>
                    <select className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
                      <option className="bg-slate-900">Select a Course</option>
                      <option className="bg-slate-900">B.Tech Engineering</option>
                      <option className="bg-slate-900">MBBS / Medical</option>
                      <option className="bg-slate-900">MBA / Management</option>
                      <option className="bg-slate-900">Law / BCA / Others</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Message</label>
                    <textarea rows={4} className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary transition-colors" placeholder="How can we help you?"></textarea>
                  </div>
                  <button className="w-full py-5 rounded-2xl bg-primary text-white font-extrabold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20">
                    Submit Inquiry <Send className="h-5 w-5" />
                  </button>
                </form>

                <div className="mt-12 pt-12 border-t border-white/10 flex flex-wrap justify-center gap-8">
                  <a href="https://wa.me/919933085333" className="flex items-center gap-2 text-green-400 font-bold hover:text-green-300 transition-colors">
                    <MessageCircle className="h-6 w-6" /> WhatsApp
                  </a>
                  <a href="tel:+919933085333" className="flex items-center gap-2 text-white font-bold hover:text-primary transition-colors">
                    <Phone className="h-6 w-6" /> +91 99330 85333
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900">Our Locations</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {OFFICES.map((office, idx) => (
              <div key={idx} className="h-96 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <iframe
                  src={office.map}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
