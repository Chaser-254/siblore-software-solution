import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Calendar, MapPin, Clock, Users, Ticket, Star, Share2, Heart, ArrowLeft, Music, Camera, Gamepad2, Palette, CreditCard, User, Mail, Phone } from 'lucide-react';
import { apiService } from '../services/api';

interface Event {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  price: number;
  image: string;
  category: 'Concerts' | 'Workshops' | 'Gaming' | 'Arts & Culture';
  attendees: number;
  maxAttendees: number;
  description: string;
  rating: number;
  organizer: string;
  organizerEmail: string;
  organizerPhone: string;
  tags: string[];
  gallery: string[];
  isActive: boolean;
}

const categoryIcons = {
  'Concerts': Music,
  'Workshops': Camera,
  'Gaming': Gamepad2,
  'Arts & Culture': Palette
};

export function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
    if (id) {
      fetchEvent(id);
    }
  }, [id]);

  const fetchEvent = async (eventId: string) => {
    try {
      setLoading(true);
      const response = await apiService.getEvent(eventId);
      setEvent(response);
    } catch (error) {
      console.error('Error fetching event:', error);
      setEvent(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg text-text-primary">
        <Navbar />
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-dark-border rounded w-1/4"></div>
            <div className="aspect-video bg-dark-border rounded-xl"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-8 bg-dark-border rounded w-3/4"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-dark-border rounded"></div>
                  <div className="h-4 bg-dark-border rounded w-5/6"></div>
                </div>
              </div>
              <div className="bg-dark-card border border-dark-border rounded-xl p-6 h-96"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-dark-bg text-text-primary">
        <Navbar />
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
          <p className="text-text-secondary mb-8">The event you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/events/listing"
            className="px-6 py-3 bg-primary-cyan text-dark-bg rounded-lg font-medium hover:bg-primary-blue transition-all"
          >
            Browse Events
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = categoryIcons[event.category];
  const availableTickets = event.maxAttendees - event.attendees;
  const totalPrice = event.price * ticketQuantity;

  const handlePurchase = () => {
    if (formData.name && formData.email && formData.cardNumber) {
      alert(`Tickets purchased successfully! ${ticketQuantity} ticket(s) for ${event.title}`);
      setShowPaymentForm(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary">
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/events/listing"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary-cyan transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Events
        </Link>

        {/* Event Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="aspect-video bg-dark-bg rounded-xl overflow-hidden mb-6">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Handle broken image links
                  e.currentTarget.src = '/placeholder-event.jpg';
                }}
              />
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-primary-cyan text-dark-bg rounded-full text-sm font-semibold">
                <Icon className="w-4 h-4" />
                {event.category}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{event.rating}</span>
                <span className="text-text-secondary">({event.attendees} reviews)</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 text-text-secondary">
                <Calendar className="w-5 h-5 text-primary-cyan" />
                <span>{new Date(event.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary">
                <Clock className="w-5 h-5 text-primary-cyan" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary">
                <MapPin className="w-5 h-5 text-primary-cyan" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary">
                <Users className="w-5 h-5 text-primary-cyan" />
                <span>{event.attendees}/{event.maxAttendees} attending</span>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isLiked 
                    ? 'bg-red-500 text-white' 
                    : 'bg-dark-card text-text-secondary hover:text-red-400'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                {isLiked ? 'Liked' : 'Like'}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-dark-card text-text-secondary rounded-lg font-medium hover:text-primary-cyan transition-all">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>

            {/* Tags */}
            {event.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {event.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-dark-border text-text-secondary rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">About Event</h2>
              <p className="text-text-secondary leading-relaxed">{event.description}</p>
            </div>

            {/* Gallery */}
            {event.gallery.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                <div className="grid grid-cols-3 gap-4">
                  {event.gallery.map((image, index) => (
                    <div key={index} className="aspect-square bg-dark-bg rounded-lg overflow-hidden">
                      <img 
                        src={image} 
                        alt={`${event.title} ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-event.jpg';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Organizer Info */}
            <div className="bg-dark-card border border-dark-border rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Organizer</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-primary-cyan" />
                  <span className="font-semibold">{event.organizer}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary-cyan" />
                  <span>{event.organizerEmail}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary-cyan" />
                  <span>{event.organizerPhone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Purchase Card */}
          <div className="lg:col-span-1">
            <div className="bg-dark-card border border-dark-border rounded-xl p-6 sticky top-32">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Tickets</h3>
                <span className="text-3xl font-bold text-primary-cyan">${event.price}</span>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between text-sm text-text-secondary mb-2">
                  <span>Available Tickets</span>
                  <span className="text-primary-cyan font-semibold">{availableTickets} left</span>
                </div>
                <div className="w-full bg-dark-border rounded-full h-2">
                  <div 
                    className="bg-primary-cyan h-2 rounded-full transition-all"
                    style={{ width: `${(availableTickets / event.maxAttendees) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                    className="w-10 h-10 bg-dark-border rounded-lg flex items-center justify-center hover:bg-primary-cyan hover:text-dark-bg transition-all"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">{ticketQuantity}</span>
                  <button 
                    onClick={() => setTicketQuantity(Math.min(availableTickets, ticketQuantity + 1))}
                    className="w-10 h-10 bg-dark-border rounded-lg flex items-center justify-center hover:bg-primary-cyan hover:text-dark-bg transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="border-t border-dark-border pt-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-text-secondary">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-text-secondary">Service Fee</span>
                  <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary-cyan">${(totalPrice * 1.1).toFixed(2)}</span>
                </div>
              </div>

              {!showPaymentForm ? (
                <button 
                  onClick={() => setShowPaymentForm(true)}
                  className="w-full py-3 bg-primary-cyan text-dark-bg rounded-lg font-semibold hover:bg-primary-blue transition-all"
                  disabled={availableTickets === 0}
                >
                  {availableTickets === 0 ? 'Sold Out' : 'Purchase Tickets'}
                </button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                        className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CVV</label>
                      <input
                        type="text"
                        value={formData.cvv}
                        onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                        className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={handlePurchase}
                      className="flex-1 py-3 bg-primary-cyan text-dark-bg rounded-lg font-semibold hover:bg-primary-blue transition-all"
                    >
                      Complete Purchase
                    </button>
                    <button 
                      onClick={() => setShowPaymentForm(false)}
                      className="px-6 py-3 bg-dark-border text-text-secondary rounded-lg font-semibold hover:text-primary-cyan transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
