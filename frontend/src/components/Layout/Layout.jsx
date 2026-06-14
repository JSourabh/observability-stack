import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Server, 
  Activity, 
  Network, 
  Map as MapIcon, 
  Box, 
  Bell, 
  BrainCircuit, 
  ShieldAlert, 
  PieChart, 
  Blocks,
  Search,
  Command,
  Sun,
  Moon
} from 'lucide-react';
import './Layout.css';

const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 'infrastructure', label: 'Infrastructure', icon: Server, path: '/infrastructure' },
  { id: 'observability', label: 'Observability Center', icon: Activity, path: '/observability' },
  { id: 'correlation', label: 'Correlation Engine', icon: Network, path: '/correlation' },
  { id: 'service-map', label: 'Service Map', icon: MapIcon, path: '/service-map' },
  { id: 'kubernetes', label: 'Kubernetes', icon: Box, path: '/kubernetes' },
  { id: 'alerts', label: 'Alert Management', icon: Bell, path: '/alerts' },
  { id: 'aiops', label: 'AIOps', icon: BrainCircuit, path: '/aiops' },
  { id: 'security', label: 'Security Monitoring', icon: ShieldAlert, path: '/security' },
  { id: 'executive', label: 'Executive Dashboard', icon: PieChart, path: '/executive' },
  { id: 'integrations', label: 'Integrations', icon: Blocks, path: '/integrations' }
];

export default function Layout() {
  const [theme, setTheme] = React.useState('dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar glass-panel">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <Activity size={24} color="var(--accent-primary)" />
          </div>
          <span className="brand-text">Obsrv<span className="text-gradient">.io</span></span>
        </div>

        <nav className="sidebar-nav">
          {SIDEBAR_ITEMS.map((item) => (
            <NavLink 
              key={item.id} 
              to={item.path} 
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <item.icon size={20} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <NavLink to="/add-machine" className="btn-primary add-machine-btn">
            + Add Machine
          </NavLink>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Topbar */}
        <header className="topbar glass-header">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search across metrics, logs, traces..." className="search-input" />
            <div className="command-shortcut">
              <Command size={14} /> K
            </div>
          </div>
          
          <div className="topbar-actions">
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="user-avatar">AD</div>
          </div>
        </header>

        {/* Page Content injected via React Router */}
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
