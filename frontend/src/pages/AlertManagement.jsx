import React, { useState } from 'react';
import { Bell, Filter, Search, BellOff, ArrowUpRight, Clock, CheckCircle2, ShieldAlert, AlertTriangle, MessageSquare, Users } from 'lucide-react';
import './AlertManagement.css';

const TABS = [
  { id: 'active', label: 'Active Alerts', icon: Bell },
  { id: 'suppression', label: 'Suppression Rules', icon: BellOff },
  { id: 'escalation', label: 'Escalation Policies', icon: ArrowUpRight },
  { id: 'channels', label: 'Notification Channels', icon: MessageSquare },
  { id: 'oncall', label: 'On-call Rotation', icon: Users },
];

const ALERTS = [
  { id: 'ALT-9012', severity: 'critical', title: 'High API Error Rate', service: 'payment-gateway', team: 'Platform', age: '5m', status: 'Firing' },
  { id: 'ALT-9013', severity: 'critical', title: 'Database Connection Pool Exhausted', service: 'auth-db-primary', team: 'DBA', age: '12m', status: 'Acknowledged' },
  { id: 'ALT-9014', severity: 'warning', title: 'CPU Usage Exceeds 85%', service: 'worker-node-x9', team: 'Infrastructure', age: '1h 20m', status: 'Firing' },
  { id: 'ALT-9015', severity: 'warning', title: 'Slow Query Detected', service: 'reporting-service', team: 'Data', age: '3h', status: 'Firing' },
  { id: 'ALT-9016', severity: 'info', title: 'Kubernetes Pod Restarted', service: 'frontend-app', team: 'Frontend', age: '5h', status: 'Resolved' },
];

export default function AlertManagement() {
  const [activeTab, setActiveTab] = useState('active');

  return (
    <div className="alert-page">
      <div className="alert-header">
        <div>
          <h1>Alert Management</h1>
          <p className="text-muted">Centralized routing, deduplication, and escalation of system alerts.</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary"><Clock size={16} /> History</button>
          <button className="btn-primary">+ Create Rule</button>
        </div>
      </div>

      <div className="alert-layout glass-panel">
        <div className="alert-sidebar">
          {TABS.map(tab => (
            <button 
              key={tab.id}
              className={`alert-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="alert-content">
          {activeTab === 'active' && (
            <div className="active-alerts-view">
              <div className="view-toolbar">
                <div className="search-wrapper">
                  <Search size={16} className="text-muted" />
                  <input type="text" placeholder="Search alerts, services, or tags..." />
                </div>
                <div className="filter-actions">
                  <button className="btn-secondary"><Filter size={14} /> Severity</button>
                  <button className="btn-secondary"><Filter size={14} /> Team</button>
                </div>
              </div>

              <div className="alert-table-container">
                <table className="alert-table">
                  <thead>
                    <tr>
                      <th>Severity</th>
                      <th>Alert ID</th>
                      <th>Title & Service</th>
                      <th>Team</th>
                      <th>Age</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ALERTS.map(alert => (
                      <tr key={alert.id} className={`alert-row ${alert.severity}`}>
                        <td className="severity-cell">
                          {alert.severity === 'critical' && <ShieldAlert size={18} className="text-critical" />}
                          {alert.severity === 'warning' && <AlertTriangle size={18} className="text-warning" />}
                          {alert.severity === 'info' && <CheckCircle2 size={18} className="text-info" />}
                        </td>
                        <td className="font-mono text-muted">{alert.id}</td>
                        <td>
                          <div className="alert-title-col">
                            <strong>{alert.title}</strong>
                            <span className="text-muted text-sm">{alert.service}</span>
                          </div>
                        </td>
                        <td><span className="team-badge">{alert.team}</span></td>
                        <td>{alert.age}</td>
                        <td>
                          <span className={`status-pill ${alert.status.toLowerCase()}`}>
                            {alert.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-links">
                            <a href="#">Acknowledge</a>
                            <a href="#">Silence</a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'channels' && (
            <div className="channels-view">
              <h2>Notification Channels</h2>
              <p className="text-muted mb-4">Configure where alerts should be routed.</p>
              
              <div className="channels-grid">
                {['Slack', 'Microsoft Teams', 'PagerDuty', 'Email', 'ServiceNow', 'Webhook'].map(channel => (
                  <div key={channel} className="channel-card glass-panel">
                    <div className="channel-header">
                      <MessageSquare size={20} className="text-accent" />
                      <h3>{channel}</h3>
                    </div>
                    <div className="channel-status">
                      <span className="status-dot healthy"></span>
                      <span>Connected</span>
                    </div>
                    <button className="btn-secondary w-full mt-4">Configure</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {['suppression', 'escalation', 'oncall'].includes(activeTab) && (
            <div className="placeholder-view">
              <BellOff size={48} className="text-muted" />
              <h3>Configuration options for {activeTab}</h3>
              <p className="text-muted">High-fidelity interface coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
