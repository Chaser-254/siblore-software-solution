import React from 'react';
import { motion } from 'framer-motion';
import { BoxIcon } from 'lucide-react';
interface StatCardProps {
  label: string;
  value: string;
  trend: string;
  icon: BoxIcon;
  delay?: number;
}
export function StatCard({
  label,
  value,
  trend,
  icon: Icon,
  delay = 0
}: StatCardProps) {
  const isPositive = trend.startsWith('+');
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    delay,
    duration: 0.4
  }} className="bg-dark-cardAlt border border-dark-border rounded-2xl p-6 hover:border-primary-blue/30 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary-blue/10 flex items-center justify-center">
          <Icon className="text-primary-blue" size={24} />
        </div>
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${isPositive ? 'bg-success/10 text-success' : 'bg-red-500/10 text-red-500'}`}>
          {trend}
        </span>
      </div>
      <div>
        <p className="text-text-secondary text-sm mb-1">{label}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
    </motion.div>;
}