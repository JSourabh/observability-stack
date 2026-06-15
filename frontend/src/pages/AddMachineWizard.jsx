import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Server, Shield, Activity, Search, Terminal, AlertCircle } from 'lucide-react';
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
  const [authMethod, setAuthMethod] = useState('password');
  
  // Basic form state
  const [formData, setFormData] = useState({
    hostname: '',
    ipAddress: '',
    username: '',
    password: '',
    sshKey: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const runValidation = () => {
    setIsTesting(true);
    setTestResults(null);
    
    // Mocking validation process with basic checks
    setTimeout(() => {
      if (!formData.hostname || !formData.ipAddress || !formData.username) {
        setTestResults({
          success: false,
          error: "Missing required connection details. Please go back to Step 1 & 2.",
          reachability: 'Failed',
          exporterStatus: 'Unknown',
          agentStatus: 'Unknown',
          metricsAvailability: 'Unknown',
        });
      } else if (authMethod === 'password' && !formData.password) {
        setTestResults({
          success: false,
          error: "Authentication failed. Password is required.",
          reachability: 'Success',
          exporterStatus: 'Failed Auth',
          agentStatus: 'Offline',
          metricsAvailability: 'Denied',
        });
      } else if (authMethod === 'ssh' && !formData.sshKey) {
        setTestResults({
          success: false,
          error: "Authentication failed. SSH Key is required.",
          reachability: 'Success',
          exporterStatus: 'Failed Auth',
          agentStatus: 'Offline',
          metricsAvailability: 'Denied',
        });
      } else {
        setTestResults({
          success: true,
          reachability: 'Success',
          exporterStatus: 'Running',
          agentStatus: 'Active',
          metricsAvailability: 'Verified',
        });
      }
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
                <label>Hostname <span className="text-critical">*</span></label>
                <input type="text" name="hostname" value={formData.hostname} onChange={handleInputChange} className="form-input" placeholder="e.g. prod-db-01" />
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
                  <label>IP Address <span className="text-critical">*</span></label>
                  <input type="text" name="ipAddress" value={formData.ipAddress} onChange={handleInputChange} className="form-input" placeholder="192.168.1.100" />
                </div>
                <div className="form-group">
                  <label>Port Number</label>
                  <input type="text" className="form-input" defaultValue="22" />
                </div>
              </div>
              <div className="form-group">
                <label>SSH Username <span className="text-critical">*</span></label>
                <input type="text" name="username" value={formData.username} onChange={handleInputChange} className="form-input" placeholder="ubuntu" />
              </div>
              <div className="form-group">
                <label>Authentication Method</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" name="auth" checked={authMethod === 'password'} onChange={() => setAuthMethod('password')} /> Password
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="auth" checked={authMethod === 'ssh'} onChange={() => setAuthMethod('ssh')} /> SSH Key
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="auth" checked={authMethod === 'agent'} onChange={() => setAuthMethod('agent')} /> Agent Based
                  </label>
                </div>
              </div>
              
              {authMethod === 'password' && (
                <div className="form-group slide-down">
                  <label>Password <span className="text-critical">*</span></label>
                  <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="form-input" placeholder="Enter password" />
                </div>
              )}
              
              {authMethod === 'ssh' && (
                <div className="form-group slide-down">
                  <label>Private SSH Key <span className="text-critical">*</span></label>
                  <textarea name="sshKey" value={formData.sshKey} onChange={handleInputChange} className="form-input" rows="4" placeholder="-----BEGIN PRIVATE KEY-----..."></textarea>
                </div>
              )}

              {authMethod === 'agent' && (
                <div className="info-box">
                  <Activity size={16} className="text-info" />
                  <span>The observability agent must be pre-installed on the target machine.</span>
                </div>
              )}
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
                  {!testResults.success && (
                    <div className="error-box mb-4">
                      <AlertCircle size={20} />
                      <span>{testResults.error}</span>
                    </div>
                  )}
                  <div className={`result-row ${testResults.reachability === 'Success' ? 'success' : 'error'}`}>
                    {testResults.reachability === 'Success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    <span>Reachability</span>
                    <span className={`result-badge ${testResults.reachability === 'Success' ? 'healthy' : 'critical'}`}>{testResults.reachability}</span>
                  </div>
                  <div className={`result-row ${testResults.exporterStatus === 'Running' ? 'success' : 'error'}`}>
                    {testResults.exporterStatus === 'Running' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    <span>Exporter Status</span>
                    <span className={`result-badge ${testResults.exporterStatus === 'Running' ? 'healthy' : 'critical'}`}>{testResults.exporterStatus}</span>
                  </div>
                  <div className={`result-row ${testResults.agentStatus === 'Active' ? 'success' : 'error'}`}>
                    {testResults.agentStatus === 'Active' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    <span>Agent Status</span>
                    <span className={`result-badge ${testResults.agentStatus === 'Active' ? 'healthy' : 'critical'}`}>{testResults.agentStatus}</span>
                  </div>
                  <div className={`result-row ${testResults.metricsAvailability === 'Verified' ? 'success' : 'error'}`}>
                    {testResults.metricsAvailability === 'Verified' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    <span>Metrics Availability</span>
                    <span className={`result-badge ${testResults.metricsAvailability === 'Verified' ? 'healthy' : 'critical'}`}>{testResults.metricsAvailability}</span>
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
              disabled={currentStep === 5 && (!testResults || !testResults.success)}
            >
              {currentStep === 5 ? 'Complete Setup' : 'Continue'} <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
