import React, { useState } from 'react';
import { Activity, Terminal, ListTree, Box, Search, Play, Pause, Download, Filter } from 'lucide-react';
import './ObservabilityCenter.css';

const TABS = [
  { id: 'metrics', label: 'Metrics', icon: Activity },
  { id: 'logs', label: 'Logs', icon: Terminal },
  { id: 'traces', label: 'Traces', icon: ListTree },
  { id: 'containers', label: 'Containers', icon: Box },
];

const LOG_DATA = [
  { time: '14:23:01.124', level: 'INFO', service: 'payment-api', message: 'Processing transaction txn_892314' },
  { time: '14:23:02.041', level: 'DEBUG', service: 'payment-api', message: 'DB connection acquired from pool' },
  { time: '14:23:02.890', level: 'ERROR', service: 'auth-service', message: 'Failed to validate JWT token: expired' },
  { time: '14:23:03.112', level: 'WARN', service: 'frontend-app', message: 'High latency detected in /checkout route (850ms)' },
  { time: '14:23:04.550', level: 'INFO', service: 'inventory-db', message: 'Successfully updated stock for item_991' },
  { time: '14:23:05.002', level: 'INFO', service: 'payment-api', message: 'Transaction txn_892314 completed successfully' },
  { time: '14:23:05.100', level: 'ERROR', service: 'kubelet', message: 'Pod payment-api-6d4b8f9d-x2q1 restarted unexpectedly' },
];

export default function ObservabilityCenter() {
  const [activeTab, setActiveTab] = useState('logs');
  const [isLive, setIsLive] = useState(true);

  return (
    <div className="obs-page">
      <div className="obs-header">
        <div>
          <h1>Observability Center</h1>
          <p className="text-muted">Unified view of Metrics, Logs, Traces, and Container insights.</p>
        </div>
        <div className="header-actions">
          <div className="time-picker glass-panel">
            <span>Last 15 minutes</span>
          </div>
          <button className="btn-primary">Query Data</button>
        </div>
      </div>

      <div className="obs-tabs">
        {TABS.map(tab => (
          <button 
            key={tab.id} 
            className={`obs-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="obs-content glass-panel">
        {activeTab === 'logs' && (
          <div className="logs-view">
            <div className="logs-toolbar">
              <div className="search-box">
                <Search size={16} />
                <input type="text" placeholder="Search logs (e.g. {app='payment-api'} |= 'error')" />
              </div>
              <div className="toolbar-actions">
                <button className="icon-btn"><Filter size={18} /></button>
                <button className="icon-btn"><Download size={18} /></button>
                <div className="divider"></div>
                <button className={`live-btn ${isLive ? 'active' : ''}`} onClick={() => setIsLive(!isLive)}>
                  {isLive ? <Pause size={16} /> : <Play size={16} />}
                  {isLive ? 'Live Tail' : 'Paused'}
                </button>
              </div>
            </div>

            <div className="logs-terminal">
              {LOG_DATA.map((log, i) => (
                <div key={i} className="log-line">
                  <span className="log-time">{log.time}</span>
                  <span className={`log-level ${log.level.toLowerCase()}`}>{log.level}</span>
                  <span className="log-service">[{log.service}]</span>
                  <span className="log-message">{log.message}</span>
                </div>
              ))}
              {isLive && (
                <div className="log-line">
                  <span className="log-time">Waiting for new logs...</span>
                  <span className="cursor-blink">_</span>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'containers' && (
          <div className="containers-view">
             <div className="logs-toolbar">
              <div className="search-box">
                <Search size={16} />
                <input type="text" placeholder="Filter containers..." />
              </div>
            </div>
            
            <div className="container-metrics-grid">
              <div className="container-card">
                <div className="c-header">
                  <div className="c-title">
                    <Box size={18} className="text-accent" />
                    <span>payment-api-6d4b8f9d-x2q1</span>
                  </div>
                  <span className="status-dot healthy"></span>
                </div>
                <div className="c-stats">
                  <div className="c-stat">
                    <span className="label">CPU</span>
                    <span className="value">145m <small>/ 500m</small></span>
                  </div>
                  <div className="c-stat">
                    <span className="label">Memory</span>
                    <span className="value">256Mi <small>/ 1Gi</small></span>
                  </div>
                  <div className="c-stat">
                    <span className="label">Restarts</span>
                    <span className="value text-warning">2</span>
                  </div>
                </div>
                <div className="c-chart">
                   {/* CSS placeholder chart */}
                   <div className="mini-bar" style={{ height: '40%' }}></div>
                   <div className="mini-bar" style={{ height: '45%' }}></div>
                   <div className="mini-bar" style={{ height: '60%' }}></div>
                   <div className="mini-bar" style={{ height: '90%', background: 'var(--status-warning)' }}></div>
                   <div className="mini-bar" style={{ height: '30%' }}></div>
                </div>
              </div>

              <div className="container-card">
                <div className="c-header">
                  <div className="c-title">
                    <Box size={18} className="text-accent" />
                    <span>auth-service-v2-55f69d</span>
                  </div>
                  <span className="status-dot critical"></span>
                </div>
                <div className="c-stats">
                  <div className="c-stat">
                    <span className="label">CPU</span>
                    <span className="value text-critical">850m <small>/ 500m</small></span>
                  </div>
                  <div className="c-stat">
                    <span className="label">Memory</span>
                    <span className="value">800Mi <small>/ 1Gi</small></span>
                  </div>
                  <div className="c-stat">
                    <span className="label">Restarts</span>
                    <span className="value text-critical">15</span>
                  </div>
                </div>
                <div className="c-chart">
                   <div className="mini-bar" style={{ height: '70%', background: 'var(--status-critical)' }}></div>
                   <div className="mini-bar" style={{ height: '85%', background: 'var(--status-critical)' }}></div>
                   <div className="mini-bar" style={{ height: '95%', background: 'var(--status-critical)' }}></div>
                   <div className="mini-bar" style={{ height: '100%', background: 'var(--status-critical)' }}></div>
                   <div className="mini-bar" style={{ height: '80%', background: 'var(--status-critical)' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(activeTab === 'metrics' || activeTab === 'traces') && (
          <div className="placeholder-view">
            <Activity size={48} className="text-muted" />
            <h3>Select a query to visualize {activeTab}</h3>
            <p className="text-muted">Use the PromQL or TraceQL builder above to generate graphs.</p>
          </div>
        )}
      </div>
    </div>
  );
}
