import { Link } from 'react-router-dom';
import { LayoutDashboard, Calendar, Layers, Settings, ShoppingBag, Ticket, LogOut } from 'lucide-react';
interface AdminSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}
export function AdminSidebar({
  currentView,
  onViewChange
}: AdminSidebarProps) {
  const menuItems = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard
  }, {
    id: 'bookings',
    label: 'Bookings',
    icon: Calendar
  }, {
    id: 'services',
    label: 'Services',
    icon: Layers
  }, {
    id: 'store',
    label: 'Store',
    icon: ShoppingBag
  }, {
    id: 'events',
    label: 'Events',
    icon: Ticket
  }, {
    id: 'settings',
    label: 'Settings',
    icon: Settings
  }];
  return <aside className="w-64 bg-dark-cardAlt border-r border-dark-border h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-dark-border">
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/siblore-logo.svg" alt="Siblore" className="w-20 h-35" />
          <div>
            <span className="font-display font-bold text-l text-white leading-none">
              Admin Panel
            </span>
            {/* <span className="text-xs text-text-secondary">Management System</span> */}
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map(item => {
        const isActive = currentView === item.id;
        return <button key={item.id} onClick={() => onViewChange(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive ? 'bg-primary-blue text-white shadow-lg shadow-primary-blue/20' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}>
              <item.icon size={20} className={isActive ? 'text-white' : 'group-hover:text-primary-cyan transition-colors'} />
              <span className="font-medium">{item.label}</span>
            </button>;
      })}
      </nav>

      {/* System Status */}
      <div className="p-4 border-t border-dark-border">
        {/* <div className="bg-success/10 border border-success/20 rounded-xl p-3 mb-3">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-success font-medium">
              All Systems Operational
            </span>
          </div>
        </div> */}
        <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </Link>
      </div>
    </aside>;
}