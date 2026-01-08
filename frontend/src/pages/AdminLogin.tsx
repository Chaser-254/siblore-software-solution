import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { apiService } from '../services/api';

export function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiService.login(email, password);
      localStorage.setItem('adminToken', response.token);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-white mb-8 transition-colors">
          <ArrowLeft size={20} />
          Back to Website
        </Link>

        <div className="bg-dark-cardAlt border border-dark-border p-8 rounded-2xl shadow-soft">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-dark-bg border border-dark-border rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary-cyan">
              <span className="font-display font-bold text-2xl">S</span>
            </div>
            <h1 className="text-2xl font-display font-bold text-white flex items-center justify-center gap-2">
              <Lock size={20} className="text-primary-blue" />
              Admin Login
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all" 
                  placeholder="Enter your email address" 
                  required 
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-dark-bg border border-dark-border text-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all" 
                  placeholder="••••••••" 
                  required 
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-3 rounded-full bg-primary-blue text-white font-bold hover:bg-primary-hover transition-colors shadow-lg shadow-primary-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>;
}