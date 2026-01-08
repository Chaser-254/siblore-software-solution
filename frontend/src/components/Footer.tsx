import { Link } from 'react-router-dom';
import { Twitter, Instagram, Linkedin, MapPin } from 'lucide-react';

export function Footer() {
  return <footer className="bg-dark-cardAlt border-t border-dark-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-42 h-42 rounded-xl bg-dark-bg border border-dark-border flex items-center justify-center group-hover:border-primary-blue transition-all">
                <img src="/siblore-logo.svg" alt="Siblore" className="w-42 h-42" />
              </div>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              Providing top-tier digital solutions including graphic design, IT
              support, and marketing strategies to elevate your business.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Linkedin].map((Icon, i) => <a key={i} href="#" className="w-8 h-8 rounded-full bg-dark-border flex items-center justify-center text-text-secondary hover:bg-primary-blue hover:text-white transition-all">
                  <Icon size={18} />
                </a>)}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['Home', 'Services', 'About', 'Contact', 'Admin'].map(item => <li key={item}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-text-secondary hover:text-primary-cyan transition-colors text-sm">
                    {item}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-bold text-white mb-6">
              Our Services
            </h3>
            <ul className="space-y-3">
              {['Photo Editing', 'Computer Maintenance', 'IT / ICT Services', 'Marketing Services', 'Video Editing'].map(item => <li key={item}>
                  <Link to="/services" className="text-text-secondary hover:text-primary-cyan transition-colors text-sm">
                    {item}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-white mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-text-secondary text-sm">
                <MapPin size={18} className="text-primary-blue shrink-0 mt-0.5" />
                <span>
                  California,
                  <br />
                  Taveta, Coast Kenya
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-secondary text-sm">
            © {new Date().getFullYear()} SibLore. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-text-secondary">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>;
}