import React from 'react';
import { Box, Server, Layers, Cpu, Download, RefreshCw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Kubernetes.css';

const CLUSTER_STATS = [
  { label: 'Total Nodes', value: 45, icon: Server },
  { label: 'Active Pods', value: 842, icon: Box },
  { label: 'Deployments', value: 124, icon: Layers },
  { label: 'Avg CPU Load', value: '42%', icon: Cpu },
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

export default function Kubernetes() {
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

      <div className="k8s-overview">
        {CLUSTER_STATS.map((stat, i) => (
          <div key={i} className="k8s-stat-card glass-panel">
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
