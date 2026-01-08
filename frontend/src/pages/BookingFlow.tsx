import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, FileText, Wallet, Users, Rocket, Award, Calendar as CalendarIcon } from 'lucide-react';
import { BookingSteps } from '../components/BookingSteps';
import { ContractDocument } from '../components/ContractDocument';
import { PaymentSelector } from '../components/PaymentSelector';
import { MpesaPayment } from '../components/MpesaPayment';
import { CardPayment } from '../components/CardPayment';
import { apiService } from '../services/api';
const steps = ['Contract', 'Payment', 'Onboarding', 'Invoice', 'Complete'];
export function BookingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await apiService.getServices();
        setServices(servicesData);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    preferredDate: '',
    signature: '',
    paymentMethod: null as 'mpesa' | 'card' | null
  });
  const selectedService = services.find(s => s.title === formData.service);
  const depositAmount = selectedService ? `KSH ${(parseInt(selectedService.price.replace(/[^0-9]/g, '')) * 0.3).toLocaleString()}` : 'KSH 0';
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    }
  };
  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };
  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.signature && formData.name && formData.email && formData.service;
      case 1:
        return formData.paymentMethod !== null;
      default:
        return true;
    }
  };
  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0
    })
  };
  return <div className="min-h-screen bg-dark-bg text-text-primary">
      {/* Header */}
      <header className="border-b border-dark-border bg-dark-cardAlt/50 backdrop-blur-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src="/siblore-logo.svg" alt="Siblore" className="w-8 h-8" />
          </Link>
          <Link to="/" className="text-text-secondary hover:text-white transition-colors text-sm flex items-center gap-2">
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>
      </header>

      <main className="py-8 md:py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <BookingSteps currentStep={currentStep} steps={steps} />

          <div className="bg-dark-cardAlt border border-dark-border rounded-2xl p-6 md:p-12 min-h-[600px] flex flex-col mt-8 shadow-2xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key={currentStep} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{
              duration: 0.4,
              ease: 'easeInOut'
            }} className="flex-1">
                {/* Step 1: Contract */}
                {currentStep === 0 && <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 rounded-2xl bg-primary-blue/10 text-primary-blue">
                        <FileText size={32} />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                          Service Agreement
                        </h2>
                        <p className="text-text-secondary">
                          Review and sign the contract to proceed
                        </p>
                      </div>
                    </div>

                    {/* Client Info Form */}
                    <div className="bg-dark-bg border border-dark-border rounded-xl p-6 space-y-4">
                      <h3 className="font-bold text-white mb-4">
                        Client Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-2">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input type="text" value={formData.name} onChange={e => setFormData({
                        ...formData,
                        name: e.target.value
                      })} className="w-full px-4 py-3 rounded-xl bg-dark-cardAlt border border-dark-border text-white focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition-all" placeholder="John Doe" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-2">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input type="email" value={formData.email} onChange={e => setFormData({
                        ...formData,
                        email: e.target.value
                      })} className="w-full px-4 py-3 rounded-xl bg-dark-cardAlt border border-dark-border text-white focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition-all" placeholder="john@example.com" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-2">
                            Phone
                          </label>
                          <input type="tel" value={formData.phone} onChange={e => setFormData({
                        ...formData,
                        phone: e.target.value
                      })} className="w-full px-4 py-3 rounded-xl bg-dark-cardAlt border border-dark-border text-white focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition-all" placeholder="+254 712 345 678" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-2">
                            Service <span className="text-red-500">*</span>
                          </label>
                          <select value={formData.service} onChange={e => setFormData({
                        ...formData,
                        service: e.target.value
                      })} className="w-full px-4 py-3 rounded-xl bg-dark-cardAlt border border-dark-border text-white focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition-all" required>
                            <option value="">Select service...</option>
                            {loading ? (
                              <option disabled>Loading services...</option>
                            ) : services.length === 0 ? (
                              <option disabled>No services available</option>
                            ) : (
                              services.map(s => <option key={s._id} value={s.title}>
                                {s.title} - KSH {s.price}
                              </option>)
                            )}
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-text-secondary mb-2">
                            Preferred Start Date
                          </label>
                          <div className="relative">
                            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" size={18} />
                            <input type="date" value={formData.preferredDate} onChange={e => setFormData({
                          ...formData,
                          preferredDate: e.target.value
                        })} min={getMinDate()} className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-cardAlt border border-dark-border text-white focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition-all" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <ContractDocument clientName={formData.name} serviceName={formData.service} amount={selectedService?.price || 'TBD'} signature={formData.signature} onSign={sig => setFormData({
                  ...formData,
                  signature: sig
                })} />
                  </div>}

                {/* Step 2: Payment Selection & Processing */}
                {currentStep === 1 && <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 rounded-2xl bg-primary-cyan/10 text-primary-cyan">
                        <Wallet size={32} />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                          Payment
                        </h2>
                        <p className="text-text-secondary">
                          30% deposit required to start the project
                        </p>
                      </div>
                    </div>

                    <div className="bg-primary-blue/10 border border-primary-blue/20 rounded-xl p-4 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-text-secondary">
                            Deposit Amount (30%)
                          </p>
                          <p className="text-2xl font-bold text-primary-cyan">
                            {depositAmount}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-text-secondary">
                            Total Project Cost
                          </p>
                          <p className="text-lg font-bold text-white">
                            {selectedService?.price}
                          </p>
                        </div>
                      </div>
                    </div>

                    {!formData.paymentMethod ? <PaymentSelector selectedMethod={formData.paymentMethod} onSelect={method => setFormData({
                  ...formData,
                  paymentMethod: method
                })} /> : formData.paymentMethod === 'mpesa' ? <MpesaPayment amount={depositAmount} onComplete={nextStep} /> : <CardPayment amount={depositAmount} onComplete={nextStep} />}
                  </div>}

                {/* Step 3: Welcome & Onboarding */}
                {currentStep === 2 && <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 rounded-2xl bg-success/10 text-success">
                        <Users size={32} />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                          Welcome & Onboarding
                        </h2>
                        <p className="text-text-secondary">
                          Clear alignment from day one
                        </p>
                      </div>
                    </div>

                    <div className="bg-dark-bg border border-dark-border rounded-2xl p-6 space-y-6">
                      <section>
                        <h3 className="text-xl font-bold text-white mb-4">
                          What You'll Receive:
                        </h3>
                        <ul className="space-y-3">
                          {['Welcome Document with project overview', 'Communication Channels (Email, WhatsApp, Slack)', 'Tools & Access Setup (Design files, dashboards)', 'Timeline & Milestone Breakdown', 'Dedicated project manager contact'].map((item, i) => <li key={i} className="flex items-start gap-3 text-text-secondary">
                              <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>)}
                        </ul>
                      </section>

                      <section>
                        <h3 className="text-xl font-bold text-white mb-4">
                          What We Focus On:
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {['Strategy-first approach', 'User-centered design', 'Transparent communication', 'Data-driven decisions'].map((item, i) => <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-dark-cardAlt border border-dark-border">
                              <div className="w-2 h-2 rounded-full bg-primary-cyan" />
                              <span className="text-white">{item}</span>
                            </div>)}
                        </div>
                      </section>
                    </div>
                  </div>}

                {/* Step 4: Invoice */}
                {currentStep === 3 && <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 rounded-2xl bg-primary-blue/10 text-primary-blue">
                        <FileText size={32} />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                          Invoice Summary
                        </h2>
                        <p className="text-text-secondary">
                          Payment breakdown and schedule
                        </p>
                      </div>
                    </div>

                    <div className="bg-dark-bg border border-dark-border rounded-2xl p-8 space-y-6">
                      <div className="flex justify-between items-start pb-4 border-b border-dark-border">
                        <div>
                          <p className="text-text-secondary text-sm mb-1">
                            Invoice To:
                          </p>
                          <p className="text-white font-bold">
                            {formData.name}
                          </p>
                          <p className="text-text-secondary text-sm">
                            {formData.email}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-text-secondary text-sm mb-1">
                            Invoice Date:
                          </p>
                          <p className="text-white font-bold">
                            {new Date().toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-white mb-4">
                          Services Rendered:
                        </h3>
                        <div className="bg-dark-cardAlt rounded-xl p-4 mb-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-bold text-white">
                                {formData.service}
                              </p>
                              <p className="text-sm text-text-secondary">
                                Delivery: {selectedService?.delivery}
                              </p>
                            </div>
                            <p className="text-2xl font-bold text-primary-cyan">
                              {selectedService?.price}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 pt-4 border-t border-dark-border">
                        <div className="flex justify-between text-text-secondary">
                          <span>Deposit Paid (30%):</span>
                          <span className="text-success font-medium">
                            {depositAmount}
                          </span>
                        </div>
                        <div className="flex justify-between text-text-secondary">
                          <span>Mid-Project (40%):</span>
                          <span>
                            KSH{' '}
                            {selectedService ? (parseInt(selectedService.price.replace(/[^0-9]/g, '')) * 0.4).toLocaleString() : 0}
                          </span>
                        </div>
                        <div className="flex justify-between text-text-secondary">
                          <span>Final Payment (30%):</span>
                          <span>
                            KSH{' '}
                            {selectedService ? (parseInt(selectedService.price.replace(/[^0-9]/g, '')) * 0.3).toLocaleString() : 0}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-dark-border">
                          <span className="text-lg font-bold text-white">
                            Total Project Cost:
                          </span>
                          <span className="text-3xl font-bold text-primary-cyan">
                            {selectedService?.price}
                          </span>
                        </div>
                      </div>

                      <div className="bg-primary-blue/10 border border-primary-blue/20 rounded-xl p-4">
                        <p className="text-sm text-primary-cyan">
                          <strong>Note:</strong> Work continues as per the
                          agreed payment schedule. Invoices will be sent before
                          each milestone payment is due.
                        </p>
                      </div>
                    </div>
                  </div>}

                {/* Step 5: Complete */}
                {currentStep === 4 && <div className="text-center py-12">
                    <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Award className="text-success w-12 h-12" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                      All Set!
                    </h2>
                    <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                      Your project is now in motion. Our team will reach out
                      within 24 hours to kick off the work.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
                      <div className="bg-dark-bg border border-dark-border rounded-xl p-6">
                        <Rocket className="w-8 h-8 text-primary-blue mx-auto mb-3" />
                        <h4 className="font-bold text-white mb-2">
                          Execution & Delivery
                        </h4>
                        <p className="text-sm text-text-secondary">
                          Regular updates, review cycles, and quality assurance
                        </p>
                      </div>
                      <div className="bg-dark-bg border border-dark-border rounded-xl p-6">
                        <Users className="w-8 h-8 text-primary-cyan mx-auto mb-3" />
                        <h4 className="font-bold text-white mb-2">
                          Dedicated Support
                        </h4>
                        <p className="text-sm text-text-secondary">
                          Direct access to your project team
                        </p>
                      </div>
                      <div className="bg-dark-bg border border-dark-border rounded-xl p-6">
                        <Award className="w-8 h-8 text-success mx-auto mb-3" />
                        <h4 className="font-bold text-white mb-2">
                          Long-term Partnership
                        </h4>
                        <p className="text-sm text-text-secondary">
                          Post-delivery support and growth
                        </p>
                      </div>
                    </div>

                    <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary-blue text-white font-bold hover:bg-primary-hover transition-all shadow-lg shadow-primary-blue/20">
                      Return to Home
                      <ArrowRight size={20} />
                    </Link>
                  </div>}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep < 4 && <div className="flex justify-between mt-8 pt-6 border-t border-dark-border">
                <button onClick={prevStep} disabled={currentStep === 0} className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}>
                  <ArrowLeft size={20} />
                  <span className="hidden sm:inline">Back</span>
                </button>

                <button onClick={nextStep} disabled={!canProceed()} className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all ${!canProceed() ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-primary-blue text-white hover:bg-primary-hover shadow-lg shadow-primary-blue/20'}`}>
                  {currentStep === 1 && formData.paymentMethod ? 'Processing...' : 'Next Step'}
                  <ArrowRight size={20} />
                </button>
              </div>}
          </div>
        </div>
      </main>
    </div>;
}