import rvceCampus from "@/assets/rvce-campus.jpg";
import rvceBuilding from "@/assets/rvce-building.jpg";
import rvceLab from "@/assets/rvce-lab.jpg";
import ramaiahCampus from "@/assets/ramaiah-campus.jpg";
import ramaiahBuilding from "@/assets/ramaiah-building.jpg";
import ramaiahLab from "@/assets/ramaiah-lab.jpg";
import iemCampus from "@/assets/iem-campus.jpg";
import iemBuilding from "@/assets/iem-building.jpg";
import iemLab from "@/assets/iem-lab.jpg";
import celebrateImg from "@/assets/students-celebrate.jpg";
import mbbsHero from "@/assets/mbbs-hero.png";
import medicalBuilding from "@/assets/medical-building.png";
import srmCampus from "@/assets/srm-campus.png";
import srmLab from "@/assets/srm-lab.png";

export type CollegeConfig = {
  slug: string;
  short: string;
  name: string;
  city: string;
  state: string;
  hero: {
    eyebrow: string;
    headline: string;
    headlineHighlight: string;
    subline: string;
    subhead: string;
  };
  trustStats: { value: string; label: string }[];
  carousel: { img: string; eyebrow: string; title: string; subtitle: string }[];
  snapshot: { label: string; value: string }[];
  about: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    body: string;
    image: string;
    imageAlt: string;
    floatStat: { value: string; label: string };
    floatStat2: { value: string; label: string };
  };
  why: {
    title: string;
    titleHighlight: string;
    image: string;
    imageAlt: string;
    imageOverlayTitle: string;
    imageOverlaySubtitle: string;
    points: { title: string; desc: string; iconKey: string }[];
  };
  process: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  cta: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    subline: string;
    image: string;
  };
  seo: {
    title: string;
    description: string;
  };
};

export const COLLEGES: Record<string, CollegeConfig> = {
  rvce: {
    slug: "rv-college-btech-admission-2026",
    short: "RVCE",
    name: "R.V. College of Engineering",
    city: "Bangalore",
    state: "Karnataka",
    hero: {
      eyebrow: "Top 50 Engineering Colleges in India",
      headline: "Get B.Tech Admission in",
      headlineHighlight: "RVCE Bangalore 2026",
      subline: "Direct Seat Available — Bihar, Jharkhand & WB Students Welcome",
      subhead:
        "One of Bangalore's most prestigious engineering colleges. Highest package ₹1.15 Crore. SS Education has helped students from Bihar & Jharkhand secure seats here.",
    },
    trustStats: [
      { value: "₹1.15 Cr", label: "Highest Pkg" },
      { value: "₹15.24 LPA", label: "Average" },
      { value: "Bangalore", label: "Tech Capital" },
    ],
    carousel: [
      { img: rvceCampus, eyebrow: "Top 50 in India", title: "Premier Bangalore Campus", subtitle: "Decades of engineering excellence" },
      { img: rvceBuilding, eyebrow: "Modern Infrastructure", title: "World-Class Facilities", subtitle: "State-of-the-art labs & classrooms" },
      { img: rvceLab, eyebrow: "₹1.15 Crore Highest", title: "Google • Amazon • Microsoft", subtitle: "Top global recruiters on campus" },
    ],
    snapshot: [
      { label: "Location", value: "Bangalore, Karnataka" },
      { label: "Rank", value: "Top 50 Engineering India" },
      { label: "Highest Package", value: "₹1.15 Crore" },
      { label: "Average Package", value: "₹15.24 LPA" },
      { label: "Total Fees", value: "₹6 – ₹8 Lakhs" },
      { label: "Seats", value: "Limited — highly sought after" },
    ],
    about: {
      eyebrow: "About the College",
      title: "Bangalore's Most",
      titleHighlight: "Prestigious Engineering College",
      body: "R.V. College of Engineering (RVCE), Bangalore is one of Karnataka's most prestigious and competitive private engineering institutions. With a highest placement package of ₹1.15 Crore and an average of ₹15.24 LPA, RVCE is a dream destination for B.Tech aspirants who want Bangalore-level placements. SS Education specialises in helping students from Bihar, Jharkhand, and West Bengal navigate the RVCE admission process.",
      image: rvceBuilding,
      imageAlt: "RVCE Bangalore main campus building",
      floatStat: { value: "₹1.15 Cr", label: "Highest Package 2026" },
      floatStat2: { value: "Top 50", label: "Engineering India" },
    },
    why: {
      title: "Why Students Choose",
      titleHighlight: "RVCE Bangalore",
      image: rvceLab,
      imageAlt: "RVCE engineering students in lab",
      imageOverlayTitle: "India's No.1 IT Job Market",
      imageOverlaySubtitle: "Located in Bangalore — Silicon Valley of India",
      points: [
        { title: "Highest Package ₹1.15 Crore", desc: "Average ₹15.24 LPA — among the best in India.", iconKey: "trophy" },
        { title: "Bangalore — India's Tech Capital", desc: "Number one IT job market in the country.", iconKey: "map" },
        { title: "Google, Microsoft, Amazon Recruiters", desc: "Plus Bosch, Intel and 200+ top companies.", iconKey: "building" },
        { title: "Top CSE, ISE, ECE Branches", desc: "Excellent reputation for tech-focused departments.", iconKey: "code" },
        { title: "Strong Global Alumni Network", desc: "Across top MNCs and startups worldwide.", iconKey: "users" },
        { title: "NAAC Accredited Excellence", desc: "Decades of consistent academic distinction.", iconKey: "award" },
        { title: "Management Quota Available", desc: "NRI seats too — eligible students welcome.", iconKey: "sparkles" },
        { title: "End-to-End SS Education Support", desc: "From eligibility to seat confirmation.", iconKey: "check" },
      ],
    },
    process: [
      { title: "Call SS Education", desc: "Share your 12th marks and JEE/CET score with us." },
      { title: "Eligibility Evaluation", desc: "We evaluate management quota & other seat options." },
      { title: "Application Submission", desc: "Documentation and application support provided." },
      { title: "Counselling Coordination", desc: "We coordinate directly with RVCE admission office." },
      { title: "Seat Confirmation", desc: "Fee structure guidance and hostel support included." },
    ],
    faqs: [
      { q: "Is it possible to get RVCE admission from Bihar without KCET rank?", a: "Yes, through management quota seats which do not require KCET. Contact SS Education to understand the eligibility and process for out-of-state students." },
      { q: "What is the total fee at RVCE?", a: "The total B.Tech fee at RVCE is approximately ₹6–8 Lakhs depending on the branch and seat type. Management quota fees may differ." },
      { q: "Which branch is best at RVCE?", a: "CSE and ISE are the strongest branches with highest placement records. ECE and Mechanical also have strong industry connections." },
      { q: "How early should I apply for RVCE admission?", a: "RVCE seats fill up very fast. Ideally apply in April–May. Contact SS Education immediately for the current seat availability status." },
    ],
    cta: {
      eyebrow: "Limited RVCE Seats — 2026 Closing Soon",
      title: "Secure Your Seat at",
      titleHighlight: "RVCE Bangalore 2026",
      subline: "Talk to our RVCE expert counsellor for free and lock in your B.Tech seat today.",
      image: celebrateImg,
    },
    seo: {
      title: "RVCE Bangalore B.Tech Admission 2026 — Direct Seat | SS Education",
      description: "Get direct B.Tech admission in RV College of Engineering Bangalore 2026. ₹1.15 Cr highest package. Management quota for Bihar, Jharkhand students. Call +91 99456 67977.",
    },
  },

  ramaiah: {
    slug: "ramaiah-institute-btech-admission-2026",
    short: "RIT",
    name: "Ramaiah Institute of Technology",
    city: "Bangalore",
    state: "Karnataka",
    hero: {
      eyebrow: "60+ Years of Engineering Legacy",
      headline: "Get B.Tech Admission in",
      headlineHighlight: "Ramaiah Bangalore 2026",
      subline: "Direct Seat Available — Bihar, WB & Odisha Students Welcome",
      subhead:
        "60+ years of engineering excellence in Bangalore. Highest package ₹50 LPA. SS Education guides students from Bihar, WB & Odisha to secure seats here.",
    },
    trustStats: [
      { value: "₹50 LPA", label: "Highest Pkg" },
      { value: "60+ Yrs", label: "Legacy" },
      { value: "Bangalore", label: "IT Hub" },
    ],
    carousel: [
      { img: ramaiahCampus, eyebrow: "Since 1962", title: "Heritage Engineering Campus", subtitle: "60+ years of academic excellence" },
      { img: ramaiahBuilding, eyebrow: "Top Karnataka Private", title: "Modern Bangalore Campus", subtitle: "Strong industry connections" },
      { img: ramaiahLab, eyebrow: "Industry-Ready Labs", title: "CSE • ECE • Mechanical", subtitle: "Hands-on learning excellence" },
    ],
    snapshot: [
      { label: "Location", value: "Bangalore, Karnataka" },
      { label: "Rank", value: "Top Private Karnataka" },
      { label: "Highest Package", value: "₹50 LPA" },
      { label: "Average Package", value: "₹7.66 LPA" },
      { label: "Total Fees", value: "₹7 – ₹10 Lakhs" },
      { label: "Seats", value: "Limited management quota" },
    ],
    about: {
      eyebrow: "About the College",
      title: "60+ Years of",
      titleHighlight: "Engineering Legacy in Bangalore",
      body: "M.S. Ramaiah Institute of Technology (RIT) is one of Bangalore's most established and respected private engineering colleges with over 60 years of legacy. With a highest package of ₹50 LPA and strong industry connections across Bangalore's IT and manufacturing sectors, RIT offers B.Tech students from Eastern India an excellent gateway to a Bangalore career. SS Education has a proven track record of helping students from Bihar, Jharkhand, and West Bengal secure admission here.",
      image: ramaiahBuilding,
      imageAlt: "Ramaiah Institute of Technology Bangalore campus",
      floatStat: { value: "60+", label: "Years of Legacy" },
      floatStat2: { value: "₹50 LPA", label: "Highest Package" },
    },
    why: {
      title: "Why Students Choose",
      titleHighlight: "Ramaiah Bangalore",
      image: ramaiahLab,
      imageAlt: "Ramaiah engineering students in lab",
      imageOverlayTitle: "Established Industry Partners",
      imageOverlaySubtitle: "Infosys, Wipro, TCS, Bosch, Samsung & more",
      points: [
        { title: "60+ Years of Bangalore Legacy", desc: "Engineering education tradition since 1962.", iconKey: "award" },
        { title: "₹50 LPA Highest | ₹7.66 LPA Avg", desc: "Strong placement records year on year.", iconKey: "trophy" },
        { title: "Top Recruiters On Campus", desc: "Infosys, Wipro, TCS, Bosch, Samsung & more.", iconKey: "building" },
        { title: "Strong CSE, ECE, Mechanical", desc: "Excellent departments with industry ties.", iconKey: "code" },
        { title: "Bangalore Location Advantage", desc: "Direct access to India's IT job market.", iconKey: "map" },
        { title: "Management Quota for Outside Karnataka", desc: "Open to Bihar, Jharkhand, WB students.", iconKey: "sparkles" },
        { title: "Established Alumni Network", desc: "In top IT companies across India and abroad.", iconKey: "users" },
        { title: "End-to-End SS Education Support", desc: "From eligibility to fee guidance.", iconKey: "check" },
      ],
    },
    process: [
      { title: "Share Your Profile", desc: "12th marks, JEE score, and preferred branch with SS Education." },
      { title: "Eligibility Verification", desc: "We verify management quota or NRI category eligibility." },
      { title: "Application Submission", desc: "Application + all required documents prepared by us." },
      { title: "Counselling Support", desc: "Coordination with RIT admission office." },
      { title: "Seat Booking", desc: "Fee payment guidance and hostel arrangement support." },
    ],
    faqs: [
      { q: "Can students from Bihar get admission in Ramaiah without KCET?", a: "Yes. Management quota seats at RIT are open to students from all states without KCET. Contact SS Education to check current seat availability." },
      { q: "What is the total B.Tech fee at Ramaiah Institute?", a: "The total fee ranges from ₹7 to ₹10 Lakhs depending on the branch and seat category. We provide a complete fee breakdown before you decide." },
      { q: "Is Ramaiah good for CSE placements?", a: "Yes, RIT has a strong CSE placement record with top companies like Infosys, Wipro, and Bosch actively recruiting. The Bangalore location adds significant advantage." },
      { q: "How does SS Education help with RIT admission?", a: "We handle the full process — eligibility, application, documentation, counselling coordination, and fee guidance. You focus on preparation, we handle the admission." },
    ],
    cta: {
      eyebrow: "Limited Ramaiah Seats — 2026 Closing Soon",
      title: "Don't Miss Your Seat at",
      titleHighlight: "Ramaiah Institute 2026",
      subline: "Talk to our RIT expert counsellor for free and lock in your B.Tech seat today.",
      image: celebrateImg,
    },
    seo: {
      title: "Ramaiah Institute B.Tech Admission 2026 — Direct Seat | SS Education",
      description: "Get direct B.Tech admission in M.S. Ramaiah Institute of Technology Bangalore 2026. ₹50 LPA highest package. Management quota for Bihar, Jharkhand students. Call +91 99456 67977.",
    },
  },

  iem: {
    slug: "iem-kolkata-btech-admission-2026",
    short: "IEM",
    name: "Institute of Engineering & Management",
    city: "Kolkata",
    state: "West Bengal",
    hero: {
      eyebrow: "Top Private College in West Bengal",
      headline: "Get B.Tech Admission in",
      headlineHighlight: "IEM Kolkata 2026",
      subline: "Direct Seat Available — Closest Top College for Bihar & Jharkhand",
      subhead:
        "Closest top-ranked private engineering college for students from Bihar, Jharkhand, and Odisha. Affordable fees, strong placements. Call SS Education now.",
    },
    trustStats: [
      { value: "₹42 LPA", label: "Highest Pkg" },
      { value: "₹5-7 L", label: "Total Fees" },
      { value: "Kolkata", label: "Near Bihar" },
    ],
    carousel: [
      { img: iemCampus, eyebrow: "West Bengal's No.1 Private", title: "Premier Kolkata Campus", subtitle: "Top engineering institution in WB" },
      { img: iemBuilding, eyebrow: "Affordable Excellence", title: "Total Fees ₹5–7 Lakhs", subtitle: "Best value among top private colleges" },
      { img: iemLab, eyebrow: "₹42 LPA Highest Package", title: "TCS • Infosys • Cognizant • Wipro", subtitle: "Strong CSE & IT placements" },
    ],
    snapshot: [
      { label: "Location", value: "Kolkata, West Bengal" },
      { label: "Rank", value: "Top Private College WB" },
      { label: "Highest Package", value: "₹42 LPA" },
      { label: "Average Package", value: "₹6.5 LPA" },
      { label: "Total Fees", value: "₹5 – ₹7 Lakhs" },
      { label: "Seats", value: "Multiple branches available" },
    ],
    about: {
      eyebrow: "About the College",
      title: "West Bengal's Premier",
      titleHighlight: "Private Engineering Institution",
      body: "Institute of Engineering & Management (IEM), Kolkata is West Bengal's premier private engineering institution and one of the most sought-after colleges for students from Bihar, Jharkhand, and Eastern India. With affordable fees starting from ₹5 Lakhs, strong CSE and IT placements, and proximity to Eastern India, IEM is the smart choice for students who want quality without relocating far from home. SS Education, based in Durgapur, has deep expertise in IEM admissions and can fast-track your seat booking.",
      image: iemBuilding,
      imageAlt: "IEM Kolkata main campus building",
      floatStat: { value: "₹5 L+", label: "Affordable Total Fees" },
      floatStat2: { value: "2 hrs", label: "From Durgapur" },
    },
    why: {
      title: "Why Students Choose",
      titleHighlight: "IEM Kolkata",
      image: iemLab,
      imageAlt: "IEM Kolkata IT lab with students coding",
      imageOverlayTitle: "Strong IT Placement Record",
      imageOverlaySubtitle: "TCS, Infosys, Cognizant, Wipro & more",
      points: [
        { title: "Top Private Engineering — WB", desc: "Consistently ranked best in West Bengal.", iconKey: "trophy" },
        { title: "₹42 LPA Highest | ₹6.5 LPA Avg", desc: "Strong placement record year after year.", iconKey: "award" },
        { title: "Most Affordable Top Private", desc: "Total fees just ₹5–7 Lakhs.", iconKey: "sparkles" },
        { title: "Closest Premium College for Bihar", desc: "Just hours from Bihar & Jharkhand.", iconKey: "map" },
        { title: "Strong IT Placements", desc: "TCS, Infosys, Cognizant, Wipro and more.", iconKey: "building" },
        { title: "Multiple Branches Available", desc: "Good seat availability across departments.", iconKey: "code" },
        { title: "SS Education in Durgapur", desc: "We know IEM admissions inside out.", iconKey: "users" },
        { title: "Same-Day Counselling Response", desc: "Quick turnaround for your queries.", iconKey: "check" },
      ],
    },
    process: [
      { title: "Call SS Education", desc: "Share your 12th marks and WBJEE/JEE score." },
      { title: "Seat & Branch Check", desc: "We check availability and best-fit branch for your profile." },
      { title: "Application Submission", desc: "We submit application and prepare all documents." },
      { title: "Counselling Support", desc: "Seat allotment support — we attend with you if needed." },
      { title: "Admission Confirmation", desc: "Fee payment and hostel guidance included." },
    ],
    faqs: [
      { q: "Can students from Bihar or Jharkhand get admission in IEM Kolkata?", a: "Yes, absolutely. IEM accepts students from all states. Management quota seats are available without WBJEE. Contact SS Education for immediate availability." },
      { q: "What is the total B.Tech fee at IEM Kolkata?", a: "Total fees range from ₹5 to ₹7 Lakhs depending on the branch — making it one of the most affordable top private colleges for Eastern India students." },
      { q: "Is IEM Kolkata good for CSE and IT?", a: "Yes. IEM has a strong CSE and IT placement record with companies like TCS, Infosys, Cognizant, and Wipro consistently recruiting from campus." },
      { q: "Why choose SS Education for IEM admission?", a: "Our office is in Durgapur — just 2 hours from Kolkata. We have direct contacts and years of experience placing students in IEM. Call us for same-day response." },
    ],
    cta: {
      eyebrow: "Limited IEM Seats — 2026 Closing Soon",
      title: "Secure Your Seat at",
      titleHighlight: "IEM Kolkata 2026",
      subline: "Talk to our IEM expert counsellor for free and lock in your B.Tech seat today.",
      image: celebrateImg,
    },
    seo: {
      title: "IEM Kolkata B.Tech Admission 2026 — Direct Seat | SS Education",
      description: "Get direct B.Tech admission in IEM Kolkata 2026. West Bengal's top private engineering college. Affordable ₹5-7L fees. Closest premium college for Bihar & Jharkhand. Call +91 99456 67977.",
    },
  },

  mbbs: {
    slug: "mbbs-admission-india-2026",
    short: "MBBS India",
    name: "MBBS Admission in India",
    city: "Pan",
    state: "India",
    hero: {
      eyebrow: "NMC-Approved Medical Admissions 2026",
      headline: "Get Direct MBBS Admission in",
      headlineHighlight: "India 2026",
      subline: "Top Private & Deemed Medical Colleges — Pan India Support",
      subhead:
        "Secure your medical career in India's top-ranked medical institutions. We provide expert guidance for NEET UG qualified students seeking admission in NMC-approved colleges across the country.",
    },
    trustStats: [
      { value: "NMC", label: "Approved" },
      { value: "100%", label: "Transparency" },
      { value: "NEET", label: "Guidance" },
    ],
    carousel: [
      { img: mbbsHero, eyebrow: "Future Doctors", title: "Premier Medical Education", subtitle: "Start your journey in India's top medical colleges" },
      { img: medicalBuilding, eyebrow: "Modern Infrastructure", title: "World-Class Medical Labs", subtitle: "State-of-the-art facilities for clinical learning" },
      { img: celebrateImg, eyebrow: "Successful Admissions", title: "Join 500+ Future Medicos", subtitle: "Our students are studying in India's best colleges" },
    ],
    snapshot: [
      { label: "Location", value: "Pan India" },
      { label: "Course", value: "MBBS (UG)" },
      { label: "Duration", value: "5.5 Years" },
      { label: "Eligibility", value: "NEET UG Qualified" },
      { label: "Recognition", value: "NMC, WHO Approved" },
      { label: "Admission", value: "Direct & Counselling" },
    ],
    about: {
      eyebrow: "About MBBS in India",
      title: "Pursue Your Medical Dream with",
      titleHighlight: "NMC Approved Colleges",
      body: "Pursuing an MBBS in India is the primary goal for every medical aspirant. With over 600+ medical colleges, India offers world-class medical education recognized globally. SS Education specializes in helping students navigate the complex admission landscape of private and deemed medical universities. We ensure that you get into colleges that are NMC (National Medical Commission) approved and have excellent clinical exposure. Our team provides end-to-end support for students from Bihar, Jharkhand, and beyond to secure seats in prestigious Indian medical hubs.",
      image: medicalBuilding,
      imageAlt: "Modern medical college building in India",
      floatStat: { value: "600+", label: "Medical Colleges" },
      floatStat2: { value: "NMC", label: "Approved" },
    },
    why: {
      title: "Why Choose MBBS",
      titleHighlight: "Admission in India",
      image: mbbsHero,
      imageAlt: "Indian medical students in campus",
      imageOverlayTitle: "Quality Medical Education",
      imageOverlaySubtitle: "Clinical exposure in top-tier hospitals",
      points: [
        { title: "NMC & WHO Recognition", desc: "Degrees are valid across India and globally.", iconKey: "award" },
        { title: "Excellent Clinical Exposure", desc: "Learn in hospitals with high patient inflow.", iconKey: "stethoscope" },
        { title: "No Language Barrier", desc: "Education and patient interaction in English/Hindi.", iconKey: "map" },
        { title: "Standardized Curriculum", desc: "Follows the latest CBME medical curriculum.", iconKey: "microscope" },
        { title: "Expert Counselling Support", desc: "Personalized college shortlisting based on NEET score.", iconKey: "users" },
        { title: "100% Transparent Process", desc: "Clear fee structure and direct seat coordination.", iconKey: "sparkles" },
        { title: "NEET UG Mandatory Guidance", desc: "Helping you maximize your NEET performance.", iconKey: "heart" },
        { title: "End-to-End Handholding", desc: "From application to hostel accommodation.", iconKey: "check" },
      ],
    },
    process: [
      { title: "Expert Consultation", desc: "Initial discussion about your NEET score and budget." },
      { title: "College Shortlisting", desc: "Identify best-fit NMC approved colleges for you." },
      { title: "Application Support", desc: "Guided documentation and registration for counselling." },
      { title: "Counselling Guidance", desc: "Strategic choice filling for All India & State rounds." },
      { title: "Admission Lockdown", desc: "Final seat allotment and college joining formalities." },
    ],
    faqs: [
      { q: "Is NEET UG mandatory for MBBS in India?", a: "Yes, qualifying NEET UG is mandatory for admission to any medical college in India, including private and deemed universities." },
      { q: "Can SS Education help with management quota seats?", a: "Yes, we provide legitimate guidance for management and NRI quota seats in private medical colleges as per government norms." },
      { q: "Which states are best for MBBS admission in India?", a: "Karnataka, Maharashtra, and Tamil Nadu have some of the best private medical colleges with excellent hospital attachments." },
      { q: "What services does SS Education provide?", a: "We provide career counselling, college selection, documentation help, and support throughout the entire counselling process." },
    ],
    cta: {
      eyebrow: "MBBS 2026 Admissions Now Open",
      title: "Start Your Medical Journey in",
      titleHighlight: "India Today",
      subline: "Speak with our MBBS admission experts and secure your seat in a top NMC-approved college.",
      image: celebrateImg,
    },
    seo: {
      title: "MBBS Admission in India 2026 — Direct Seat | SS Education",
      description: "Secure your MBBS admission in India 2026. Get into top NMC-approved private & deemed medical colleges. Expert counselling for NEET UG qualified students. Call +91 99330 85333.",
    },
  },

  srm: {
    slug: "srm-university-btech-admission-2026",
    short: "SRMIST",
    name: "SRM Institute of Science and Technology",
    city: "Chennai (Kattankulathur)",
    state: "Tamil Nadu",
    hero: {
      eyebrow: "Top 30 NIRF Ranked Engineering Institute",
      headline: "Get Direct B.Tech Admission in",
      headlineHighlight: "SRM University 2026",
      subline: "Direct Seat & Counselling Support — Out-of-State Student Admission Open",
      subhead:
        "One of India's largest and most vibrant engineering campuses. 100% placement record. Special guidance on SRMJEEE, board marks eligibility, and direct admissions pathways.",
    },
    trustStats: [
      { value: "₹1.10 Cr", label: "Highest Pkg" },
      { value: "40,000+", label: "Active Students" },
      { value: "Chennai", label: "Automobile & Tech Hub" },
    ],
    carousel: [
      { img: srmCampus, eyebrow: "Main KTR Campus", title: "World-Class Infrastructure", subtitle: "Lush green 250+ acre campus in Chennai" },
      { img: srmLab, eyebrow: "Advanced Research Labs", title: "Next-Gen AI & Tech Hubs", subtitle: "Collaborative research with global tech leaders" },
      { img: celebrateImg, eyebrow: "Top Recruiter Network", title: "Over 800+ Top Recruiters", subtitle: "Google, Microsoft, Amazon, and leading global MNCs" },
    ],
    snapshot: [
      { label: "Location", value: "Chennai, Tamil Nadu" },
      { label: "NIRF Rank", value: "Top 30 Engineering India" },
      { label: "Highest Package", value: "₹1.10 Crore" },
      { label: "Average Package", value: "₹8.5 LPA" },
      { label: "Total Fees", value: "₹2.5 – ₹4.5 Lakhs / yr" },
      { label: "Eligibility", value: "Min 60% PCM in 10+2" },
    ],
    about: {
      eyebrow: "About SRM University",
      title: "India's Leading",
      titleHighlight: "Private Science & Technology Hub",
      body: "SRM Institute of Science and Technology (formerly SRM University) is a highly prestigious, multi-campus university. Its flagship Kattankulathur (KTR) campus near Chennai hosts state-of-the-art labs and a massive active student population. SRM is highly sought after by students from Bihar, West Bengal, and Jharkhand for its robust IT and Core placement records. With SS Education, we make the SRM admission process simple and stress-free by offering end-to-end support.",
      image: srmCampus,
      imageAlt: "SRM University Kattankulathur main campus",
      floatStat: { value: "Top 30", label: "NIRF Eng Rank" },
      floatStat2: { value: "₹1.10 Cr", label: "Highest Placement" },
    },
    why: {
      title: "Why Choose",
      titleHighlight: "SRM University Chennai",
      image: srmLab,
      imageAlt: "Students conducting experiments in SRM Lab",
      imageOverlayTitle: "A Global University Experience",
      imageOverlaySubtitle: "Lush multi-acre modern campus with international faculty",
      points: [
        { title: "Rigorous 10+2 Academic Eligibility", desc: "Requires min 60% aggregate in Physics, Chemistry, and Mathematics (PCM).", iconKey: "award" },
        { title: "Age Criteria strictly enforced", desc: "Candidate must be at least 16 years and 6 months old by July 31, 2026.", iconKey: "check" },
        { title: "Outstanding Placement Records", desc: "Highest package of ₹1.10 Crore and average of ₹8.5 LPA.", iconKey: "trophy" },
        { title: "Flagship Chennai KTR Campus", desc: "Over 250 acres of modern academic facilities and safe hostels.", iconKey: "map" },
        { title: "Global Recruiters Portfolio", desc: "Top companies like Google, Microsoft, Amazon, Siemens recruit regularly.", iconKey: "building" },
        { title: "Robust CS & IT Ecosystem", desc: "Advanced labs focusing on AI, Machine Learning, and Cybersecurity.", iconKey: "code" },
        { title: "Direct Admissions Pathway", desc: "Available for board toppers and highly-qualified JEE candidates.", iconKey: "sparkles" },
        { title: "100% Reliable Guidance", desc: "SS Education handles all steps of application and seat allotment.", iconKey: "users" },
      ],
    },
    process: [
      { title: "Initial Assessment", desc: "We review your 12th Board marks (verify 60% PCM eligibility) and check your age." },
      { title: "Pathway Selection", desc: "We evaluate eligibility for SRMJEEE booking vs direct/NRI seats." },
      { title: "Application Verification", desc: "Detailed document collection and application submission guidance." },
      { title: "Counseling & Selection", desc: "Guided choice-filling during the SRM counselling phases." },
      { title: "Admission Formalities", desc: "Verification of seat allotment, fee payment schedule, and hostel allocation." },
    ],
    faqs: [
      { q: "What is the minimum board marks required for SRM B.Tech?", a: "Candidates must have passed 10+2 or equivalent with a minimum aggregate of 60% in Physics, Chemistry, and Mathematics (PCM). For Delhi-NCR and Andhra Pradesh campuses, the minimum aggregate required is 50%." },
      { q: "Is there an age limit for SRM admissions?", a: "Yes. Candidates must have attained the age of 16 years and 6 months as of July 31 of the admission year (July 31, 2026)." },
      { q: "Can I get direct admission in SRM without SRMJEEE?", a: "Yes. Direct admission is offered to top rankers of state boards, CBSE, district toppers in Tamil Nadu, and top JEE Main rankers. NRI and Management quota seats are also available through proper channels." },
      { q: "How does SS Education assist with SRM admissions?", a: "We provide comprehensive guidance on eligibility checks, online registration, choice selection during counselling rounds, and guide you through hostel booking and documentation." },
    ],
    cta: {
      eyebrow: "SRM University Admissions 2026",
      title: "Lock in Your Dream Seat at",
      titleHighlight: "SRM Chennai 2026",
      subline: "Connect with our SRM admission specialist for an eligibility audit and secure your seat today.",
      image: celebrateImg,
    },
    seo: {
      title: "SRM University B.Tech Admission 2026 — Direct Seat | SS Education",
      description: "Direct B.Tech admission at SRM University Chennai Kattankulathur 2026. 60% PCM eligibility & age criteria. Call +91 99330 85333 for expert guidance.",
    },
  },
};