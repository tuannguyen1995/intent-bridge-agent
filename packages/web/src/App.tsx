import { useState, useEffect, useRef } from 'react';
import './App.css';

const TerminalIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>;
const RouteIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="19" r="3"></circle><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"></path><circle cx="18" cy="5" r="3"></circle></svg>;
const ArrowLeftIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
const GithubIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;

const mockLogs = [
  "[SYSTEM] Initializing Unicity Sphere SDK v2 Engine...",
  "[NETWORK] Connected: wss://rpc.testnet.unicity.network",
  "[AGENT] Synchronizing global intent states...",
  "[MEMPOOL] Detected intent: 500 UCT → Base Network",
  "[ROUTING] Calculating multi-hop atomic paths...",
  "[ROUTING] Optimal path selected: Atomic Fast (Est: 42ms)",
  "[HTLC] Executing Hash Time-Locked Contract lock...",
  "[ESCROW] Lock verified on Unicity Testnet.",
  "[BRIDGE] Awaiting destination chain finality...",
  "[SUCCESS] Settlement complete. Zero slippage applied.",
];

function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'console' | 'settings'>('overview');
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  
  const [logs, setLogs] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [simAmount, setSimAmount] = useState('1000');
  const [simTarget, setSimTarget] = useState('Base');
  const [simulating, setSimulating] = useState(false);
  const [routes, setRoutes] = useState<any[] | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLink = (e: React.MouseEvent, type: string) => {
    e.preventDefault();
    showToast(`${type} module is currently under development for Testnet Phase 2.`);
  };

  // Background Grid Follow Mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.body.style.setProperty('--mouse-x', `${(e.clientX / window.innerWidth) * 100}%`);
      document.body.style.setProperty('--mouse-y', `${(e.clientY / window.innerHeight) * 100}%`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [logs]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < mockLogs.length) {
        setLogs(prev => [...prev, mockLogs[i]]);
        i++;
      } else { i = 2; }
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const runSimulation = () => {
    setSimulating(true); setRoutes(null);
    setTimeout(() => {
      setRoutes([
        { name: 'Atomic Fast', time: 45, timeStr: '~45s', gas: 0.85, risk: 12, recommended: true },
        { name: 'Standard Liquidity Pool', time: 120, timeStr: '~2m', gas: 1.20, risk: 45, recommended: false },
        { name: 'Legacy Lock & Mint', time: 900, timeStr: '~15m', gas: 5.00, risk: 85, recommended: false },
      ]);
      setSimulating(false);
    }, 1200);
  };

  const handleIntentClick = (hash: string) => {
    setSelectedIntent(hash);
  };

  const goBack = () => {
    setSelectedIntent(null);
  };

  return (
    <div className="layout-wrapper">
      <div className="aurora-bg"></div>
      <div className="bg-grid"></div>

      {/* Top Navbar */}
      <nav className="navbar">
        {/* Toast Notification */}
        {toast && (
          <div className="toast fade-in-up">
            <span className="toast-icon">ℹ️</span>
            {toast}
          </div>
        )}

        <div className="nav-container">
          <div className="nav-left">
            <div className="logo-dot"></div>
            <span className="brand">IntentBridge</span>
            <div className="nav-links">
              <a href="#" onClick={(e) => handleLink(e, 'Documentation')}>Docs</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('overview'); setSelectedIntent(null); }}>Mempool</a>
              <a href="#" onClick={(e) => handleLink(e, 'Testnet Faucet')}>Faucet</a>
            </div>
          </div>
          <div className="nav-center">
            <button className={`nav-tab ${activeTab === 'overview' && !selectedIntent ? 'active' : ''}`} onClick={() => {setActiveTab('overview'); setSelectedIntent(null);}}>Overview</button>
            <button className={`nav-tab ${activeTab === 'console' && !selectedIntent ? 'active' : ''}`} onClick={() => {setActiveTab('console'); setSelectedIntent(null);}}>Agent Console</button>
            <button className={`nav-tab ${activeTab === 'settings' && !selectedIntent ? 'active' : ''}`} onClick={() => {setActiveTab('settings'); setSelectedIntent(null);}}>Settings</button>
          </div>
          <div className="nav-right">
            <a href="https://github.com/Unicity-Network" target="_blank" rel="noreferrer" className="github-link"><GithubIcon /></a>
            <div className="status-indicator">
              <span className="dot"></span>
              Operational
            </div>
            <div className="avatar"></div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        
        {/* BREADCRUMB */}
        <div className="breadcrumb fade-in">
          <span>Home</span> 
          <span className="separator">/</span>
          <span className={!selectedIntent ? 'active-crumb' : ''}>
            {activeTab === 'overview' ? 'Dashboard' : activeTab === 'console' ? 'Agent Console' : 'Settings'}
          </span>
          {selectedIntent && (
            <>
              <span className="separator">/</span>
              <span className="active-crumb">Intent Details</span>
            </>
          )}
        </div>

        {/* INTENT DETAILS VIEW (DEEP NAVIGATION) */}
        {selectedIntent ? (
          <div className="tab-section fade-in">
            <header className="section-header">
              <button className="btn-back magnetic" onClick={goBack}>
                <ArrowLeftIcon /> Back to Dashboard
              </button>
              <h1 className="title mt-6">Intent Details</h1>
              <p className="font-mono text-muted">{selectedIntent}</p>
            </header>
            
            <div className="content-card p-8">
              <div className="detail-grid">
                <div className="d-item">
                  <span className="d-label">Source Network</span>
                  <span className="d-val">Unicity Testnet v2</span>
                </div>
                <div className="d-item">
                  <span className="d-label">Destination Network</span>
                  <span className="d-val">Base</span>
                </div>
                <div className="d-item">
                  <span className="d-label">Asset & Volume</span>
                  <span className="d-val">500.00 UCT</span>
                </div>
                <div className="d-item">
                  <span className="d-label">Execution Agent</span>
                  <span className="d-val font-mono">0xAgent...BEEF</span>
                </div>
                <div className="d-item col-span-2 mt-4">
                  <span className="d-label">Cryptographic Escrow Proof</span>
                  <div className="proof-box font-mono">
                    BEGIN HTLC PROOF --
                    hash_lock: 0x8a9b2c3d4e5f...
                    time_lock: 1718294400
                    signature: 0xabc123...
                    -- END PROOF
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="tab-section fade-in">
                <header className="section-header">
                  <h1 className="title">Network Overview</h1>
                  <p className="subtitle">Real-time metrics and autonomous Mempool execution.</p>
                </header>

                <div className="metrics-row">
                  <div className="metric-card">
                    <span className="m-label">Total Volume (USD)</span>
                    <span className="m-value">$1,425,800</span>
                    <span className="m-sub text-green">↑ 12.5% vs last week</span>
                  </div>
                  <div className="metric-card">
                    <span className="m-label">Intents Executed</span>
                    <span className="m-value">894</span>
                    <span className="m-sub text-muted">99.9% success rate</span>
                  </div>
                  <div className="metric-card">
                    <span className="m-label">Network Risk Score</span>
                    <span className="m-value">12</span>
                    <span className="m-sub text-muted">Out of 100</span>
                  </div>
                  <div className="metric-card">
                    <span className="m-label">Active Nodes</span>
                    <span className="m-value">42</span>
                    <span className="m-sub text-muted">Global distribution</span>
                  </div>
                </div>

                {/* VIP Feature: Mempool Visualizer */}
                <div className="content-card mt-8 mempool-card">
                  <div className="card-header">
                    <h2>Live Mempool Visualizer</h2>
                    <span className="live-badge">SYNCING</span>
                  </div>
                  <div className="mempool-stage">
                    <div className="mempool-lane">
                      <div className="tx-block click-target" onClick={() => handleIntentClick('0x8F1A...42B9')}>
                        <div className="tx-head">0x8F1A...42B9</div>
                        <div className="tx-body">500 UCT → Base</div>
                        <div className="tx-status success">Settled</div>
                      </div>
                      <div className="tx-block click-target delay-1" onClick={() => handleIntentClick('0x9B2C...11A3')}>
                        <div className="tx-head">0x9B2C...11A3</div>
                        <div className="tx-body">1.2K USDC → Arb</div>
                        <div className="tx-status routing">Routing...</div>
                      </div>
                      <div className="tx-block click-target delay-2" onClick={() => handleIntentClick('0x3D8E...99FF')}>
                        <div className="tx-head">0x3D8E...99FF</div>
                        <div className="tx-body">250 UCT → Opt</div>
                        <div className="tx-status pending">Pending</div>
                      </div>
                    </div>
                    <div className="agent-catcher">
                      <div className="agent-core">IntentBridge Agent Node</div>
                      <div className="agent-beams">
                        <div className="beam b1"></div>
                        <div className="beam b2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AGENT CONSOLE TAB */}
            {activeTab === 'console' && (
              <div className="tab-section fade-in">
                <header className="section-header">
                  <h1 className="title">Agent Console</h1>
                  <p className="subtitle">Monitor autonomous execution and simulate intent routing.</p>
                </header>

                <div className="console-grid">
                  <div className="content-card terminal-container">
                    <div className="card-header terminal-header">
                      <h2><TerminalIcon /> Execution Logs</h2>
                      <span className="live-pulse"></span>
                    </div>
                    <div className="terminal-body" ref={terminalRef}>
                      {logs.map((log, index) => (
                        <div key={index} className="t-line">
                          <span className="t-time">{new Date().toLocaleTimeString()}</span>
                          <span className={`t-msg ${log.includes('[SUCCESS]') ? 'text-green' : 'text-white'}`}>
                            {log}
                          </span>
                        </div>
                      ))}
                      <div className="t-line t-cursor">_</div>
                    </div>
                  </div>

                  <div className="content-card simulator-container">
                    <div className="card-header">
                      <h2><RouteIcon /> Route Engine Simulator</h2>
                    </div>
                    <div className="form-group-row">
                      <div className="input-box">
                        <label>Amount (UCT)</label>
                        <input type="number" value={simAmount} onChange={e => setSimAmount(e.target.value)} />
                      </div>
                      <div className="input-box">
                        <label>Destination Chain</label>
                        <select value={simTarget} onChange={e => setSimTarget(e.target.value)}>
                          <option>Base Network</option>
                          <option>Ethereum Mainnet</option>
                          <option>Arbitrum One</option>
                        </select>
                      </div>
                    </div>
                    <button className="btn-primary full-width mt-4 magnetic" onClick={runSimulation} disabled={simulating}>
                      {simulating ? 'Analyzing Paths...' : 'Simulate Route'}
                    </button>

                    {routes && (
                      <div className="routes-display fade-in mt-6">
                        <h3>Optimal Path Analysis</h3>
                        <div className="routes-list">
                          {routes.map((r, i) => (
                            <div key={i} className={`route-row ${r.recommended ? 'recommended' : ''}`}>
                              <div className="r-left">
                                <span className="r-name">{r.name}</span>
                                {r.recommended && <span className="r-badge">Agent Pick</span>}
                              </div>
                              <div className="r-right">
                                <span className="r-stat">Est. {r.timeStr}</span>
                                <span className="r-stat">Gas: ${r.gas}</span>
                                <span className={`r-stat ${r.risk < 20 ? 'text-green' : 'text-orange'}`}>Risk: {r.risk}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="tab-section fade-in">
                <header className="section-header">
                  <h1 className="title">Risk Controls</h1>
                  <p className="subtitle">Configure global boundaries for the IntentBridge autonomous agent.</p>
                </header>

                <div className="content-card settings-card">
                  <div className="setting-row">
                    <div className="s-info">
                      <h3>Max Slippage Tolerance</h3>
                      <p>The maximum allowed slippage during atomic swaps before the agent pauses execution.</p>
                    </div>
                    <div className="s-action">
                      <div className="input-suffix">
                        <input type="number" defaultValue="0.5" step="0.1" />
                        <span>%</span>
                      </div>
                    </div>
                  </div>

                  <div className="setting-row">
                    <div className="s-info">
                      <h3>Volatility Auto-Pause</h3>
                      <p>Automatically halt operations when extreme network congestion or price volatility is detected.</p>
                    </div>
                    <div className="s-action">
                      <label className="toggle">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="action-footer mt-6">
                  <button className="btn-primary magnetic">Save Configuration</button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Expanded Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="f-left">
            <div className="logo-dot"></div>
            <span className="brand">IntentBridge</span>
            <p className="f-desc">Autonomous cross-chain settlement protocol.</p>
            <span className="f-copy">© 2026 IntentBridge Labs.</span>
          </div>
          <div className="f-links">
            <div className="link-col">
              <h4>Protocol</h4>
              <a href="#" onClick={(e) => handleLink(e, 'Whitepaper')}>Whitepaper</a>
              <a href="#" onClick={(e) => handleLink(e, 'Security Audits')}>Security Audits</a>
              <a href="https://github.com/Unicity-Network" target="_blank" rel="noreferrer">Github</a>
            </div>
            <div className="link-col">
              <h4>Resources</h4>
              <a href="#" onClick={(e) => handleLink(e, 'Developer API')}>Developer API</a>
              <a href="https://unicity.network" target="_blank" rel="noreferrer">Unicity Network</a>
              <a href="#" onClick={(e) => handleLink(e, 'Brand Assets')}>Brand Assets</a>
            </div>
          </div>
          <div className="f-right">
            <div className="badge-wrap">
              <span className="badge-title">Built for</span>
              <span className="badge-main">Unicity Builder Program</span>
            </div>
            <div className="server-status">
              <span className="dot"></span> All systems normal.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
