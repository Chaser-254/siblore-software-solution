import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Users, Clock, CheckCircle } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ServiceCard } from '../components/ServiceCard';
import { BookingModal } from '../components/BookingModal';
import { apiService } from '../services/api';
// import { Link } from 'react-router-dom';
export function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
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

  const handleBook = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };
  return <div className="min-h-screen bg-black text-text-primary selection:bg-primary-cyan selection:text-dark-bg">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Enhanced Background Art */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          {/* Large Blur Orbs */}
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary-blue/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary-cyan/10 rounded-full blur-[100px]" />
          
          {/* Artistic Geometric Patterns */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-primary-blue/20 rotate-45" />
          <div className="absolute top-1/3 right-1/4 w-24 h-24 border border-primary-cyan/15 rotate-12" />
          <div className="absolute bottom-1/3 left-1/3 w-40 h-40 border-2 border-primary-blue/10 -rotate-12" />
          <div className="absolute top-1/2 right-1/3 w-16 h-16 border border-primary-cyan/20 rotate-45" />
          
          {/* Complex SVG Art */}
          <svg className="absolute top-0 left-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
              <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
            
            {/* Flowing Wave Art */}
            <path d="M0,100 Q200,50 400,100 T800,100" stroke="url(#gradient1)" strokeWidth="2" fill="none" />
            <path d="M0,300 Q300,250 600,300 T1200,300" stroke="url(#gradient1)" strokeWidth="1" fill="none" />
            <path d="M0,500 Q400,450 800,500 T1600,500" stroke="url(#gradient1)" strokeWidth="2" fill="none" />
            
            {/* Artistic Circles */}
            <circle cx="100" cy="100" r="50" stroke="url(#gradient2)" strokeWidth="1" fill="none" opacity="0.3" />
            <circle cx="200" cy="200" r="30" stroke="url(#gradient1)" strokeWidth="1" fill="none" opacity="0.2" />
            <circle cx="300" cy="150" r="40" stroke="url(#gradient2)" strokeWidth="1" fill="none" opacity="0.25" />
            
            {/* Abstract Lines */}
            <line x1="0" y1="200" x2="400" y2="100" stroke="url(#gradient1)" strokeWidth="0.5" opacity="0.3" />
            <line x1="200" y1="0" x2="600" y2="300" stroke="url(#gradient2)" strokeWidth="0.5" opacity="0.3" />
            <line x1="400" y1="0" x2="800" y2="200" stroke="url(#gradient1)" strokeWidth="0.5" opacity="0.3" />
            
            {/* Triangular Art */}
            <polygon points="50,50 100,150 0,150" stroke="url(#gradient2)" strokeWidth="1" fill="none" opacity="0.2" />
            <polygon points="750,100 850,200 750,300 650,200" stroke="url(#gradient1)" strokeWidth="1" fill="none" opacity="0.15" />
          </svg>
          
          {/* Floating Artistic Elements */}
          <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-primary-blue/40 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/5 w-3 h-3 bg-primary-cyan/30 rounded-full animate-pulse delay-1000" />
          <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-primary-blue/50 rounded-full animate-pulse delay-500" />
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-primary-cyan/60 rounded-full animate-pulse delay-700" />
          <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-primary-blue/30 rounded-full animate-pulse delay-300" />
          
          {/* Additional Artistic Shapes */}
          <div className="absolute top-1/6 left-1/6 w-4 h-4 border-2 border-primary-cyan/20 rotate-45 animate-spin-slow" />
          <div className="absolute top-2/3 right-1/6 w-3 h-3 border border-primary-blue/25 rotate-12 animate-pulse" />
          <div className="absolute bottom-1/6 left-2/3 w-5 h-5 border-2 border-primary-cyan/15 -rotate-45 animate-bounce-slow" />
          
          {/* Gradient Mesh Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 via-transparent to-primary-cyan/5" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-4xl">
            <motion.h1 initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
              Design That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-primary-cyan">
                Transforms
              </span>{' '}
              <br />
              Your Brand
            </motion.h1>

            <motion.p initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="text-xl text-text-secondary mb-10 max-w-2xl leading-relaxed">
              Professional graphic design services that capture your vision and
              elevate your brand identity. From logos to full marketing
              campaigns, we bring your ideas to life.
            </motion.p>

            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.4
          }} className="flex flex-wrap gap-4">
              <button onClick={() => {
              const element = document.getElementById('services');
              element?.scrollIntoView({
                behavior: 'smooth'
              });
            }} className="px-8 py-4 rounded-full bg-primary-blue text-white font-bold text-lg hover:bg-primary-hover transition-all shadow-lg shadow-primary-blue/25 flex items-center gap-2 group">
                Explore Services
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              {/* <Link to="/contact" className="px-8 py-4 rounded-full bg-dark-cardAlt border border-dark-border text-white font-bold text-lg hover:bg-white/5 transition-all">
                Contact Us
              </Link> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Our Services
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Choose the perfect service for your needs. Transparent pricing,
              fast delivery, and professional quality.
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-primary-blue to-primary-cyan mx-auto mt-8 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading state
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-dark-card border border-dark-border rounded-2xl p-6 animate-pulse">
                  <div className="w-full h-48 bg-dark-bg rounded-xl mb-4"></div>
                  <div className="h-6 bg-dark-bg rounded mb-2"></div>
                  <div className="h-4 bg-dark-bg rounded mb-4"></div>
                  <div className="h-8 bg-dark-bg rounded"></div>
                </div>
              ))
            ) : services.length === 0 ? (
              // Empty state
              <div className="col-span-full text-center py-16">
                <div className="w-24 h-24 bg-dark-bg border-2 border-dark-border rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-4xl text-text-secondary">🚀</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">No Services Available</h3>
                <p className="text-text-secondary text-lg max-w-md mx-auto mb-8">
                  We're currently updating our service catalog. Please check back soon for amazing services tailored to your needs.
                </p>
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={() => window.location.href = '/admin/login'}
                    className="px-6 py-3 bg-primary-blue text-white rounded-xl font-semibold hover:bg-primary-hover transition-all"
                  >
                    Admin Login
                  </button>
                  <button 
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 border border-dark-border text-white rounded-xl font-semibold hover:border-primary-blue transition-all"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            ) : (
              // Services loaded
              services.map((service, index) => (
                <ServiceCard 
                  key={service._id} 
                  {...service} 
                  index={index} 
                  onBook={() => handleBook(service.title)} 
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-dark-cardAlt border-y border-dark-border relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Why Choose <br />
                <span className="text-primary-cyan">Us?</span>
              </h2>
              <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                We bring creative excellence and professional expertise to every
                project. Our design team is committed to delivering exceptional
                results that exceed expectations.
              </p>

              <div className="space-y-6">
                {[{
                title: 'Professional Quality',
                desc: 'Industry-standard tools and techniques'
              }, {
                title: 'Fast Turnaround',
                desc: 'We respect your deadlines'
              }, {
                title: 'Affordable Pricing',
                desc: 'Premium services at competitive rates'
              }].map((item, i) => <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-dark-bg border border-dark-border flex items-center justify-center shrink-0 text-primary-blue">
                      <CheckCircle />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">
                        {item.title}
                      </h4>
                      <p className="text-text-secondary">{item.desc}</p>
                    </div>
                  </div>)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[{
              label: 'Projects Completed',
              value: '50+',
              icon: Star
            }, {
              label: 'Client Satisfaction',
              value: '98%',
              icon: Users
            }, {
              label: 'Response Time',
              value: '24h',
              icon: Clock
            }, {
              label: 'Active Clients',
              value: '50+',
              icon: Users
            }].map((stat, i) => <motion.div key={i} whileHover={{
              y: -5
            }} className="bg-dark-bg border border-dark-border p-6 rounded-2xl text-center">
                  <stat.icon className="w-8 h-8 text-primary-blue mx-auto mb-4" />
                  <div className="text-3xl font-display font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-text-secondary text-sm">
                    {stat.label}
                  </div>
                </motion.div>)}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-text-secondary mb-10">
            Ready to start your project? Contact us today for a consultation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-lg">
            <a href="mailto:sibloresoftwaresolutions@proton.me" className="text-primary-cyan hover:text-white transition-colors">
              sibloresoftwaresolutions@proton.me
            </a>
            <span className="hidden sm:block text-dark-border">|</span>
            <a href="tel:+254111363870" className="text-primary-cyan hover:text-white transition-colors">
              +254 111 363 870
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedService={selectedService} />
    </div>;
}