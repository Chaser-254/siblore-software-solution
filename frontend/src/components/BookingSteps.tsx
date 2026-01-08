import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
interface BookingStepsProps {
  currentStep: number;
  steps: string[];
}
export function BookingSteps({
  currentStep,
  steps
}: BookingStepsProps) {
  return <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="relative flex justify-between items-center">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-dark-border -translate-y-1/2 rounded-full" />

        {/* Active Line Progress */}
        <motion.div className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-primary-blue to-primary-cyan -translate-y-1/2 rounded-full" initial={{
        width: '0%'
      }} animate={{
        width: `${currentStep / (steps.length - 1) * 100}%`
      }} transition={{
        duration: 0.5,
        ease: 'easeInOut'
      }} />

        {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        return <div key={step} className="relative z-10 flex flex-col items-center">
              <motion.div initial={false} animate={{
            backgroundColor: isCompleted || isActive ? '#020617' : '#020617',
            borderColor: isCompleted ? '#22C55E' : isActive ? '#0EA5E9' : '#0F172A',
            scale: isActive ? 1.2 : 1
          }} className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isActive ? 'shadow-lg shadow-primary-blue/50' : ''}`}>
                {isCompleted ? <Check size={16} className="text-success" /> : <span className={`text-sm font-bold ${isActive ? 'text-primary-blue' : 'text-text-secondary'}`}>
                    {index + 1}
                  </span>}
              </motion.div>
              <span className={`absolute -bottom-8 text-xs font-medium whitespace-nowrap ${isActive ? 'text-primary-blue' : isCompleted ? 'text-success' : 'text-text-secondary'}`}>
                {step}
              </span>
            </div>;
      })}
      </div>
    </div>;
}