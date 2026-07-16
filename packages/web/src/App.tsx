import { useState, useEffect, useRef } from 'react';
import './App.css';

// SVG Icons
const ActivityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;
const ZapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
const TerminalIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>;

const mockLogs = [
  "[AGENT] Booting Sphere SDK v2...",
  "[AGENT] Connected to Unicity Testnet v2 (RPC: https://rpc.testnet.unicity.network)",
  "[INTENT] Scanning global intent orderbook...",
  "[INTENT] Found new Intent 0x8F1A: Bridge 500 UCT -> Base",
  "[ROUTING] Evaluating 12 possible routes for 0x8F1A...",
  "[ROUTING] Route selected: Fastest Path (Est. 45s, Risk: Low)",
  "[ESCROW] Initiating HTLC Lock on Unicity Testnet...",
  "[ESCROW] Lock verified. Awaiting destination confirmation.",
  "[AGENT] Monitoring cross-chain messaging protocol...",
  "[ESCROW] Destination confirmed. Settling payment on Unicity...",
  "[AGENT] Intent 0x8F1A completed successfully.",
  "[INTENT] Found complex Intent 0x9B2C. Liquidity mismatch.",
  "[DM] Falling back to Nostr NIP-04 negotiation. Proposing new fee tier...",
  "[DM] Counterparty accepted terms. Proceeding with execution.",
];

function App() {
  const [activeTab, setActiveTab] = useState('simulator');
  const [logs, setLogs] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // Simulator State
  const [simAmount, setSimAmount] = useState('1000');
  const [simTarget, setSimTarget] = useState('Base');
  const [simulating, setSimulating] = useState(false);
  const [routes, setRoutes] = useState<any[] | null>(null);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  // Simulate Agent Activity
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < mockLogs.length) {
        setLogs(prev => [...prev, mockLogs[i]]);
        i++;
      } else {
        i = 2; // Loop from scanning
      }
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const runSimulation = () => {
    setSimulating(true);
    setRoutes(null);
    setTimeout(() => {
      setRoutes([
        { name: 'Atomic Fast', time: '~45s', gas: '$0.85', risk: 12, recommended: true },
        { name: 'Liquidity Pool', time: '~2m', gas: '$1.20', risk: 45, recommended: false },
        { name: 'Lock & Mint', time: '~15m', gas: '$5.00', risk: 85, recommended: false },
      ]);
      setSimulating(false);
      setLogs(prev => [...prev, `[SIMULATION] Evaluated routes for ${simAmount} UCT -> ${simTarget}. Optimal found.`]);
    }, 1500);
  };

  return (
    <div className="vip-container">
      {/* Cinematic Background */}
      <div className="bg-glow top-left"></div>
      <div className="bg-glow bottom-right"></div>
      <div className="grid-overlay"></div>
      
      {/* Top Navbar */}
      <nav className="navbar">
        <div className="nav-brand">
          <div className="logo-orb"></div>
          <span className="brand-text">IntentBridge</span>
        </div>
        <div className="nav-badges">
          <div className="status-pill active-pill">
            <span className="dot animate-pulse"></span>
            Sphere SDK v2 Autonomous Agent
          </div>
          <button className="connect-btn">Connect Wallet</button>
        </div>
      </nav>
      
      <main className="main-content">
        <header className="hero-section">
          <h1 className="hero-title">
            The Future of <span className="text-gradient">Cross-Chain</span>
          </h1>
          <p className="hero-subtitle">
            Autonomous, intent-driven bridging powered by Unicity Agentic Networks. 
            Zero slippage worries. Absolute security.
          </p>
        </header>

        <div className="dashboard-layout">
          {/* Main Dashboard Panel */}
          <div className="panel left-panel flex-col">
            <div className="panel-header">
              <h2><TerminalIcon /> Live Agent Terminal</h2>
              <p className="subtext">Real-time internal logic and execution feed.</p>
            </div>
            
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="mac-btns"><span></span><span></span><span></span></div>
                <div className="terminal-title">agent@unicity-sphere:~</div>
              </div>
              <div className="terminal-body" ref={terminalRef}>
                {logs.map((log, index) => {
                  let colorClass = 'log-info';
                  if (log.includes('[AGENT]')) colorClass = 'log-agent';
                  if (log.includes('[INTENT]')) colorClass = 'log-intent';
                  if (log.includes('[ROUTING]')) colorClass = 'log-routing';
                  if (log.includes('[ESCROW]')) colorClass = 'log-escrow';
                  if (log.includes('[DM]')) colorClass = 'log-dm';
                  return (
                    <div key={index} className="log-line">
                      <span className="log-time">{new Date().toLocaleTimeString()}</span>
                      <span className={`log-text ${colorClass}`}>{log}</span>
                    </div>
                  );
                })}
                <div className="log-line typing-cursor">_</div>
              </div>
            </div>

            <div className="intents-header mt-8">
              <h3><ActivityIcon /> Market Overview</h3>
            </div>
            <div className="metric-cards">
              <div className="metric-card">
                <p className="metric-title">Total Volume Secured</p>
                <h3 className="metric-value">$1,425,800</h3>
                <div className="metric-trend positive">+12.5% this week</div>
              </div>
              <div className="metric-card">
                <p className="metric-title">Bridges Executed</p>
                <h3 className="metric-value">894</h3>
                <div className="metric-trend positive">99.9% atomic success</div>
              </div>
            </div>
          </div>

          {/* Interactive Utilities Panel */}
          <div className="panel right-panel">
            <div className="panel-header">
              <h2><ZapIcon /> Agent Utilities</h2>
              <p className="subtext">VIP Pro interactive tools.</p>
            </div>

            <div className="tab-navigation">
              <button className={`tab-item ${activeTab === 'simulator' ? 'active' : ''}`} onClick={() => setActiveTab('simulator')}>
                <ZapIcon /> Route Simulator
              </button>
              <button className={`tab-item ${activeTab === 'risk' ? 'active' : ''}`} onClick={() => setActiveTab('risk')}>
                <SettingsIcon /> Risk Panel
              </button>
              <button className={`tab-item ${activeTab === 'edu' ? 'active' : ''}`} onClick={() => setActiveTab('edu')}>
                <ShieldIcon /> Knowledge
              </button>
            </div>

            <div className="tab-body">
              {activeTab === 'simulator' && (
                <div className="info-card fade-in">
                  <h3 className="info-title">Intelligent Routing Engine</h3>
                  <div className="info-desc">
                    <p>Simulate how the Agent evaluates paths based on intent constraints.</p>
                  </div>
                  
                  <div className="simulator-form">
                    <div className="input-group">
                      <label>Amount (UCT)</label>
                      <input type="number" value={simAmount} onChange={(e) => setSimAmount(e.target.value)} />
                    </div>
                    <div className="input-group">
                      <label>Destination Chain</label>
                      <select value={simTarget} onChange={(e) => setSimTarget(e.target.value)}>
                        <option value="Base">Base Network</option>
                        <option value="Ethereum">Ethereum Mainnet</option>
                        <option value="Arbitrum">Arbitrum One</option>
                      </select>
                    </div>
                    <button className="simulate-btn" onClick={runSimulation} disabled={simulating}>
                      {simulating ? 'Analyzing Markets...' : 'Find Optimal Route'}
                    </button>
                  </div>

                  {routes && (
                    <div className="routes-results fade-in">
                      <h4>Engine Recommendations</h4>
                      {routes.map((r, i) => (
                        <div key={i} className={`route-card ${r.recommended ? 'recommended-route' : ''}`}>
                          <div className="route-info">
                            <strong>{r.name}</strong>
                            {r.recommended && <span className="rec-badge">Agent Pick</span>}
                          </div>
                          <div className="route-stats">
                            <span>⏱ {r.time}</span>
                            <span>⛽ {r.gas}</span>
                            <span className={`risk-score risk-${r.risk < 20 ? 'low' : r.risk < 50 ? 'med' : 'high'}`}>
                              Risk: {r.risk}/100
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'risk' && (
                <div className="info-card fade-in">
                  <h3 className="info-title">Global Risk Constraints</h3>
                  <div className="info-desc">
                    <p>Adjust the autonomous boundaries of your IntentBridge Agent.</p>
                  </div>
                  <div className="risk-settings">
                    <div className="setting-item">
                      <div className="setting-label">
                        <strong>Max Allowed Slippage</strong>
                        <span>Agent will pause if slippage exceeds this.</span>
                      </div>
                      <div className="setting-control">
                        <span className="value">0.5%</span>
                        <input type="range" min="0.1" max="5" step="0.1" defaultValue="0.5" />
                      </div>
                    </div>
                    <div className="setting-item">
                      <div className="setting-label">
                        <strong>Volatility Auto-Pause</strong>
                        <span>Halt execution during extreme market moves.</span>
                      </div>
                      <div className="setting-control">
                        <label className="switch">
                          <input type="checkbox" defaultChecked />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                    <div className="setting-item">
                      <div className="setting-label">
                        <strong>Nostr DM Fallback</strong>
                        <span>Allow agent to negotiate unmatched intents.</span>
                      </div>
                      <div className="setting-control">
                        <label className="switch">
                          <input type="checkbox" defaultChecked />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'edu' && (
                <div className="info-card fade-in">
                  <h3 className="info-title">Atomic Swaps vs Legacy</h3>
                  <ul className="perk-list">
                    <li>
                      <div className="perk-icon">✓</div>
                      <div>
                        <strong>Atomic Swap (IntentBridge)</strong>
                        <span>Zero centralized honeypots. Transactions either succeed entirely or fail safely via Hashed Timelock Contracts.</span>
                      </div>
                    </li>
                    <li className="danger-item">
                      <div className="perk-icon danger-icon">⚠</div>
                      <div>
                        <strong>Lock & Mint (Legacy)</strong>
                        <span>Assets locked in a massive smart contract—prime targets for multi-million dollar hacks.</span>
                      </div>
                    </li>
                    <li className="danger-item">
                      <div className="perk-icon danger-icon">⚠</div>
                      <div>
                        <strong>Liquidity Networks</strong>
                        <span>Subject to pool depletion, leading to transaction stalls and massive slippage.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
