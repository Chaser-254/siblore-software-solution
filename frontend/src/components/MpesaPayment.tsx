import React, { useState } from 'react';
import { Smartphone, CheckCircle, Loader } from 'lucide-react';
interface MpesaPaymentProps {
  amount: string;
  onComplete: () => void;
}
export function MpesaPayment({
  amount,
  onComplete
}: MpesaPaymentProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const handlePay = () => {
    setIsProcessing(true);
    // Simulate M-Pesa STK push
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, 3000);
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
          Your M-Pesa payment has been confirmed.
        </p>
      </div>;
  }
  return <div className="space-y-6">
      <div className="bg-dark-cardAlt border border-dark-border rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
            <Smartphone className="text-green-500" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-white">M-Pesa Payment</h3>
            <p className="text-sm text-text-secondary">Lipa Na M-Pesa</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              M-Pesa Phone Number
            </label>
            <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="254712345678" className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all" />
            <p className="text-xs text-text-secondary mt-1">
              Enter your M-Pesa registered phone number
            </p>
          </div>

          <div className="bg-dark-bg rounded-xl p-4 border border-dark-border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-text-secondary">Amount to Pay:</span>
              <span className="text-2xl font-bold text-primary-cyan">
                {amount}
              </span>
            </div>
            <p className="text-xs text-text-secondary">
              You will receive an M-Pesa prompt on your phone
            </p>
          </div>

          <button onClick={handlePay} disabled={!phoneNumber || isProcessing} className="w-full py-4 rounded-full bg-green-500 text-white font-bold hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
            {isProcessing ? <>
                <Loader className="animate-spin" size={20} />
                Processing Payment...
              </> : <>
                <Smartphone size={20} />
                Send M-Pesa Prompt
              </>}
          </button>
        </div>
      </div>

      {isProcessing && <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
          <p className="text-yellow-500 text-sm">
            <strong>Action Required:</strong> Check your phone for the M-Pesa
            prompt and enter your PIN to complete the payment.
          </p>
        </div>}
    </div>;
}