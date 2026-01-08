import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, Search, Filter, Briefcase, DollarSign, Clock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { apiService } from '../services/api';

interface Service {
  _id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  image: string;
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ServiceFormData {
  _id?: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  features: string;
  image: string;
  imageFile?: File;
  category: string;
  isActive: boolean;
}

export function AdminServiceManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<ServiceFormData | null>(null);

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

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        await apiService.deleteService(id);
        setServices(services.filter(s => s._id !== id));
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const handleEdit = (service: Service) => {
    setCurrentService({
      ...service,
      price: service.price.toString(),
      features: service.features.join(', ')
    });
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentService({
      title: '',
      description: '',
      price: '',
      duration: '',
      features: '',
      image: '',
      category: 'Web Development',
      isActive: true
    });
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentService) return;
    
    try {
      const formData = new FormData();
      
      // Append all form fields
      formData.append('title', currentService.title);
      formData.append('description', currentService.description);
      formData.append('price', currentService.price);
      formData.append('duration', currentService.duration);
      formData.append('features', currentService.features);
      formData.append('category', currentService.category);
      formData.append('isActive', currentService.isActive.toString());
      
      // Append image file if exists
      if (currentService.imageFile) {
        formData.append('image', currentService.imageFile);
      } else if (currentService.image) {
        formData.append('image', currentService.image);
      }

      if (currentService && currentService._id && services.find(s => s._id === currentService._id)) {
        const response = await apiService.updateService(currentService._id, formData);
        setServices(services.map(s => s._id === currentService._id ? { ...s, ...response } : s));
      } else {
        const response = await apiService.createService(formData);
        setServices([...services, response]);
      }
      
      setIsEditing(false);
      setCurrentService(null);
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  if (isEditing) {
    return <div className="bg-dark-cardAlt border border-dark-border rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-display font-bold text-white">
          {currentService && services.find(s => s._id === currentService._id) ? 'Edit Service' : 'Add New Service'}
        </h2>
        <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <X size={20} className="text-text-secondary" />
        </button>
      </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-text-secondary mb-2">
                Title *
              </label>
              <input type="text" value={currentService?.title || ''} onChange={e => setCurrentService(currentService ? {
                ...currentService,
                title: e.target.value
              } : null)} className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all" required />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-2">
                Category *
              </label>
              <select value={currentService?.category || 'Web Development'} onChange={e => setCurrentService(currentService ? {
                ...currentService,
                category: e.target.value
              } : null)} className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all">
                <option value="Web Development">Web Development</option>
                <option value="Mobile Apps">Mobile Apps</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Consulting">Consulting</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-text-secondary mb-2">
                Price (KSH) *
              </label>
              <input type="text" value={currentService?.price || ''} onChange={e => setCurrentService(currentService ? {
                ...currentService,
                price: e.target.value
              } : null)} className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all" placeholder="KSH 5,000" required />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-2">
                Delivery Time *
              </label>
              <input type="text" value={currentService?.duration || ''} onChange={e => setCurrentService(currentService ? {
                ...currentService,
                duration: e.target.value
              } : null)} className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all" placeholder="2-3 days" required />
            </div>
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-2">
              Service Image *
            </label>
            <input 
              type="file" 
              accept="image/*"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  setCurrentService(currentService ? {
                    ...currentService,
                    imageFile: file,
                    image: file.name
                  } : null);
                }
              }} 
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all" 
              required 
            />
            {currentService?.image && !currentService?.imageFile && (
              <p className="mt-2 text-sm text-text-secondary">Current: {currentService.image}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-2">
              Description *
            </label>
            <textarea rows={4} value={currentService?.description || ''} onChange={e => setCurrentService(currentService ? {
              ...currentService,
              description: e.target.value
            } : null)} className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all resize-none" required />
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-2">
              Features (comma-separated)
            </label>
            <input type="text" value={currentService?.features || ''} onChange={e => setCurrentService(currentService ? {
              ...currentService,
              features: e.target.value
            } : null)} className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all" placeholder="Responsive design, SEO optimization, etc." />
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="isActive" checked={currentService?.isActive || false} onChange={e => setCurrentService(currentService ? {
              ...currentService,
              isActive: e.target.checked
            } : null)} className="w-4 h-4 text-primary-cyan bg-dark-bg border-dark-border rounded focus:ring-primary-cyan" />
            <label htmlFor="isActive" className="text-sm text-text-secondary">
              Service is Active
            </label>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 rounded-xl border border-dark-border text-text-secondary hover:text-white hover:border-primary-blue transition-all">
              Cancel
            </button>
            <button type="submit" className="px-6 py-3 rounded-xl bg-primary-blue text-white font-bold hover:bg-primary-hover transition-all flex items-center gap-2 shadow-lg shadow-primary-blue/20">
              <Save size={18} />
              Save Service
            </button>
          </div>
        </form>
      </div>;
  }

  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Service Management</h2>
          <p className="text-text-secondary">Manage your service offerings</p>
        </div>
        <button onClick={handleAddNew} className="px-6 py-3 bg-primary-blue text-white rounded-xl flex items-center gap-2 hover:bg-primary-hover transition-all font-bold shadow-lg shadow-primary-blue/20">
          <Plus size={18} />
          Add Service
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-dark-card border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
        >
          <option value="all">All Categories</option>
          <option value="Web Development">Web Development</option>
          <option value="Mobile Apps">Mobile Apps</option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Consulting">Consulting</option>
        </select>
      </div>

      {/* Services Table */}
      <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary-cyan border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading services...</p>
          </div>
        ) : services.filter(service => 
            selectedCategory === 'all' || service.category === selectedCategory
          ).filter(service => 
            service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase())
          ).length === 0 ? (
          <div className="p-8 text-center">
            <Briefcase className="w-16 h-16 text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary mb-4">No services found</p>
            <button onClick={handleAddNew} className="px-4 py-2 bg-primary-blue text-white rounded-lg font-semibold hover:bg-primary-hover transition-all">
              Add Your First Service
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-bg border-b border-dark-border">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Service</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                {services.filter(service => 
                  selectedCategory === 'all' || service.category === selectedCategory
                ).filter(service => 
                  service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  service.description.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((service, index) => (
                  <motion.tr key={service._id} initial={{
                    opacity: 0,
                    y: 10
                  }} animate={{
                    opacity: 1,
                    y: 0
                  }} transition={{
                    delay: index * 0.05
                  }} className="hover:bg-dark-bg/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-10 h-10 rounded-lg object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/80x80/0EA5E9/ffffff?text=' + service.title.charAt(0);
                          }}
                        />
                        <div>
                          <p className="font-medium text-white">{service.title}</p>
                          <p className="text-sm text-text-secondary line-clamp-1">{service.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400">
                        {service.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-primary-cyan" />
                        <span className="font-medium">KSH {service.price}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="w-4 h-4 text-primary-cyan" />
                        {service.duration}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1 text-sm ${
                        service.isActive ? 'text-success' : 'text-red-400'
                      }`}>
                        {service.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        {service.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEdit(service)} className="p-2 text-text-secondary hover:text-primary-cyan transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(service._id)} className="p-2 text-text-secondary hover:text-red-400 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>;
}