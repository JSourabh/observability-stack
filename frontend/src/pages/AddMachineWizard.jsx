import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Server, Shield, Activity, Search, Terminal } from 'lucide-react';
import './AddMachineWizard.css';

const STEPS = [
  { id: 1, title: 'Basic Information', icon: Server },
  { id: 2, title: 'Connection Details', icon: Shield },
  { id: 3, title: 'Monitoring Selection', icon: Activity },
  { id: 4, title: 'Auto Discovery', icon: Search },
  { id: 5, title: 'Validation', icon: Terminal },
];

export default function AddMachineWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState(null);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const runValidation = () => {
    setIsTesting(true);
    // Mocking validation process
    setTimeout(() => {
      setTestResults({
        reachability: 'Success',
        exporterStatus: 'Running',
        agentStatus: 'Active',
        metricsAvailability: 'Verified',
      });
      setIsTesting(false);
    }, 2500);
  };

  return (
    <div className="wizard-page">
      <div className="wizard-header">
        <h1>Add New Machine</h1>
        <p className="text-muted">Onboard a new server or resource into the observability platform.</p>
      </div>

      <div className="wizard-container glass-panel">
        <div className="wizard-sidebar">
          {STEPS.map((step) => (
            <div 
              key={step.id} 
              className={`wizard-step-indicator ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
            >
              <div className="step-icon">
                {currentStep > step.id ? <CheckCircle2 size={18} /> : <step.icon size={18} />}
              </div>
              <div className="step-info">
                <span className="step-number">Step {step.id}</span>
                <span className="step-title">{step.title}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="wizard-content">
          {currentStep === 1 && (
            <div className="step-pane">
              <h2>Basic Information</h2>
              <div className="form-group">
                <label>Hostname</label>
                <input type="text" className="form-input" placeholder="e.g. prod-db-01" />
              </div>
              <div className="form-group">
                <label>Environment</label>
                <select className="form-input">
                  <option>Production</option>
                  <option>Staging</option>
                  <option>Development</option>
                  <option>QA</option>
                </select>
              </div>
              <div className="form-group">
                <label>Team Ownership</label>
                <input type="text" className="form-input" placeholder="e.g. Data Engineering" />
              </div>
              <div className="form-group">
                <label>Business Application</label>
                <input type="text" className="form-input" placeholder="e.g. Payment Gateway" />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="step-pane">
              <h2>Connection Details</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>IP Address</label>
                  <input type="text" className="form-input" placeholder="192.168.1.100" />
                </div>
                <div className="form-group">
                  <label>Port Number</label>
                  <input type="text" className="form-input" defaultValue="22" />
                </div>
              </div>
              <div className="form-group">
                <label>SSH Username</label>
                <input type="text" className="form-input" placeholder="ubuntu" />
              </div>
              <div className="form-group">
                <label>Authentication Method</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" name="auth" defaultChecked /> Password
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="auth" /> SSH Key
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="auth" /> Agent Based
                  </label>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="step-pane">
              <h2>Monitoring Selection</h2>
              <p className="text-muted mb-4">Select the exporters and integrations to deploy.</p>
              <div className="checkbox-grid">
                {[
                  'Node Exporter', 'OpenTelemetry Collector', 'Prometheus', 
                  'Grafana Integration', 'Loki', 'Tempo', 'Jaeger', 
                  'Fluentbit', 'Elasticsearch', 'Blackbox Exporter', 'SNMP Exporter'
                ].map(item => (
                  <label key={item} className="checkbox-card">
                    <input type="checkbox" className="form-checkbox" defaultChecked={['Node Exporter', 'OpenTelemetry Collector'].includes(item)} />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="step-pane">
              <h2>Auto Discovery</h2>
              <p className="text-muted mb-4">The agent will automatically detect the following resources.</p>
              <div className="discovery-grid">
                {['CPU', 'RAM', 'Disks', 'Network Interfaces', 'Running Services', 'Containers', 'Kubernetes Resources'].map(item => (
                  <div key={item} className="discovery-item glass-panel">
                    <Search size={16} className="text-accent" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="step-pane">
              <h2>Validation</h2>
              <p className="text-muted mb-4">Test the connection and verify metric availability before finalizing.</p>
              
              {!testResults && !isTesting && (
                <button className="btn-primary run-test-btn" onClick={runValidation}>
                  Test Connection
                </button>
              )}

              {isTesting && (
                <div className="testing-state">
                  <div className="spinner"></div>
                  <p>Validating connection and agent status...</p>
                </div>
              )}

              {testResults && (
                <div className="validation-results">
                  <div className="result-row success">
                    <CheckCircle2 size={20} />
                    <span>Reachability</span>
                    <span className="result-badge">{testResults.reachability}</span>
                  </div>
                  <div className="result-row success">
                    <CheckCircle2 size={20} />
                    <span>Exporter Status</span>
                    <span className="result-badge">{testResults.exporterStatus}</span>
                  </div>
                  <div className="result-row success">
                    <CheckCircle2 size={20} />
                    <span>Agent Status</span>
                    <span className="result-badge">{testResults.agentStatus}</span>
                  </div>
                  <div className="result-row success">
                    <CheckCircle2 size={20} />
                    <span>Metrics Availability</span>
                    <span className="result-badge">{testResults.metricsAvailability}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="wizard-footer">
            <button 
              className="btn-secondary" 
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Back
            </button>
            <button 
              className="btn-primary" 
              onClick={currentStep === 5 ? () => alert('Machine Added Successfully!') : nextStep}
            >
              {currentStep === 5 ? 'Complete Setup' : 'Continue'} <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
