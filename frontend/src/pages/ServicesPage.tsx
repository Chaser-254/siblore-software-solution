import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ServiceCard } from '../components/ServiceCard';
import { BookingModal } from '../components/BookingModal';
import { apiService } from '../services/api';

interface Service {
  _id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  image: string;
  category: string;
  isActive: boolean;
  delivery: string;
}

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await apiService.getServices();
      setServices(response);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };
  return <div className="min-h-screen bg-dark-bg text-text-primary">
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            All Services
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your business needs.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-dark-card border border-dark-border rounded-xl p-6 animate-pulse">
                <div className="h-4 bg-dark-border rounded mb-4"></div>
                <div className="h-8 bg-dark-border rounded mb-2"></div>
                <div className="h-3 bg-dark-border rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-secondary text-lg mb-4">No services available yet.</p>
            <p className="text-text-secondary text-sm">
              Services will be available soon. Check back later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => <ServiceCard key={service._id} {...service} index={index} onBook={() => handleBook(service.title)} />)}
          </div>
        )}
      </main>

      <Footer />
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedService={selectedService} />
    </div>;
}