import React, { useState } from 'react';
import { CreditCard, CheckCircle, Loader } from 'lucide-react';
interface CardPaymentProps {
  amount: string;
  onComplete: () => void;
}
export function CardPayment({
  amount,
  onComplete
}: CardPaymentProps) {
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const handlePay = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, 2000);
  };
  if (isPaid) {
    return <div className="text-center py-8">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-success w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Payment Successful!
        </h3>
        <p className="text-text-secondary">
          Your card payment has been processed.
        </p>
      </div>;
  }
  return <div className="space-y-6">
      <div className="bg-dark-cardAlt border border-dark-border rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary-blue/10 flex items-center justify-center">
            <CreditCard className="text-primary-blue" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-white">Card Payment</h3>
            <p className="text-sm text-text-secondary">
              Credit/Debit Card or Google Pay
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Card Number
            </label>
            <input type="text" value={cardData.number} onChange={e => setCardData({
            ...cardData,
            number: e.target.value
          })} placeholder="1234 5678 9012 3456" maxLength={19} className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Cardholder Name
            </label>
            <input type="text" value={cardData.name} onChange={e => setCardData({
            ...cardData,
            name: e.target.value
          })} placeholder="JOHN DOE" className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Expiry Date
              </label>
              <input type="text" value={cardData.expiry} onChange={e => setCardData({
              ...cardData,
              expiry: e.target.value
            })} placeholder="MM/YY" maxLength={5} className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                CVC
              </label>
              <input type="text" value={cardData.cvc} onChange={e => setCardData({
              ...cardData,
              cvc: e.target.value
            })} placeholder="123" maxLength={3} className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all" />
            </div>
          </div>

          <div className="bg-dark-bg rounded-xl p-4 border border-dark-border">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Amount to Pay:</span>
              <span className="text-2xl font-bold text-primary-cyan">
                {amount}
              </span>
            </div>
          </div>

          <button onClick={handlePay} disabled={!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvc || isProcessing} className="w-full py-4 rounded-full bg-primary-blue text-white font-bold hover:bg-primary-hover disabled:bg-gray-600 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
            {isProcessing ? <>
                <Loader className="animate-spin" size={20} />
                Processing...
              </> : <>
                <CreditCard size={20} />
                Pay {amount}
              </>}
          </button>
        </div>
      </div>
    </div>;
}