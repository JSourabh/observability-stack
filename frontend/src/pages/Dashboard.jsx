import React from 'react';
import { Server, Activity, AlertTriangle, ShieldAlert } from 'lucide-react';
import './Dashboard.css';

const STATS = [
  { id: 'total-servers', label: 'Total Servers', value: '1,248', icon: Server, color: 'var(--text-main)' },
  { id: 'healthy', label: 'Healthy', value: '1,192', icon: Activity, color: 'var(--status-healthy)' },
  { id: 'warning', label: 'Warning', value: '45', icon: AlertTriangle, color: 'var(--status-warning)' },
  { id: 'critical', label: 'Critical', value: '11', icon: ShieldAlert, color: 'var(--status-critical)' }
];

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Infrastructure Overview</h1>
          <p className="text-muted">Executive overview of infrastructure health and metrics.</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">Last 24 Hours</button>
          <button className="btn-primary">Generate Report</button>
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

      <div className="dashboard-grid">
        <div className="dashboard-card glass-panel col-span-2">
          <div className="card-header">
            <h3>System Resources</h3>
          </div>
          <div className="card-body chart-placeholder">
            <div className="mock-chart">
              {/* Placeholder for Recharts/Chart.js */}
              <div className="chart-bars">
                {[40, 65, 30, 80, 50, 45, 90, 60, 35, 75, 40, 55].map((h, i) => (
                  <div key={i} className="bar" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card glass-panel">
          <div className="card-header">
            <h3>Active Alerts</h3>
          </div>
          <div className="card-body">
            <ul className="alert-list">
              <li className="alert-item critical">
                <div className="alert-dot"></div>
                <div className="alert-content">
                  <div className="alert-title">CPU Exceeded 95%</div>
                  <div className="alert-meta">prod-db-01 • 2 mins ago</div>
                </div>
              </li>
              <li className="alert-item warning">
                <div className="alert-dot"></div>
                <div className="alert-content">
                  <div className="alert-title">High Memory Usage</div>
                  <div className="alert-meta">redis-cache-04 • 15 mins ago</div>
                </div>
              </li>
              <li className="alert-item critical">
                <div className="alert-dot"></div>
                <div className="alert-content">
                  <div className="alert-title">API Latency Spike</div>
                  <div className="alert-meta">payment-service • 32 mins ago</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
