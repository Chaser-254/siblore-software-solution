import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Filter, Calendar, MapPin, Users, Ticket, Star, Eye, EyeOff } from 'lucide-react';
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
  createdAt: string;
  updatedAt: string;
}

interface EventFormData {
  title: string;
  date: string;
  time: string;
  location: string;
  price: string;
  image: string;
  imageFile?: File;
  category: 'Concerts' | 'Workshops' | 'Gaming' | 'Arts & Culture';
  maxAttendees: string;
  description: string;
  rating: string;
  organizer: string;
  organizerEmail: string;
  organizerPhone: string;
  tags: string;
  gallery: string;
  isActive: boolean;
}

export function AdminEventManager() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Concerts' | 'Workshops' | 'Gaming' | 'Arts & Culture'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    date: '',
    time: '',
    location: '',
    price: '',
    image: '',
    category: 'Concerts',
    maxAttendees: '',
    description: '',
    rating: '0',
    organizer: '',
    organizerEmail: '',
    organizerPhone: '',
    tags: '',
    gallery: '',
    isActive: true
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submissionData = new FormData();
      
      // Append all form fields
      submissionData.append('title', formData.title);
      submissionData.append('date', formData.date);
      submissionData.append('time', formData.time);
      submissionData.append('location', formData.location);
      submissionData.append('price', formData.price);
      submissionData.append('category', formData.category);
      submissionData.append('maxAttendees', formData.maxAttendees);
      submissionData.append('description', formData.description);
      submissionData.append('rating', formData.rating);
      submissionData.append('organizer', formData.organizer);
      submissionData.append('organizerEmail', formData.organizerEmail);
      submissionData.append('organizerPhone', formData.organizerPhone);
      submissionData.append('tags', formData.tags);
      submissionData.append('gallery', formData.gallery);
      submissionData.append('isActive', formData.isActive.toString());
      
      // Append image file if exists
      if (formData.imageFile) {
        submissionData.append('image', formData.imageFile);
      } else if (formData.image) {
        submissionData.append('image', formData.image);
      }

      if (editingEvent) {
        const response = await apiService.updateEvent(editingEvent._id, submissionData);
        setEvents(events.map(e => 
          e._id === editingEvent._id 
            ? { ...e, ...response }
            : e
        ));
      } else {
        const response = await apiService.createEvent(submissionData);
        setEvents([...events, response]);
      }

      resetForm();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await apiService.deleteEvent(id);
        setEvents(events.filter(e => e._id !== id));
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      price: event.price.toString(),
      image: event.image,
      category: event.category,
      maxAttendees: event.maxAttendees.toString(),
      description: event.description,
      rating: event.rating.toString(),
      organizer: event.organizer,
      organizerEmail: event.organizerEmail,
      organizerPhone: event.organizerPhone,
      tags: event.tags.join(', '),
      gallery: event.gallery.join(', '),
      isActive: event.isActive
    });
    setShowAddModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      price: '',
      image: '',
      category: 'Concerts',
      maxAttendees: '',
      description: '',
      rating: '0',
      organizer: '',
      organizerEmail: '',
      organizerPhone: '',
      tags: '',
      gallery: '',
      isActive: true
    });
    setEditingEvent(null);
    setShowAddModal(false);
  };

  const filteredEvents = events
    .filter(event => selectedCategory === 'all' || event.category === selectedCategory)
    .filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const EventModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-dark-card border border-dark-border rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-6">
            {editingEvent ? 'Edit Event' : 'Add New Event'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Event Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                  className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
                >
                  <option value="Concerts">Concerts</option>
                  <option value="Workshops">Workshops</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Arts & Culture">Arts & Culture</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Time</label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Max Attendees</label>
                <input
                  type="number"
                  required
                  value={formData.maxAttendees}
                  onChange={(e) => setFormData({...formData, maxAttendees: e.target.value})}
                  className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Ticket Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Rating (0-5)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  required
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: e.target.value})}
                  className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Event Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData({...formData, imageFile: file, image: file.name});
                  }
                }}
                className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
                required
              />
              {formData.image && !formData.imageFile && (
                <p className="mt-2 text-sm text-text-secondary">Current: {formData.image}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Organizer Name</label>
                <input
                  type="text"
                  required
                  value={formData.organizer}
                  onChange={(e) => setFormData({...formData, organizer: e.target.value})}
                  className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Organizer Email</label>
                <input
                  type="email"
                  required
                  value={formData.organizerEmail}
                  onChange={(e) => setFormData({...formData, organizerEmail: e.target.value})}
                  className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Organizer Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.organizerPhone}
                  onChange={(e) => setFormData({...formData, organizerPhone: e.target.value})}
                  className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                placeholder="music, festival, outdoor"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Gallery URLs (comma-separated)</label>
              <input
                type="text"
                placeholder="image1.jpg, image2.jpg, image3.jpg"
                value={formData.gallery}
                onChange={(e) => setFormData({...formData, gallery: e.target.value})}
                className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                className="w-4 h-4 text-primary-cyan bg-dark-bg border-dark-border rounded focus:ring-primary-cyan"
              />
              <label htmlFor="isActive" className="text-sm font-medium">
                Event is Active
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 py-2 bg-primary-cyan text-dark-bg rounded-lg font-semibold hover:bg-primary-blue transition-all"
              >
                {editingEvent ? 'Update Event' : 'Add Event'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-dark-border text-text-secondary rounded-lg font-semibold hover:text-primary-cyan transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Event Management</h2>
          <p className="text-text-secondary">Manage your events and ticket sales</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-cyan text-dark-bg rounded-lg font-semibold hover:bg-primary-blue transition-all"
        >
          <Plus size={20} />
          Add Event
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-dark-card border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as any)}
          className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
        >
          <option value="all">All Categories</option>
          <option value="Concerts">Concerts</option>
          <option value="Workshops">Workshops</option>
          <option value="Gaming">Gaming</option>
          <option value="Arts & Culture">Arts & Culture</option>
        </select>
      </div>

      {/* Events Table */}
      <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary-cyan border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading events...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="p-8 text-center">
            <Calendar className="w-16 h-16 text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary mb-4">No events found</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-primary-cyan text-dark-bg rounded-lg font-semibold hover:bg-primary-blue transition-all"
            >
              Create Your First Event
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-bg border-b border-dark-border">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Event</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Attendees</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                {filteredEvents.map((event) => (
                  <tr key={event._id} className="hover:bg-dark-bg/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-white">{event.title}</p>
                          <p className="text-sm text-text-secondary">{event.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-white">{new Date(event.date).toLocaleDateString()}</p>
                        <p className="text-text-secondary">{event.time}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="w-4 h-4 text-primary-cyan" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Ticket className="w-4 h-4 text-primary-cyan" />
                        <span className="font-medium">${event.price}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Users className="w-4 h-4 text-primary-cyan" />
                        <span>{event.attendees}/{event.maxAttendees}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1 text-sm ${
                        event.isActive ? 'text-success' : 'text-red-400'
                      }`}>
                        {event.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        {event.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(event)}
                          className="p-2 text-text-secondary hover:text-primary-cyan transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(event._id)}
                          className="p-2 text-text-secondary hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAddModal && <EventModal />}
    </div>
  );
}
