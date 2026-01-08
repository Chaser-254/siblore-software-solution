import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { StorePage } from './pages/StorePage';
import { EventsPage } from './pages/EventsPage';
import { EventsListingPage } from './pages/EventsListingPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { BookingFlow } from './pages/BookingFlow'; // Keeping existing file if needed, though replaced by modal flow
export function App() {
  return <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/listing" element={<EventsListingPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/booking" element={<BookingFlow />} />
      </Routes>
    </Router>;
}