import React, { useState } from 'react';
import { Server, Box, Cloud, HardDrive, Filter, Download, MoreVertical, Monitor } from 'lucide-react';
import './Infrastructure.css';

const INFRA_CATEGORIES = [
  { id: 'linux', label: 'Linux Servers', count: 842, icon: Server },
  { id: 'windows', label: 'Windows Servers', count: 120, icon: Monitor },
  { id: 'k8s', label: 'Kubernetes', count: 45, icon: Box },
  { id: 'cloud', label: 'Cloud Instances', count: 215, icon: Cloud },
  { id: 'baremetal', label: 'Bare Metal', count: 26, icon: HardDrive },
];

const SERVER_LIST = [
  { id: 'prod-db-01', type: 'Linux', status: 'Healthy', cpu: '45%', mem: '62%', disk: '80%', uptime: '45d' },
  { id: 'prod-db-02', type: 'Linux', status: 'Healthy', cpu: '42%', mem: '60%', disk: '75%', uptime: '45d' },
  { id: 'redis-cache-04', type: 'Linux', status: 'Warning', cpu: '20%', mem: '92%', disk: '15%', uptime: '12d' },
  { id: 'k8s-worker-10', type: 'Kubernetes Node', status: 'Healthy', cpu: '78%', mem: '85%', disk: '40%', uptime: '5d' },
  { id: 'payment-service-win', type: 'Windows', status: 'Critical', cpu: '98%', mem: '95%', disk: '99%', uptime: '120d' },
];

export default function Infrastructure() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServers = SERVER_LIST.filter(server => 
    server.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    server.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    server.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="infra-page">
      <div className="infra-header">
        <div>
          <h1>Infrastructure Monitoring</h1>
          <p className="text-muted">Live metrics, capacity planning, and server health.</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => alert('Filter options coming soon')}><Filter size={16} /> Filter</button>
          <button className="btn-secondary" onClick={() => alert('Exporting data as CSV...')}><Download size={16} /> Export</button>
        </div>
      </div>

      <div className="infra-categories">
        {INFRA_CATEGORIES.map(cat => (
          <div key={cat.id} className="category-card glass-panel">
            <div className="cat-icon"><cat.icon size={24} /></div>
            <div className="cat-info">
              <h3>{cat.count}</h3>
              <span className="text-muted">{cat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="infra-content glass-panel">
        <div className="table-header">
          <h3>Server Inventory</h3>
          <input 
            type="text" 
            className="table-search" 
            placeholder="Search hostname, type, or status..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="table-container">
          <table className="infra-table">
            <thead>
              <tr>
                <th>Hostname</th>
                <th>Type</th>
                <th>Status</th>
                <th>CPU</th>
                <th>Memory</th>
                <th>Disk</th>
                <th>Uptime</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredServers.map(server => (
                <tr key={server.id}>
                  <td className="font-semibold">{server.id}</td>
                  <td className="text-muted">{server.type}</td>
                  <td>
                    <span className={`status-badge ${server.status.toLowerCase()}`}>
                      {server.status}
                    </span>
                  </td>
                  <td>
                    <div className="metric-bar">
                      <div className="metric-fill" style={{ width: server.cpu, background: parseInt(server.cpu) > 90 ? 'var(--status-critical)' : 'var(--accent-primary)' }}></div>
                    </div>
                    <span className="metric-text">{server.cpu}</span>
                  </td>
                  <td>
                    <div className="metric-bar">
                      <div className="metric-fill" style={{ width: server.mem, background: parseInt(server.mem) > 90 ? 'var(--status-warning)' : 'var(--accent-secondary)' }}></div>
                    </div>
                    <span className="metric-text">{server.mem}</span>
                  </td>
                  <td>{server.disk}</td>
                  <td className="text-muted">{server.uptime}</td>
                  <td><button className="icon-btn"><MoreVertical size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
