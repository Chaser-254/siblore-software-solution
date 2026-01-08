import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Mail, Phone, CheckCircle } from 'lucide-react';
import { apiService } from '../services/api';
interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: string;
}
export function BookingModal({
  isOpen,
  onClose,
  selectedService
}: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    notes: '',
    service: selectedService || ''
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await apiService.getServices();
        setServices(servicesData);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    if (isOpen) {
      fetchServices();
    }
  }, [isOpen]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const bookingData = {
        clientName: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        date: new Date(formData.date).toISOString(),
        notes: formData.notes,
        amount: 0 // You might want to calculate this based on the service
      };
      
      await apiService.createBooking(bookingData);
      setStep(2);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    }
  };
  if (!isOpen) return null;
  return <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        <motion.div initial={{
        opacity: 0,
        scale: 0.95,
        y: 20
      }} animate={{
        opacity: 1,
        scale: 1,
        y: 0
      }} exit={{
        opacity: 0,
        scale: 0.95,
        y: 20
      }} className="relative w-full max-w-lg bg-dark-cardAlt border border-dark-border rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-dark-border bg-dark-bg/50">
            <h2 className="text-xl font-display font-bold text-white">
              {step === 1 ? 'Book Service' : 'Booking Confirmed'}
            </h2>
            <button onClick={onClose} className="p-2 text-text-secondary hover:text-white hover:bg-white/5 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {step === 1 ? <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Service
                  </label>
                  <select value={formData.service} onChange={e => setFormData({
                    ...formData,
                    service: e.target.value
                  })} className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all" required>
                    <option value="">Select a service...</option>
                    {services.map(service => (
                      <option key={service._id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                      <input type="text" value={formData.name} onChange={e => setFormData({
                    ...formData,
                    name: e.target.value
                  })} className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all" placeholder="John Doe" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Phone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                      <input type="tel" value={formData.phone} onChange={e => setFormData({
                    ...formData,
                    phone: e.target.value
                  })} className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all" placeholder="+254..." required />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                    <input type="email" value={formData.email} onChange={e => setFormData({
                  ...formData,
                  email: e.target.value
                })} className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all" placeholder="john@example.com" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                    <input type="date" value={formData.date} onChange={e => setFormData({
                  ...formData,
                  date: e.target.value
                })} className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all" required />
                  </div>
                </div>

                <button type="submit" className="w-full py-4 rounded-full bg-primary-blue text-white font-bold hover:bg-primary-hover transition-colors shadow-lg shadow-primary-blue/20 mt-4">
                  Confirm Booking
                </button>
              </form> : <div className="text-center py-8">
                <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-success w-10 h-10" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  Booking Received!
                </h3>
                <p className="text-text-secondary mb-8">
                  We've received your booking request for{' '}
                  <span className="text-primary-cyan">{formData.service}</span>.
                  Our team will contact you shortly to confirm the details.
                </p>
                <button onClick={onClose} className="px-8 py-3 rounded-full bg-dark-border text-white hover:bg-white/10 transition-colors">
                  Close
                </button>
              </div>}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>;
}