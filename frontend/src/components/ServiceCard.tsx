import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Clock } from 'lucide-react';
interface ServiceCardProps {
  title: string;
  price: string;
  features: string[];
  delivery: string;
  image: string;
  onBook: () => void;
  index: number;
}
export function ServiceCard({
  title,
  price,
  features,
  delivery,
  image,
  onBook,
  index
}: ServiceCardProps) {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true
  }} transition={{
    delay: index * 0.1
  }} whileHover={{
    y: -10,
    scale: 1.02
  }} className="group relative bg-dark-cardAlt border border-dark-border rounded-2xl overflow-hidden shadow-soft flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-cardAlt to-transparent z-10" />
        <img src={image} alt={title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-4 right-4 z-20 bg-dark-bg/80 backdrop-blur-md border border-primary-blue/30 px-4 py-1.5 rounded-full">
          <span className="text-primary-cyan font-bold font-mono">{price}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-primary-cyan transition-colors">
          {title}
        </h3>

        <ul className="space-y-3 mb-6 flex-1">
          {features.map((feature, i) => <li key={i} className="flex items-start gap-3 text-text-secondary text-sm">
              <Check className="w-5 h-5 text-success shrink-0" />
              <span>{feature}</span>
            </li>)}
        </ul>

        <div className="space-y-4 mt-auto">
          <div className="flex items-center gap-2 text-text-secondary text-xs font-medium bg-dark-bg py-2 px-3 rounded-lg w-fit">
            <Clock size={14} className="text-primary-blue" />
            <span>Delivery: {delivery}</span>
          </div>

          <button onClick={onBook} className="w-full py-3 px-6 rounded-full bg-primary-blue text-white font-bold flex items-center justify-center gap-2 group-hover:bg-primary-hover transition-all shadow-lg shadow-primary-blue/20">
            Book Now
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>;
}