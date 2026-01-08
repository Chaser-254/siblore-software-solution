import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, CreditCard, Check } from 'lucide-react';
interface PaymentSelectorProps {
  selectedMethod: 'mpesa' | 'card' | null;
  onSelect: (method: 'mpesa' | 'card') => void;
}
export function PaymentSelector({
  selectedMethod,
  onSelect
}: PaymentSelectorProps) {
  const paymentMethods = [{
    id: 'mpesa' as const,
    name: 'M-Pesa',
    description: 'Pay via M-Pesa mobile money',
    icon: Smartphone,
    color: 'from-green-500 to-green-600'
  }, {
    id: 'card' as const,
    name: 'Card Payment',
    description: 'Credit/Debit card or Google Pay',
    icon: CreditCard,
    color: 'from-primary-blue to-primary-cyan'
  }];
  return <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">
        Select Payment Method
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map(method => <motion.button key={method.id} onClick={() => onSelect(method.id)} whileHover={{
        scale: 1.02
      }} whileTap={{
        scale: 0.98
      }} className={`relative p-6 rounded-2xl border-2 transition-all ${selectedMethod === method.id ? 'border-primary-blue bg-primary-blue/10' : 'border-dark-border bg-dark-cardAlt hover:border-primary-blue/50'}`}>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${method.color}`}>
                <method.icon className="text-white" size={24} />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-bold text-white mb-1">{method.name}</h4>
                <p className="text-sm text-text-secondary">
                  {method.description}
                </p>
              </div>
              {selectedMethod === method.id && <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary-blue flex items-center justify-center">
                  <Check size={16} className="text-white" />
                </div>}
            </div>
          </motion.button>)}
      </div>
    </div>;
}