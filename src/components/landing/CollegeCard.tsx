import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";

interface CollegeCardProps {
  name: string;
  location: string;
  image: string;
  rating: string;
  tags: string[];
  href: string;
}

export const CollegeCard = ({ name, location, image, rating, tags, href }: CollegeCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.12)]"
    >
      <div className="relative h-60 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-5 left-5 flex gap-2">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-white/95 backdrop-blur-md text-[9px] font-black uppercase tracking-widest rounded-full text-primary shadow-sm">
              {tag}
            </span>
          ))}
        </div>
        <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl flex items-center gap-1.5 shadow-sm">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-[10px] font-black">{rating}</span>
        </div>
      </div>
      
      <div className="p-8">
        <div className="flex flex-col mb-4">
          <h3 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight tracking-tight">
            {name}
          </h3>
          <div className="flex items-center gap-1.5 text-slate-400 mt-2">
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-xs font-bold uppercase tracking-wider">{location}</span>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
              <GraduationCap className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Admission 2026</span>
          </div>
          <Link
            to={href}
            className="flex items-center gap-1 text-xs font-black text-primary uppercase tracking-widest group-hover:gap-2 transition-all"
          >
            Details <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
