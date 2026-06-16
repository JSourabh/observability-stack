import React, { useState } from 'react';
import { Globe, ShieldCheck, CreditCard, Database, Zap, Activity } from 'lucide-react';
import './ServiceMap.css';

const NODES = [
  { id: 'gateway', label: 'API Gateway', icon: Globe, x: 50, y: 200, status: 'healthy', latency: '12ms', errors: '0.1%' },
  { id: 'auth', label: 'Auth Service', icon: ShieldCheck, x: 300, y: 100, status: 'healthy', latency: '45ms', errors: '0.0%' },
  { id: 'payment', label: 'Payment API', icon: CreditCard, x: 300, y: 300, status: 'warning', latency: '850ms', errors: '2.5%' },
  { id: 'inventory', label: 'Inventory DB', icon: Database, x: 550, y: 100, status: 'healthy', latency: '5ms', errors: '0.0%' },
  { id: 'payment-db', label: 'Transaction DB', icon: Database, x: 550, y: 300, status: 'critical', latency: '1200ms', errors: '5.2%' },
];

const EDGES = [
  { from: 'gateway', to: 'auth', status: 'active' },
  { from: 'gateway', to: 'payment', status: 'active' },
  { from: 'auth', to: 'inventory', status: 'active' },
  { from: 'payment', to: 'payment-db', status: 'error' },
];

export default function ServiceMap() {
  const [hoveredNode, setHoveredNode] = useState(null);

  // Helper to draw curved lines between nodes
  const getPath = (fromNode, toNode) => {
    const startX = fromNode.x + 160; // right edge of node
    const startY = fromNode.y + 50;  // middle of node
    const endX = toNode.x;           // left edge of node
    const endY = toNode.y + 50;      // middle of node
    
    // Create a bezier curve
    const controlPointX = startX + (endX - startX) / 2;
    return `M ${startX} ${startY} C ${controlPointX} ${startY}, ${controlPointX} ${endY}, ${endX} ${endY}`;
  };

  return (
    <div className="service-map-page">
      <div className="map-header">
        <div>
          <h1>Service Map</h1>
          <p className="text-muted">Real-time dependency topology and performance metrics.</p>
        </div>
        <div className="map-controls">
          <button className="btn-secondary">Auto Layout</button>
          <button className="btn-secondary">Export Topography</button>
        </div>
      </div>

      <div className="map-canvas-container glass-panel">
        <div className="service-nodes-wrapper">
          <svg className="connection-lines">
            {EDGES.map((edge, i) => {
              const fromNode = NODES.find(n => n.id === edge.from);
              const toNode = NODES.find(n => n.id === edge.to);
              if (!fromNode || !toNode) return null;
              
              return (
                <path 
                  key={i}
                  d={getPath(fromNode, toNode)}
                  className={`connection-path ${edge.status}`}
                />
              );
            })}
          </svg>

          {NODES.map(node => (
            <div 
              key={node.id}
              className={`service-node glass-panel ${node.status}`}
              style={{ left: node.x, top: node.y }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <div className="icon-wrapper">
                <node.icon size={24} />
              </div>
              <div className="node-title">{node.label}</div>
              <div className="node-metrics">
                <span><Activity size={12}/> {node.latency}</span>
                <span className={node.status !== 'healthy' ? `text-${node.status}` : ''}>
                  <Zap size={12}/> {node.errors}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
