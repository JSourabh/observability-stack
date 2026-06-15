import React from 'react';
import { Box, Search, Play, Pause, Download, Filter } from 'lucide-react';
import './ObservabilityCenter.css';

export default function Containers() {
  return (
    <div className="obs-page">
      <div className="obs-header">
        <div>
          <h1>Container Monitoring</h1>
          <p className="text-muted">Real-time metrics and health status for Docker and Kubernetes containers.</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary"><Filter size={16} /> Filter</button>
        </div>
      </div>

      <div className="obs-content glass-panel" style={{ overflow: 'auto' }}>
        <div className="containers-view">
          <div className="logs-toolbar">
            <div className="search-box">
              <Search size={16} />
              <input type="text" placeholder="Filter containers by name, image, or pod..." />
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

            <div className="container-card">
              <div className="c-header">
                <div className="c-title">
                  <Box size={18} className="text-accent" />
                  <span>redis-cache-master-0</span>
                </div>
                <span className="status-dot healthy"></span>
              </div>
              <div className="c-stats">
                <div className="c-stat">
                  <span className="label">CPU</span>
                  <span className="value">45m <small>/ 200m</small></span>
                </div>
                <div className="c-stat">
                  <span className="label">Memory</span>
                  <span className="value">128Mi <small>/ 512Mi</small></span>
                </div>
                <div className="c-stat">
                  <span className="label">Restarts</span>
                  <span className="value">0</span>
                </div>
              </div>
              <div className="c-chart">
                  <div className="mini-bar" style={{ height: '20%' }}></div>
                  <div className="mini-bar" style={{ height: '25%' }}></div>
                  <div className="mini-bar" style={{ height: '22%' }}></div>
                  <div className="mini-bar" style={{ height: '30%' }}></div>
                  <div className="mini-bar" style={{ height: '28%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
