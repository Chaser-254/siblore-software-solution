import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
export function ContactPage() {
  return <div className="min-h-screen bg-dark-bg text-text-primary">
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-text-secondary text-lg mb-12">
              Have a project in mind? We'd love to hear from you. Send us a
              message and we'll get back to you as soon as possible.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-dark-cardAlt border border-dark-border flex items-center justify-center shrink-0 text-primary-blue">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Email Us</h3>
                  <p className="text-text-secondary">
                    sibloresoftwaresolutions@proton.me
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-dark-cardAlt border border-dark-border flex items-center justify-center shrink-0 text-primary-blue">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Call Us</h3>
                  <p className="text-text-secondary">+254 111 363 870</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-dark-cardAlt border border-dark-border flex items-center justify-center shrink-0 text-primary-blue">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Visit Us</h3>
                  <p className="text-text-secondary">California</p>
                  <p className="text-text-secondary">Taveta, Coast Kenya</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-dark-cardAlt border border-dark-border p-8 rounded-2xl shadow-soft">
            <h2 className="text-2xl font-display font-bold mb-6">
              Send Message
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Name
                  </label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all" placeholder="Enter your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Email
                  </label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all" placeholder="Enter your email address..." />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Subject
                </label>
                <input type="text" className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all" placeholder="Project Inquiry" />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Message
                </label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all resize-none" placeholder="Tell us about your project..." />
              </div>

              <button type="button" className="w-full py-4 rounded-full bg-primary-blue text-white font-bold hover:bg-primary-hover transition-colors shadow-lg shadow-primary-blue/20 flex items-center justify-center gap-2">
                Send Message
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>;
}