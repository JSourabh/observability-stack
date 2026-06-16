import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Infrastructure from './pages/Infrastructure';
import AddMachineWizard from './pages/AddMachineWizard';
import ObservabilityCenter from './pages/ObservabilityCenter';
import AlertManagement from './pages/AlertManagement';
import Containers from './pages/Containers';
import ServiceMap from './pages/ServiceMap';
import Kubernetes from './pages/Kubernetes';

// Placeholder for other pages to demonstrate navigation
const PlaceholderPage = ({ title }) => (
  <div style={{ padding: '24px' }}>
    <h1>{title}</h1>
    <p className="text-muted" style={{ marginTop: '8px' }}>This page is currently under construction. High-fidelity UI is being built.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="infrastructure" element={<Infrastructure />} />
          <Route path="containers" element={<Containers />} />
          <Route path="observability" element={<ObservabilityCenter />} />
          <Route path="correlation" element={<PlaceholderPage title="Unified Correlation Engine" />} />
          <Route path="service-map" element={<ServiceMap />} />
          <Route path="kubernetes" element={<Kubernetes />} />
          <Route path="alerts" element={<AlertManagement />} />
          <Route path="aiops" element={<PlaceholderPage title="AIOps" />} />
          <Route path="security" element={<PlaceholderPage title="Security Monitoring" />} />
          <Route path="executive" element={<PlaceholderPage title="Executive Dashboard" />} />
          <Route path="integrations" element={<PlaceholderPage title="Integrations" />} />
          <Route path="add-machine" element={<AddMachineWizard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
