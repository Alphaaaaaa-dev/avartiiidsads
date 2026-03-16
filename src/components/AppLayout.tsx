import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard, Radio, Camera, AlertTriangle, BarChart3,
  Wrench, Phone, FileText, Settings, Shield, Home, Menu, X
} from 'lucide-react';

const navItems = [
  { to: '/home', icon: Home, label: 'HOME' },
  { to: '/dashboard', icon: LayoutDashboard, label: 'OVERVIEW' },
  { to: '/sensors', icon: Radio, label: 'SENSORS' },
  { to: '/cameras', icon: Camera, label: 'LIVE CAMS' },
  { to: '/alerts', icon: AlertTriangle, label: 'ALERTS' },
  { to: '/emergency-history', icon: Shield, label: 'EMERGENCY' },
  { to: '/analytics', icon: BarChart3, label: 'ANALYTICS' },
  { to: '/maintenance', icon: Wrench, label: 'MAINTENANCE' },
  { to: '/compliance', icon: FileText, label: 'COMPLIANCE' },
  { to: '/support', icon: Phone, label: 'SUPPORT' },
  { to: '/settings', icon: Settings, label: 'SETTINGS' },
];

const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [istTime, setIstTime] = useState('');
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tick = () => setIstTime(
      new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }) + ' IST'
    );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [mobileOpen]);

  return (
    <div className="flex h-screen overflow-hidden scanline-overlay noise-overlay relative">
      {/* Live animated background orbs */}
      <div className="live-bg-orb-1" />
      <div className="live-bg-orb-2" />
      <div className="live-bg-orb-3" />

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 md:hidden" />
      )}

      {/* Sidebar — always visible on md+, slide-in on mobile */}
      <aside
        ref={sidebarRef}
        className={`
          fixed md:relative z-50 h-full w-56 bg-card border-r border-border flex flex-col transition-transform duration-300 ease-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div
          className="h-16 border-b border-border flex items-center justify-between px-4 cursor-pointer"
          onClick={() => { navigate('/home'); setMobileOpen(false); }}
        >
          <div className="flex items-center gap-2">
            <span className="font-display text-xl text-primary text-glow-cyan whitespace-nowrap">AVERTI</span>
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
          </div>
          {/* Close button on mobile */}
          <button
            onClick={(e) => { e.stopPropagation(); setMobileOpen(false); }}
            className="md:hidden text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-2 overflow-y-auto">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 text-xs font-mono-space tracking-wider transition-colors ${
                  isActive
                    ? 'text-primary bg-primary/10 border-r-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }`
              }
            >
              <item.icon size={16} className="flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Top bar */}
        <header className="h-16 border-b border-border bg-card/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-muted-foreground hover:text-foreground cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>

            {/* Logo in header for mobile */}
            <span
              className="md:hidden font-display text-lg text-primary text-glow-cyan cursor-pointer"
              onClick={() => navigate('/home')}
            >
              AVERTI<span className="inline-block w-1 h-1 bg-accent rounded-full ml-1 mb-1" />
            </span>

            <div className="hidden md:block text-[10px] font-mono-space text-muted-foreground">
              <span className="mr-4 text-[9px] tracking-[0.3em] text-muted-foreground/60">GAS DETECTION SYSTEM</span>
              IST: {istTime}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-safe rounded-full animate-pulse-glow" />
            <span className="text-[10px] font-mono-space text-safe tracking-wider hidden sm:inline">
              ALL SYSTEMS OPERATIONAL
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
