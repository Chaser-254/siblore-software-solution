import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const links = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'Services',
    path: '/services'
  }, {
    name: 'About',
    path: '/about'
  }, {
    name: 'Contact',
    path: '/contact'
  },{
    name: 'Store',
    path: '/store'
  },{
    name: 'Events',
    path: '/events'
  }];
  const isActive = (path: string) => location.pathname === path;
  return <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-50 h-50 rounded-xl bg-dark-bg border border-dark-border flex items-center justify-center group-hover:border-primary-blue transition-all">
              <img src="/siblore-logo.svg" alt="Siblore" className="w-50 h-50" />
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(link => <Link key={link.name} to={link.path} className={`text-sm font-medium transition-colors hover:text-primary-cyan ${isActive(link.path) ? 'text-primary-cyan' : 'text-text-secondary'}`}>
                {link.name}
              </Link>)}
            <Link to="/admin" className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-border/50 text-text-secondary hover:text-white hover:bg-dark-border transition-all text-xs font-medium border border-dark-border">
              <Shield size={14} />
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-text-secondary hover:text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} className="md:hidden bg-dark-bg border-b border-dark-border overflow-hidden">
            <div className="px-4 py-6 space-y-4">
              {links.map(link => <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className={`block text-lg font-medium ${isActive(link.path) ? 'text-primary-cyan' : 'text-text-secondary'}`}>
                  {link.name}
                </Link>)}
              <Link to="/admin" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-text-secondary pt-4 border-t border-dark-border">
                <Shield size={16} />
                Admin Access
              </Link>
            </div>
          </motion.div>}
      </AnimatePresence>
    </nav>;
}