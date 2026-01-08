import React, { useState, createElement } from 'react';
import { Download, PenTool, X } from 'lucide-react';
import { SignaturePad } from './SignaturePad';
interface ContractDocumentProps {
  clientName: string;
  serviceName: string;
  amount: string;
  onSign: (signature: string) => void;
  signature?: string;
}
export function ContractDocument({
  clientName,
  serviceName,
  amount,
  onSign,
  signature
}: ContractDocumentProps) {
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const handleSave = (signatureData: string) => {
    onSign(signatureData);
    setShowSignaturePad(false);
  };
  const handleDownload = () => {
    const contractText = document.getElementById('contract-content')?.innerText;
    const blob = new Blob([contractText || ''], {
      type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SibLore_Contract_${clientName.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return <div className="space-y-6">
      {/* Contract Document - Scrollable */}
      <div className="bg-dark-bg border-2 border-dark-border rounded-2xl overflow-hidden">
        <div id="contract-content" className="p-6 md:p-8 max-h-[500px] overflow-y-auto custom-scrollbar">
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-display font-bold text-white mb-2">
              SERVICES AGREEMENT
            </h2>
            <p className="text-text-secondary text-sm">
              SibLore Software Solutions
            </p>
          </div>

          <div className="space-y-4 text-text-secondary text-sm leading-relaxed">
            <section className="bg-dark-cardAlt p-4 rounded-xl border border-dark-border">
              <h3 className="text-white font-bold mb-3 text-base">
                1. CLIENT & PROJECT DETAILS
              </h3>
              <div className="space-y-1">
                <p>
                  Client Name:{' '}
                  <span className="text-primary-cyan font-medium">
                    {clientName || '[To be filled]'}
                  </span>
                </p>
                <p>
                  Service:{' '}
                  <span className="text-primary-cyan font-medium">
                    {serviceName || '[To be filled]'}
                  </span>
                </p>
                <p>
                  Amount:{' '}
                  <span className="text-primary-cyan font-medium">
                    {amount || '[To be filled]'}
                  </span>
                </p>
                <p>
                  Date:{' '}
                  <span className="text-primary-cyan font-medium">
                    {new Date().toLocaleDateString()}
                  </span>
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-white font-bold mb-2">
                2. SCOPE OF SERVICES
              </h3>
              <p>
                SibLore Software Solutions ("Provider") agrees to provide{' '}
                {serviceName || 'the selected'} services as specified in this
                agreement. The scope includes all deliverables outlined in the
                project proposal and any mutually agreed-upon modifications.
              </p>
            </section>

            <section>
              <h3 className="text-white font-bold mb-2">
                3. DELIVERABLES & MILESTONES
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Initial consultation and requirements gathering</li>
                <li>Design/development phase with regular updates</li>
                <li>Review and feedback cycles</li>
                <li>Final delivery and handover</li>
              </ul>
            </section>

            <section>
              <h3 className="text-white font-bold mb-2">
                4. TIMELINES & REVISION POLICY
              </h3>
              <p>
                Project timeline estimates are subject to client feedback
                turnaround times. Two rounds of revisions are included.
                Additional revisions may incur extra charges.
              </p>
            </section>

            <section>
              <h3 className="text-white font-bold mb-2">
                5. PAYMENT TERMS & SCHEDULE
              </h3>
              <p>
                Total Amount:{' '}
                <span className="text-white font-medium">{amount}</span>
                <br />
                Payment Schedule: 30% deposit to commence work, 40% mid-project,
                30% upon completion.
                <br />
                Payment Methods: M-Pesa, Bank Transfer, or Card Payment.
              </p>
            </section>

            <section>
              <h3 className="text-white font-bold mb-2">
                6. INTELLECTUAL PROPERTY
              </h3>
              <p>
                Client retains full ownership of all final deliverables upon
                full payment. Provider retains the right to showcase work in
                portfolio unless otherwise agreed.
              </p>
            </section>

            <section>
              <h3 className="text-white font-bold mb-2">7. CONFIDENTIALITY</h3>
              <p>
                Both parties agree to keep all proprietary information, trade
                secrets, and business information confidential during and after
                the project.
              </p>
            </section>

            <section>
              <h3 className="text-white font-bold mb-2">
                8. TERMINATION & DISPUTE RESOLUTION
              </h3>
              <p>
                Either party may terminate this agreement with 14 days written
                notice. Any disputes will be resolved through mediation before
                legal action.
              </p>
            </section>
          </div>

          {/* Signature Section */}
          <div className="mt-6 pt-6 border-t-2 border-dark-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-text-secondary mb-2">
                  Client Signature:
                </p>
                {signature ? <div className="border-2 border-success rounded-lg p-2 bg-white">
                    <img src={signature} alt="Signature" className="h-24 w-full object-contain" />
                  </div> : <div className="border-2 border-dashed border-yellow-500/50 rounded-lg h-24 flex items-center justify-center text-yellow-500 bg-yellow-500/5">
                    <span className="text-sm">Signature Required</span>
                  </div>}
                <p className="text-xs text-text-secondary mt-2">
                  Name: {clientName || '[To be filled]'}
                </p>
                <p className="text-xs text-text-secondary">
                  Date: {new Date().toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-text-secondary mb-2">
                  Provider Signature:
                </p>
                <div className="border-2 border-primary-blue rounded-lg p-2 bg-white">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 80'%3E%3Ctext x='10' y='50' font-family='cursive' font-size='24' fill='%23000'>SibLore%3C/text%3E%3C/svg%3E" alt="Provider Signature" className="h-24 w-full object-contain" />
                </div>
                <p className="text-xs text-text-secondary mt-2">
                  Name: SibLore Software Solutions
                </p>
                <p className="text-xs text-text-secondary">
                  Date: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={handleDownload} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-dark-cardAlt border border-dark-border text-text-secondary hover:text-white hover:border-primary-blue transition-all">
          <Download size={18} />
          <span>Download Contract</span>
        </button>

        {!signature ? <button type="button" onClick={() => setShowSignaturePad(true)} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-blue text-white hover:bg-primary-hover transition-all font-bold shadow-lg shadow-primary-blue/20">
            <PenTool size={18} />
            <span>Sign Digitally</span>
          </button> : <button type="button" onClick={() => setShowSignaturePad(true)} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-dark-cardAlt border border-dark-border text-text-secondary hover:text-white hover:border-primary-blue transition-all">
            <PenTool size={18} />
            <span>Re-sign</span>
          </button>}
      </div>

      {/* Signature Status */}
      {signature && <div className="bg-success/10 border border-success/20 rounded-xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-success font-bold text-sm">
              Contract Signed Successfully
            </p>
            <p className="text-success/80 text-xs">
              You can proceed to the next step
            </p>
          </div>
        </div>}

      {/* Signature Pad Modal */}
      {showSignaturePad && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="bg-dark-cardAlt border-2 border-primary-blue rounded-2xl p-6 max-w-2xl w-full shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Sign Contract</h3>
              <button type="button" onClick={() => setShowSignaturePad(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} className="text-text-secondary hover:text-white" />
              </button>
            </div>
            <p className="text-text-secondary text-sm mb-4">
              Draw your signature below using your mouse or touch screen
            </p>
            <SignaturePad onSave={handleSave} onClear={() => {}} />
          </div>
        </div>}
    </div>;
}