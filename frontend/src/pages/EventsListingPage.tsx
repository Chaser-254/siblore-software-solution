import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Calendar, MapPin, Clock, Users, Ticket, Search, Filter, Music, Camera, Gamepad2, Palette, Star } from 'lucide-react';
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

export function EventsListingPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'rating' | 'popularity'>('date');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await apiService.getEvents();
      setEvents(response);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events
    .filter(event => event.isActive)
    .filter(event => selectedCategory === 'all' || event.category === selectedCategory)
    .filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(event => event.price >= priceRange[0] && event.price <= priceRange[1])
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'popularity') return b.attendees - a.attendees;
      return 0;
    });

  const categoryIcons = {
    'Concerts': Music,
    'Workshops': Camera,
    'Gaming': Gamepad2,
    'Arts & Culture': Palette
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
        <div className="absolute top-4 left-4 px-3 py-1 bg-primary-cyan text-dark-bg rounded-full text-sm font-semibold flex items-center gap-2">
          {(() => {
            const Icon = categoryIcons[event.category];
            return <><Icon className="w-3 h-3" />{event.category}</>;
          })()}
        </div>
        <div className="absolute top-4 right-4 px-3 py-1 bg-dark-bg/90 backdrop-blur rounded-full text-sm font-semibold text-primary-cyan">
          ${event.price}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-text-primary group-hover:text-primary-cyan transition-colors line-clamp-1">
            {event.title}
          </h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-text-secondary">{event.rating}</span>
          </div>
        </div>
        
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
            {event.attendees}/{event.maxAttendees} attending
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">
            by <span className="text-primary-cyan">{event.organizer}</span>
          </span>
          <Link 
            to={`/events/${event._id}`}
            className="px-4 py-2 bg-primary-cyan text-dark-bg rounded-lg font-medium hover:bg-primary-blue transition-all"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary">
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            All Events
          </h1>
          <p className="text-text-secondary text-lg">
            Discover and book tickets for amazing events
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
            <input
              type="text"
              placeholder="Search events by name, location, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-dark-card border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-dark-card border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
            >
              <option value="all">All Categories</option>
              <option value="Concerts">Concerts</option>
              <option value="Workshops">Workshops</option>
              <option value="Gaming">Gaming</option>
              <option value="Arts & Culture">Arts & Culture</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'price' | 'rating' | 'popularity')}
              className="px-4 py-3 bg-dark-card border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
            >
              <option value="date">Sort by Date</option>
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
              <option value="popularity">Sort by Popularity</option>
            </select>

            {/* Min Price */}
            <input
              type="number"
              placeholder="Min Price"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="px-4 py-3 bg-dark-card border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
            />

            {/* Max Price */}
            <input
              type="number"
              placeholder="Max Price"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="px-4 py-3 bg-dark-card border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-text-secondary">
            Showing <span className="text-primary-cyan font-semibold">{filteredEvents.length}</span> events
          </p>
          <div className="flex gap-2">
            {Object.keys(categoryIcons).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === category
                    ? 'bg-primary-cyan text-dark-bg'
                    : 'bg-dark-card text-text-secondary hover:text-primary-cyan'
                }`}
              >
                {(() => {
                  const Icon = categoryIcons[category as keyof typeof categoryIcons];
                  return <Icon className="w-4 h-4" />;
                })()}
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <Ticket className="w-16 h-16 text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary text-lg mb-4">
              {searchTerm || selectedCategory !== 'all' || priceRange[0] > 0 || priceRange[1] < 200
                ? 'No events found matching your criteria.' 
                : 'No events available yet.'}
            </p>
            {events.length === 0 && !searchTerm && selectedCategory === 'all' && priceRange[0] === 0 && priceRange[1] === 200 && (
              <p className="text-text-secondary text-sm">
                Events will be available soon. Check back later!
              </p>
            )}
            <button 
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
                setPriceRange([0, 200]);
              }}
              className="mt-4 px-6 py-2 bg-primary-cyan text-dark-bg rounded-lg font-medium hover:bg-primary-blue transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
