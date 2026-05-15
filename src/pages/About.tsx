import { motion } from "framer-motion";
import { History, Target, Users, MapPin, Phone, Mail, Clock, ShieldCheck } from "lucide-react";

const TEAM = [
  { name: "S.K. Basu", role: "Founder & Director", bio: "15+ years of experience in educational consultancy.", image: "https://i.pravatar.cc/150?u=1" },
  { name: "Anita Sharma", role: "Chief Counselor", bio: "Expert in MBBS and Medical admissions.", image: "https://i.pravatar.cc/150?u=2" },
  { name: "Rahul Verma", role: "Head of Operations", bio: "Specializes in Engineering college placements.", image: "https://i.pravatar.cc/150?u=3" },
];

const OFFICES = [
  {
    city: "Durgapur (H.O)",
    address: "City Centre, Durgapur, West Bengal - 713216",
    phone: "+91 99330 85333",
    email: "info@sseducation.co.in",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117070.36839352758!2d87.21852026131495!3d23.51635392231267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f9199347206121%3A0x67332c96c561b365!2sDurgapur%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1715768000000!5m2!1sen!2sin"
  },
  {
    city: "Patna Office",
    address: "Boring Road, Patna, Bihar - 800001",
    phone: "+91 99330 85333",
    email: "patna@sseducation.co.in",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115132.86107231458!2d85.07340056976826!3d25.60817557116813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f013444850785f%3A0x92f0f49673550e50!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1715768000000!5m2!1sen!2sin"
  },
  {
    city: "Kolkata Office",
    address: "Salt Lake, Sector V, Kolkata, WB - 700091",
    phone: "+91 99330 85333",
    email: "kolkata@sseducation.co.in",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.33439927513!2d88.2649511671239!3d22.53542730626352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sSalt%20Lake%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1715768000000!5m2!1sen!2sin"
  }
];

const About = () => {
  return (
    <main className="pt-24">
      {/* Hero Header */}
      <section className="bg-slate-900 py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-3xl rounded-full" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-6xl font-extrabold text-white mb-6"
          >
            Empowering <span className="text-primary">Aspirations</span> Since 2010
          </motion.h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            SS Education is East India's most trusted educational consultancy, dedicated to bridging the gap between students and their dream careers.
          </p>
        </div>
      </section>

      {/* History & Mission */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 text-primary font-bold mb-4">
                <History className="h-6 w-6" />
                <span className="uppercase tracking-widest text-sm">Our History</span>
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">A Decade of Excellence in Educational Consulting</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Founded in 2010, SS Education started with a simple mission: to provide honest and transparent guidance to students from Bihar and West Bengal. Today, we have successfully placed over 10,000 students in top engineering and medical colleges across India.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-3xl font-extrabold text-primary mb-1">15+</div>
                  <div className="text-sm font-bold text-slate-500 uppercase">Years Experience</div>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-3xl font-extrabold text-primary mb-1">10k+</div>
                  <div className="text-sm font-bold text-slate-500 uppercase">Students Placed</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-primary rounded-[3rem] p-10 lg:p-16 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <Target className="h-12 w-12 mb-6 text-white" />
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8">
                  To provide accurate, timely, and unbiased information to students and parents, ensuring they make informed decisions about their higher education. We believe every student deserves a chance to study in the best possible institution based on their merit and potential.
                </p>
                <ul className="space-y-4">
                  {[
                    "100% Transparency in Process",
                    "Personalized Career Counseling",
                    "Direct Coordination with Colleges",
                    "End-to-End Admission Support"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5 text-white/60" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Meet Our Expert Team</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Our team of experienced counselors and education experts are dedicated to your success.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TEAM.map((member, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl text-center"
              >
                <div className="h-24 w-24 rounded-full bg-slate-100 mx-auto mb-6 overflow-hidden border-4 border-slate-50 shadow-inner">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                <div className="text-primary text-sm font-bold mb-4 uppercase tracking-wider">{member.role}</div>
                <p className="text-slate-500 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Our Presence</h2>
            <p className="text-slate-500">Visit any of our 3 branch offices for a face-to-face consultation.</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {OFFICES.map((office, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden flex flex-col"
              >
                <div className="h-48 overflow-hidden">
                  <iframe
                    src={office.map}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="p-8 flex-grow">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{office.city}</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
                      <span className="text-slate-600 text-sm">{office.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-slate-600 text-sm font-bold">{office.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-slate-600 text-sm">{office.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-slate-600 text-sm">Mon - Sat: 10AM - 7PM</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
