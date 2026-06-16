import React, { useState } from 'react';
import { Box, Server, Layers, Cpu, Download, RefreshCw, LayoutDashboard, Edit2, Trash2, AlertTriangle, Settings } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Kubernetes.css';

const CLUSTER_STATS = [
  { id: 'nodes', label: 'Total Nodes', value: 45, icon: Server },
  { id: 'pods', label: 'Active Pods', value: 842, icon: Box },
  { id: 'deployments', label: 'Deployments', value: 124, icon: Layers },
  { id: 'cpu', label: 'Avg CPU Load', value: '42%', icon: Cpu },
];

const NAMESPACES = [
  { name: 'default', pods: 12, status: 'healthy' },
  { name: 'kube-system', pods: 28, status: 'healthy' },
  { name: 'payment-prod', pods: 45, status: 'warning' },
  { name: 'auth-prod', pods: 16, status: 'healthy' },
  { name: 'inventory-prod', pods: 32, status: 'critical' },
  { name: 'monitoring', pods: 18, status: 'healthy' },
];

const CPU_DATA = [
  { time: '10:00', usage: 35, limit: 100 },
  { time: '10:15', usage: 42, limit: 100 },
  { time: '10:30', usage: 38, limit: 100 },
  { time: '10:45', usage: 45, limit: 100 },
  { time: '11:00', usage: 85, limit: 100 },
  { time: '11:15', usage: 60, limit: 100 },
  { time: '11:30', usage: 42, limit: 100 },
];

const NODES_DATA = [
  { name: 'ip-10-0-1-12', role: 'Control Plane', cpu: '25%', memory: '40%', status: 'Ready', age: '12d' },
  { name: 'ip-10-0-2-45', role: 'Worker', cpu: '85%', memory: '60%', status: 'Ready', age: '12d' },
  { name: 'ip-10-0-2-89', role: 'Worker', cpu: '92%', memory: '85%', status: 'Warning', age: '5d' },
  { name: 'ip-10-0-3-12', role: 'Worker', cpu: '10%', memory: '15%', status: 'NotReady', age: '1d' }
];

const PODS_DATA = [
  { name: 'payment-api-6d4b8f9d-x2q1', namespace: 'payment-prod', node: 'ip-10-0-2-45', status: 'Running', restarts: 2, age: '2d' },
  { name: 'auth-service-v2-55f69d', namespace: 'auth-prod', node: 'ip-10-0-2-89', status: 'CrashLoopBackOff', restarts: 15, age: '1d' },
  { name: 'inventory-db-0', namespace: 'inventory-prod', node: 'ip-10-0-2-45', status: 'Running', restarts: 0, age: '10d' },
  { name: 'frontend-app-7c85d7b-9xpl', namespace: 'default', node: 'ip-10-0-3-12', status: 'Pending', restarts: 0, age: '5m' }
];

const DEPLOYMENTS_DATA = [
  { name: 'payment-api', namespace: 'payment-prod', desired: 5, ready: 5, upToDate: 5, available: 5, age: '10d' },
  { name: 'auth-service', namespace: 'auth-prod', desired: 3, ready: 1, upToDate: 3, available: 1, age: '10d' },
  { name: 'frontend-app', namespace: 'default', desired: 2, ready: 0, upToDate: 2, available: 0, age: '5m' }
];

export default function Kubernetes() {
  const [activeTab, setActiveTab] = useState('overview');
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: '', item: null, title: '' });

  const openModal = (type, item, title) => {
    setModalConfig({ isOpen: true, type, item, title });
  };

  const closeModal = () => {
    setModalConfig({ isOpen: false, type: '', item: null, title: '' });
  };

  return (
    <div className="k8s-page">
      <div className="k8s-header">
        <div>
          <h1>Kubernetes Observability</h1>
          <p className="text-muted">Cluster health, resource utilization, and pod orchestration.</p>
        </div>
        <div className="k8s-controls">
          <button className="btn-secondary"><RefreshCw size={16} /> Sync</button>
          <button className="btn-secondary"><Download size={16} /> Report</button>
        </div>
      </div>

      <div className="k8s-tabs">
        <button className={`k8s-tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
          <LayoutDashboard size={18} /> Overview
        </button>
        <button className={`k8s-tab ${activeTab === 'nodes' ? 'active' : ''}`} onClick={() => setActiveTab('nodes')}>
          <Server size={18} /> Nodes
        </button>
        <button className={`k8s-tab ${activeTab === 'pods' ? 'active' : ''}`} onClick={() => setActiveTab('pods')}>
          <Box size={18} /> Pods
        </button>
        <button className={`k8s-tab ${activeTab === 'deployments' ? 'active' : ''}`} onClick={() => setActiveTab('deployments')}>
          <Layers size={18} /> Deployments
        </button>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="k8s-overview">
            {CLUSTER_STATS.map((stat, i) => (
              <div key={i} className={`k8s-stat-card glass-panel ${stat.id}`}>
                <div className="k8s-stat-icon">
                  <stat.icon size={24} />
                </div>
                <div className="k8s-stat-info">
                  <h3>{stat.value}</h3>
                  <span>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="k8s-main-content">
            <div className="k8s-chart-panel glass-panel">
              <h3>Cluster CPU Utilization (Millicores)</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CPU_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--accent-secondary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--accent-secondary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                    <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                      itemStyle={{ color: 'var(--text-main)' }}
                    />
                    <Area type="monotone" dataKey="usage" stroke="var(--accent-secondary)" strokeWidth={2} fillOpacity={1} fill="url(#colorUsage)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="k8s-namespaces-panel glass-panel">
              <h3>Active Namespaces</h3>
              <div className="ns-list">
                {NAMESPACES.map((ns, i) => (
                  <div key={i} className="ns-item">
                    <div className="ns-name">
                      <div className={`ns-status ${ns.status}`}></div>
                      {ns.name}
                    </div>
                    <div className="ns-stats">
                      <span>{ns.pods} Pods</span>
                      <div className="action-buttons" style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                        <button className="icon-btn text-muted hover:text-main" onClick={() => openModal('edit', ns.name, 'Namespace')}><Edit2 size={14} /></button>
                        <button className="icon-btn text-critical" onClick={() => openModal('delete', ns.name, 'Namespace')}><Trash2 size={14} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'nodes' && (
        <div className="k8s-detail-view glass-panel">
          <div className="k8s-table-toolbar">
             <h3>Cluster Nodes</h3>
             <input type="text" className="k8s-table-search" placeholder="Search nodes by IP or Role..." />
          </div>
          <div className="k8s-table-container">
            <table className="k8s-table">
              <thead>
                <tr>
                  <th>Node Name</th>
                  <th>Role</th>
                  <th>CPU Usage</th>
                  <th>Memory Usage</th>
                  <th>Status</th>
                  <th>Age</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {NODES_DATA.map((node, i) => (
                  <tr key={i}>
                    <td className="font-semibold">{node.name}</td>
                    <td>{node.role}</td>
                    <td>{node.cpu}</td>
                    <td>{node.memory}</td>
                    <td><span className={`badge ${node.status.toLowerCase()}`}>{node.status}</span></td>
                    <td className="text-muted">{node.age}</td>
                    <td>
                      <div className="action-buttons" style={{ display: 'flex', gap: '8px' }}>
                        <button className="icon-btn text-muted hover:text-main" onClick={() => openModal('edit', node.name, 'Node')}><Edit2 size={16} /></button>
                        <button className="icon-btn text-critical" onClick={() => openModal('delete', node.name, 'Node')}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'pods' && (
        <div className="k8s-detail-view glass-panel">
          <div className="k8s-table-toolbar">
             <h3>Active Pods</h3>
             <input type="text" className="k8s-table-search" placeholder="Search pods by Name or Namespace..." />
          </div>
          <div className="k8s-table-container">
            <table className="k8s-table">
              <thead>
                <tr>
                  <th>Pod Name</th>
                  <th>Namespace</th>
                  <th>Node</th>
                  <th>Status</th>
                  <th>Restarts</th>
                  <th>Age</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {PODS_DATA.map((pod, i) => (
                  <tr key={i}>
                    <td className="font-semibold">{pod.name}</td>
                    <td>{pod.namespace}</td>
                    <td className="text-muted">{pod.node}</td>
                    <td><span className={`badge ${pod.status.toLowerCase()}`}>{pod.status}</span></td>
                    <td className={pod.restarts > 0 ? "text-critical font-semibold" : ""}>{pod.restarts}</td>
                    <td className="text-muted">{pod.age}</td>
                    <td>
                      <div className="action-buttons" style={{ display: 'flex', gap: '8px' }}>
                        <button className="icon-btn text-muted hover:text-main" onClick={() => openModal('edit', pod.name, 'Pod')}><Edit2 size={16} /></button>
                        <button className="icon-btn text-critical" onClick={() => openModal('delete', pod.name, 'Pod')}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'deployments' && (
        <div className="k8s-detail-view glass-panel">
          <div className="k8s-table-toolbar">
             <h3>Deployments</h3>
             <input type="text" className="k8s-table-search" placeholder="Search deployments by Name or Namespace..." />
          </div>
          <div className="k8s-table-container">
            <table className="k8s-table">
              <thead>
                <tr>
                  <th>Deployment Name</th>
                  <th>Namespace</th>
                  <th>Desired</th>
                  <th>Ready</th>
                  <th>Up-to-date</th>
                  <th>Available</th>
                  <th>Age</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {DEPLOYMENTS_DATA.map((dep, i) => (
                  <tr key={i}>
                    <td className="font-semibold">{dep.name}</td>
                    <td>{dep.namespace}</td>
                    <td>{dep.desired}</td>
                    <td className={dep.ready < dep.desired ? "text-critical font-semibold" : ""}>{dep.ready}</td>
                    <td>{dep.upToDate}</td>
                    <td>{dep.available}</td>
                    <td className="text-muted">{dep.age}</td>
                    <td>
                      <div className="action-buttons" style={{ display: 'flex', gap: '8px' }}>
                        <button className="icon-btn text-muted hover:text-main" onClick={() => openModal('edit', dep.name, 'Deployment')}><Edit2 size={16} /></button>
                        <button className="icon-btn text-critical" onClick={() => openModal('delete', dep.name, 'Deployment')}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Overlay */}
      {modalConfig.isOpen && (
        <div className="k8s-modal-overlay" onClick={closeModal}>
          <div className="k8s-modal glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className={`k8s-modal-header ${modalConfig.type === 'delete' ? 'delete' : ''}`}>
              {modalConfig.type === 'delete' ? <AlertTriangle size={20} /> : <Settings size={20} />}
              {modalConfig.type === 'delete' ? 'Confirm Deletion' : 'Edit Configuration'}
            </div>
            
            <div className="k8s-modal-body">
              {modalConfig.type === 'delete' ? (
                <p>Are you sure you want to delete the {modalConfig.title.toLowerCase()} <strong>{modalConfig.item}</strong>? This action cannot be undone and may cause service disruption.</p>
              ) : (
                <p>You are about to modify the configuration for {modalConfig.title.toLowerCase()} <strong>{modalConfig.item}</strong>. (Form fields would be rendered here in a full implementation).</p>
              )}
            </div>
            
            <div className="k8s-modal-actions">
              <button className="btn-secondary" onClick={closeModal}>Cancel</button>
              {modalConfig.type === 'delete' ? (
                <button className="btn-danger" onClick={closeModal}>Delete</button>
              ) : (
                <button className="btn-primary" onClick={closeModal}>Save Changes</button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
