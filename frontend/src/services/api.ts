const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000';

export interface Booking {
  _id: string;
  clientName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  notes?: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalBookings: number;
  totalServices: number;
  totalEvents: number;
  totalProducts: number;
  pendingBookings: number;
  approvedBookings: number;
  rejectedBookings: number;
  totalClients: number;
  recentBookings: Booking[];
  revenueByService: Array<{
    service: string;
    revenue: number;
    count: number;
  }>;
  bookingsByMonth: Array<{
    month: string;
    count: number;
    revenue: number;
  }>;
}

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('adminToken');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('adminToken');
        throw new Error('Authentication required. Please login again.');
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  // Dashboard Statistics
  async getDashboardStats(): Promise<DashboardStats> {
    return this.request('/api/dashboard/stats');
  }

  // Bookings
  async getBookings(): Promise<Booking[]> {
    return this.request('/api/bookings');
  }

  async createBooking(bookingData: any): Promise<Booking> {
    return this.request('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async updateBookingStatus(id: string, status: string): Promise<Booking> {
    return this.request(`/api/bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async deleteBooking(id: string): Promise<{ message: string }> {
    return this.request(`/api/bookings/${id}`, {
      method: 'DELETE',
    });
  }

  // Services
  async getServices() {
    return this.request('/api/services');
  }

  async createService(serviceData: any) {
    const isFormData = serviceData instanceof FormData;
    return this.request('/api/services', {
      method: 'POST',
      body: isFormData ? serviceData : JSON.stringify(serviceData),
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
    });
  }

  async updateService(id: string, serviceData: any) {
    const isFormData = serviceData instanceof FormData;
    return this.request(`/api/services/${id}`, {
      method: 'PUT',
      body: isFormData ? serviceData : JSON.stringify(serviceData),
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
    });
  }

  async deleteService(id: string) {
    return this.request(`/api/services/${id}`, {
      method: 'DELETE',
    });
  }

  // Products
  async getProducts() {
    return this.request('/api/products');
  }

  async createProduct(productData: any) {
    const isFormData = productData instanceof FormData;
    return this.request('/api/products', {
      method: 'POST',
      body: isFormData ? productData : JSON.stringify(productData),
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
    });
  }

  async updateProduct(id: string, productData: any) {
    const isFormData = productData instanceof FormData;
    return this.request(`/api/products/${id}`, {
      method: 'PUT',
      body: isFormData ? productData : JSON.stringify(productData),
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
    });
  }

  async deleteProduct(id: string) {
    return this.request(`/api/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Events
  async getEvents() {
    return this.request('/api/events');
  }

  async getFeaturedEvents() {
    return this.request('/api/events/featured');
  }

  async getEvent(id: string) {
    return this.request(`/api/events/${id}`);
  }

  async createEvent(eventData: any) {
    const isFormData = eventData instanceof FormData;
    return this.request('/api/events', {
      method: 'POST',
      body: isFormData ? eventData : JSON.stringify(eventData),
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
    });
  }

  async updateEvent(id: string, eventData: any) {
    const isFormData = eventData instanceof FormData;
    return this.request(`/api/events/${id}`, {
      method: 'PUT',
      body: isFormData ? eventData : JSON.stringify(eventData),
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
    });
  }

  async deleteEvent(id: string) {
    return this.request(`/api/events/${id}`, {
      method: 'DELETE',
    });
  }

  // Auth
  async login(email: string, password: string) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Check authentication
  async checkAuth() {
    return this.request('/api/auth/check');
  }
}

export const apiService = new ApiService();
