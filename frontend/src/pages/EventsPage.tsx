import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Calendar, MapPin, Clock, Users, Ticket, Sparkles, TrendingUp, Music, Camera, Gamepad2, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  isActive: boolean;
}

const eventCategories = [
  {
    icon: Music,
    name: 'Concerts',
    description: 'Live music performances',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Camera,
    name: 'Workshops',
    description: 'Learn from industry experts',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Gamepad2,
    name: 'Gaming',
    description: 'Tournaments and gaming events',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Palette,
    name: 'Arts & Culture',
    description: 'Creative exhibitions and shows',
    color: 'from-orange-500 to-red-500'
  }
];

const stats = [
  { label: 'Events Hosted', value: '50+', icon: Calendar },
  { label: 'Happy Attendees', value: '1K+', icon: Users },
  { label: 'Tickets Sold', value: '1K+', icon: Ticket },
  { label: 'Success Rate', value: '98%', icon: TrendingUp }
];

export function EventsPage() {
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchFeaturedEvents();
  }, []);

  const fetchFeaturedEvents = async () => {
    try {
      setLoading(true);
      const response = await apiService.getFeaturedEvents();
      setFeaturedEvents(response);
    } catch (error) {
      console.error('Error fetching featured events:', error);
    } finally {
      setLoading(false);
    }
  };

  const EventCard = ({ event }: { event: Event }) => (
    <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden hover:border-primary-cyan transition-all group">
      <div className="aspect-video bg-dark-bg relative overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          onError={(e) => {
            // Handle broken image links
            e.currentTarget.src = '/placeholder-event.jpg';
          }}
        />
        <div className="absolute top-4 left-4 px-3 py-1 bg-primary-cyan text-dark-bg rounded-full text-sm font-semibold">
          {event.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary-cyan transition-colors">
          {event.title}
        </h3>
        <p className="text-text-secondary mb-4 line-clamp-2">
          {event.description}
        </p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Calendar className="w-4 h-4" />
            {new Date(event.date).toLocaleDateString('en-US', { 
              weekday: 'short', 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Clock className="w-4 h-4" />
            {event.time}
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <MapPin className="w-4 h-4" />
            {event.location}
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Users className="w-4 h-4" />
            {event.attendees} attending
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-cyan">
            ${event.price}
          </span>
          <Link 
            to={`/events/${event._id}`}
            className="px-4 py-2 bg-primary-cyan text-dark-bg rounded-lg font-medium hover:bg-primary-blue transition-all"
          >
            Get Tickets
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              {/* <Sparkles className="w-8 h-8 text-primary-cyan" /> */}
              <h1 className="text-5 md:text-7xl font-display font-bold bg-gradient-to-r from-primary-cyan to-primary-blue bg-clip-text text-transparent">
                Siblore Events
              </h1>
              {/* <Sparkles className="w-8 h-8 text-primary-cyan" /> */}
            </div>
            <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-8">
              Discover amazing events, connect with your community, and create unforgettable memories
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/events/listing"
                className="px-8 py-4 bg-primary-cyan text-dark-bg rounded-lg font-semibold hover:bg-primary-blue transition-all text-lg"
              >
                Browse Events
              </Link>
              <button className="px-8 py-4 border border-primary-cyan text-primary-cyan rounded-lg font-semibold hover:bg-primary-cyan hover:text-dark-bg transition-all text-lg">
                Host an Event
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <stat.icon className="w-6 h-6 text-primary-cyan" />
                  <span className="text-3xl font-bold text-primary-cyan">{stat.value}</span>
                </div>
                <p className="text-text-secondary">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Event Categories</h2>
            <p className="text-text-secondary text-lg">Find events that match your interests</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventCategories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className={`bg-gradient-to-br ${category.color} p-1 rounded-xl mb-4 group-hover:scale-105 transition-transform`}>
                  <div className="bg-dark-bg p-6 rounded-lg">
                    <category.icon className="w-12 h-12 text-primary-cyan mb-4" />
                    <h3 className="text-xl font-bold text-text-primary mb-2">{category.name}</h3>
                    <p className="text-text-secondary text-sm">{category.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Events</h2>
            <p className="text-text-secondary text-lg">Don't miss out on these amazing experiences</p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-dark-card border border-dark-border rounded-xl overflow-hidden animate-pulse">
                  <div className="aspect-video bg-dark-bg"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-dark-border rounded"></div>
                    <div className="h-3 bg-dark-border rounded w-3/4"></div>
                    <div className="h-6 bg-dark-border rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredEvents.length === 0 ? (
            <div className="text-center py-12">
              <Ticket className="w-16 h-16 text-text-secondary mx-auto mb-4" />
              <p className="text-text-secondary text-lg mb-4">No featured events available yet.</p>
              <p className="text-text-secondary text-sm mb-6">
                Events will be available soon. Check back later!
              </p>
              <Link 
                to="/events/listing"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-cyan text-dark-bg rounded-lg font-semibold hover:bg-primary-blue transition-all"
              >
                Browse All Events
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredEvents.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link 
                  to="/events/listing"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-primary-cyan text-primary-cyan rounded-lg font-semibold hover:bg-primary-cyan hover:text-dark-bg transition-all"
                >
                  View All Events
                  <Ticket className="w-5 h-5" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-text-secondary text-lg mb-8">
            Get notified about upcoming events and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
            />
            <button className="px-6 py-3 bg-primary-cyan text-dark-bg rounded-lg font-semibold hover:bg-primary-blue transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
