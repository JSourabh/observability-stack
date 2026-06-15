import React, { useState } from 'react';
import { Server, Activity, AlertTriangle, ShieldAlert, ChevronDown, Download, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './Dashboard.css';

const STATS = [
  { id: 'total-servers', label: 'Total Servers', value: '1,248', icon: Server, color: 'var(--text-main)' },
  { id: 'healthy', label: 'Healthy', value: '1,192', icon: Activity, color: 'var(--status-healthy)' },
  { id: 'warning', label: 'Warning', value: '45', icon: AlertTriangle, color: 'var(--status-warning)' },
  { id: 'critical', label: 'Critical', value: '11', icon: ShieldAlert, color: 'var(--status-critical)' }
];

const RESOURCE_TREND_DATA = [
  { time: '10:00', cpu: 45, memory: 60, network: 24 },
  { time: '10:15', cpu: 52, memory: 62, network: 35 },
  { time: '10:30', cpu: 48, memory: 61, network: 28 },
  { time: '10:45', cpu: 70, memory: 68, network: 65 },
  { time: '11:00', cpu: 85, memory: 75, network: 80 },
  { time: '11:15', cpu: 65, memory: 72, network: 45 },
  { time: '11:30', cpu: 50, memory: 65, network: 30 },
];

const TOP_SERVERS_DATA = [
  { name: 'payment-db-01', cpu: 92, memory: 88 },
  { name: 'auth-service-x9', cpu: 85, memory: 76 },
  { name: 'worker-node-44', cpu: 78, memory: 65 },
  { name: 'redis-cache-m1', cpu: 45, memory: 95 },
  { name: 'frontend-proxy', cpu: 60, memory: 45 },
];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('Last 24 Hours');
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setReportSuccess(true);
      setTimeout(() => setReportSuccess(false), 3000); // Reset after 3 seconds
    }, 2000);
  };

  const handleTimeSelect = (range) => {
    setTimeRange(range);
    setShowTimeDropdown(false);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Infrastructure Overview</h1>
          <p className="text-muted">Executive overview of infrastructure health and metrics.</p>
        </div>
        <div className="header-actions">
          <div className="dropdown-container">
            <button 
              className="btn-secondary dropdown-trigger" 
              onClick={() => setShowTimeDropdown(!showTimeDropdown)}
            >
              {timeRange} <ChevronDown size={14} />
            </button>
            {showTimeDropdown && (
              <div className="dropdown-menu glass-panel">
                {['Last 1 Hour', 'Last 6 Hours', 'Last 24 Hours', 'Last 7 Days', 'Last 30 Days'].map(range => (
                  <button 
                    key={range} 
                    className={`dropdown-item ${timeRange === range ? 'active' : ''}`}
                    onClick={() => handleTimeSelect(range)}
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button 
            className={`btn-primary ${isGenerating ? 'loading' : ''} ${reportSuccess ? 'success' : ''}`} 
            onClick={handleGenerateReport}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <span className="flex-center"><span className="spinner-small"></span> Generating...</span>
            ) : reportSuccess ? (
              <span className="flex-center"><CheckCircle2 size={16} /> Ready</span>
            ) : (
              <span className="flex-center"><Download size={16} /> Generate Report</span>
            )}
          </button>
        </div>
      </div>

      <div className="kpi-grid">
        {STATS.map(stat => (
          <div key={stat.id} className="kpi-card glass-panel">
            <div className="kpi-header">
              <span className="kpi-label">{stat.label}</span>
              <stat.icon size={20} style={{ color: stat.color }} />
            </div>
            <div className="kpi-value">{stat.value}</div>
            <div className="kpi-trend">
              <span style={{ color: 'var(--status-healthy)' }}>+2.4%</span> vs last week
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-charts-row">
        <div className="dashboard-card glass-panel chart-flex">
          <div className="card-header">
            <h3>System Resource Utilization (Cluster Average)</h3>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={RESOURCE_TREND_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-secondary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent-secondary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--surface-2)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: 'var(--text-muted)' }} />
                <Area type="monotone" dataKey="cpu" name="CPU Usage (%)" stroke="var(--accent-primary)" fillOpacity={1} fill="url(#colorCpu)" strokeWidth={2} />
                <Area type="monotone" dataKey="memory" name="Memory Usage (%)" stroke="var(--accent-secondary)" fillOpacity={1} fill="url(#colorMem)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-card glass-panel chart-flex">
          <div className="card-header">
            <h3>Top Resource Consuming Servers</h3>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={TOP_SERVERS_DATA} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                <XAxis type="number" domain={[0, 100]} stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} width={100} />
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--surface-2)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: 'var(--text-muted)' }} />
                <Bar dataKey="cpu" name="CPU (%)" fill="var(--status-warning)" radius={[0, 4, 4, 0]} barSize={12} />
                <Bar dataKey="memory" name="Memory (%)" fill="var(--status-info)" radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="dashboard-card glass-panel">
        <div className="card-header">
          <h3>Active Critical Alerts</h3>
        </div>
        <div className="card-body" style={{ padding: '0' }}>
          <ul className="alert-list" style={{ gap: '0' }}>
            <li className="alert-item critical" style={{ borderRadius: '0', borderBottom: '1px solid var(--border-color)' }}>
              <div className="alert-dot"></div>
              <div className="alert-content">
                <div className="alert-title">payment-db-01: CPU Exceeded 95%</div>
                <div className="alert-meta">Firing for 2 mins • Database Cluster</div>
              </div>
              <button className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.8rem', marginLeft: 'auto' }}>Investigate</button>
            </li>
            <li className="alert-item critical" style={{ borderRadius: '0', borderBottom: '1px solid var(--border-color)' }}>
              <div className="alert-dot"></div>
              <div className="alert-content">
                <div className="alert-title">auth-service-x9: API Latency Spike</div>
                <div className="alert-meta">Firing for 32 mins • Identity Provider</div>
              </div>
              <button className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.8rem', marginLeft: 'auto' }}>Investigate</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
