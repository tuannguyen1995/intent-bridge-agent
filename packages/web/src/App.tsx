import { useState, useEffect, useRef } from 'react';
import './App.css';

// Premium SVG Icons
const ActivityIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;
const ZapIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
const ShieldIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
const GlobeIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>;
const TerminalIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>;
const RouteIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="19" r="3"></circle><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"></path><circle cx="18" cy="5" r="3"></circle></svg>;
const BrainIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path></svg>;

const mockLogs = [
  "[SYSTEM] Initializing Unicity Sphere SDK v2 Engine...",
  "[NETWORK] Connected: wss://rpc.testnet.unicity.network",
  "[AGENT_NODE] Synchronizing global intent states...",
  "[MEMPOOL] Detected intent: 500 UCT → Base Network",
  "[ROUTING] Calculating multi-hop atomic paths...",
  "[ROUTING] Optimal path selected: Atomic Fast (Est: 42ms)",
  "[HTLC] Executing Hash Time-Locked Contract lock...",
  "[ESCROW] Lock verified on Unicity Testnet.",
  "[BRIDGE] Awaiting destination chain finality...",
  "[SUCCESS] Settlement complete. Zero slippage applied.",
  "[AGENT_NODE] Idling. Monitoring mempool...",
];

function App() {
  const [logs, setLogs] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [simAmount, setSimAmount] = useState('1000');
  const [simTarget, setSimTarget] = useState('Base');
  const [simulating, setSimulating] = useState(false);
  const [routes, setRoutes] = useState<any[] | null>(null);
  const [auditOpen, setAuditOpen] = useState(false);

  // Mouse tracking for glowing borders
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.querySelectorAll('.bento-card').forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      });
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
    setSimulating(true); setRoutes(null); setAuditOpen(false);
    setTimeout(() => {
      setRoutes([
        { name: 'Atomic Fast (Agent Pick)', time: 45, timeStr: '~45s', gas: 0.85, risk: 12, recommended: true },
        { name: 'Standard Liquidity Pool', time: 120, timeStr: '~2m', gas: 1.20, risk: 45, recommended: false },
        { name: 'Legacy Lock & Mint', time: 900, timeStr: '~15m', gas: 5.00, risk: 85, recommended: false },
      ]);
      setSimulating(false);
    }, 1200);
  };

  return (
    <div className="pro-container">
      {/* Background Gradients */}
      <div className="ambient-light main-glow"></div>
      <div className="ambient-light secondary-glow"></div>
      <div className="noise-overlay"></div>

      {/* Modern Navbar */}
      <header className="pro-header">
        <div className="logo-section">
          <div className="brand-orb"></div>
          <span className="brand-name">IntentBridge</span>
          <div className="version-badge">GOD-TIER v3.0</div>
        </div>
        <div className="header-actions">
          <div className="live-status">
            <span className="pulsing-dot"></span>
            Agent Network Online
          </div>
          <button className="primary-btn">Connect Workspace</button>
        </div>
      </header>

      <main className="pro-main">
        {/* Minimal Hero */}
        <section className="hero-block animate-fade-in-up">
          <h1 className="hero-text">Intelligent Cross-Chain <br/><span className="highlight-text">Autonomous Settlement</span></h1>
          <p className="hero-subtext">Zero honeypots. Absolute atomic precision. Powered by Unicity Agentic Networks.</p>
        </section>

        {/* Top Metrics Row */}
        <section className="metrics-grid animate-fade-in-up delay-1">
          <div className="metric-box">
            <div className="metric-icon-wrap"><ZapIcon /></div>
            <div className="metric-data">
              <span className="metric-label">Total Bridged Volume</span>
              <span className="metric-val">$1,425,800.00</span>
            </div>
          </div>
          <div className="metric-box">
            <div className="metric-icon-wrap"><ActivityIcon /></div>
            <div className="metric-data">
              <span className="metric-label">Successful Intents</span>
              <span className="metric-val">894</span>
            </div>
          </div>
          <div className="metric-box">
            <div className="metric-icon-wrap"><ShieldIcon /></div>
            <div className="metric-data">
              <span className="metric-label">Network Risk Score</span>
              <span className="metric-val text-green">12 / 100</span>
            </div>
          </div>
          <div className="metric-box">
            <div className="metric-icon-wrap"><GlobeIcon /></div>
            <div className="metric-data">
              <span className="metric-label">Active Nodes</span>
              <span className="metric-val text-blue">42 Global</span>
            </div>
          </div>
        </section>

        {/* Bento Grid Layout */}
        <section className="bento-grid">
          
          {/* Interactive Cross-Chain Node Graph */}
          <div className="bento-card col-span-2 animate-fade-in-up delay-2">
            <div className="card-top">
              <h3 className="card-title"><GlobeIcon /> Live Cross-Chain Routing Graph</h3>
              <span className="badge-outline">Real-time</span>
            </div>
            <div className="graph-container">
              <svg className="node-graph" viewBox="0 0 600 200">
                {/* Lines */}
                <path className="graph-line" d="M 300 100 L 100 100" />
                <path className="graph-line" d="M 300 100 L 500 50" />
                <path className="graph-line" d="M 300 100 L 500 150" />
                
                {/* Data Packets (Animations) */}
                <circle className="data-packet p-1" r="3" fill="#8b5cf6" />
                <circle className="data-packet p-2" r="3" fill="#8b5cf6" />
                <circle className="data-packet p-3" r="3" fill="#8b5cf6" />

                {/* Nodes */}
                <g className="node unicity-node">
                  <circle cx="300" cy="100" r="15" fill="#1a1a1a" stroke="#8b5cf6" strokeWidth="2" />
                  <circle cx="300" cy="100" r="25" fill="none" stroke="#8b5cf6" strokeWidth="1" className="pulse-ring" />
                  <text x="300" y="135" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="600">Unicity Agent</text>
                </g>
                <g className="node">
                  <circle cx="100" cy="100" r="12" fill="#1a1a1a" stroke="#3b82f6" strokeWidth="2" />
                  <text x="100" y="130" textAnchor="middle" fill="#888" fontSize="11">Ethereum</text>
                </g>
                <g className="node">
                  <circle cx="500" cy="50" r="12" fill="#1a1a1a" stroke="#10b981" strokeWidth="2" />
                  <text x="500" y="80" textAnchor="middle" fill="#888" fontSize="11">Base</text>
                </g>
                <g className="node">
                  <circle cx="500" cy="150" r="12" fill="#1a1a1a" stroke="#f59e0b" strokeWidth="2" />
                  <text x="500" y="180" textAnchor="middle" fill="#888" fontSize="11">Arbitrum</text>
                </g>
              </svg>
            </div>
          </div>

          {/* Large Terminal Block */}
          <div className="bento-card terminal-card animate-fade-in-up delay-3">
            <div className="card-top">
              <h3 className="card-title"><TerminalIcon /> Agent Execution Logs</h3>
            </div>
            <div className="term-wrapper">
              <div className="term-window" ref={terminalRef}>
                {logs.map((log, index) => (
                  <div key={index} className="term-line">
                    <span className="term-time">{new Date().toLocaleTimeString()}</span>
                    <span className={`term-msg ${
                      log.includes('[SYSTEM]') || log.includes('[NETWORK]') ? 'text-dim' :
                      log.includes('[SUCCESS]') ? 'text-green' :
                      log.includes('[HTLC]') || log.includes('[ESCROW]') ? 'text-purple' :
                      log.includes('[ROUTING]') ? 'text-blue' : 'text-white'
                    }`}>{log}</span>
                  </div>
                ))}
                <div className="term-line typing-cursor">█</div>
              </div>
            </div>
          </div>

          {/* Route Simulator Block with Chart */}
          <div className="bento-card col-span-2 animate-fade-in-up delay-4">
            <div className="card-top">
              <h3 className="card-title"><RouteIcon /> Visual Route Engine Simulator</h3>
              {routes && <button className="audit-btn" onClick={() => setAuditOpen(!auditOpen)}><BrainIcon /> Audit Decision</button>}
            </div>
            <div className="simulator-split">
              <div className="sim-controls">
                <div className="pro-input-group">
                  <label>Amount (UCT)</label>
                  <input type="number" value={simAmount} onChange={e => setSimAmount(e.target.value)} />
                </div>
                <div className="pro-input-group">
                  <label>Destination Chain</label>
                  <select value={simTarget} onChange={e => setSimTarget(e.target.value)}>
                    <option>Base Network</option>
                    <option>Ethereum Mainnet</option>
                    <option>Arbitrum One</option>
                  </select>
                </div>
                <button className="pro-btn-full" onClick={runSimulation} disabled={simulating}>
                  {simulating ? 'Analyzing Graph...' : 'Simulate Engine Decision'}
                </button>
              </div>

              <div className="sim-visuals">
                {!routes ? (
                  <div className="empty-chart">Run simulation to view comparative routing graph.</div>
                ) : (
                  <div className="chart-container fade-in">
                    <h4 className="chart-title">Gas & Time Optimization Matrix</h4>
                    <div className="bar-chart">
                      {routes.map((r, i) => (
                        <div key={i} className={`chart-row ${r.recommended ? 'row-active' : ''}`}>
                          <div className="chart-label">{r.name}</div>
                          <div className="chart-bars">
                            <div className="bar gas-bar" style={{ width: `${Math.min(r.gas * 15, 100)}%` }}>${r.gas}</div>
                            <div className="bar time-bar" style={{ width: `${Math.min(r.time / 10, 100)}%` }}>{r.timeStr}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* AI Audit Panel */}
            {auditOpen && routes && (
              <div className="audit-panel fade-in-down">
                <div className="audit-header"><BrainIcon /> Agent Intelligence Audit</div>
                <div className="audit-body">
                  <p><strong>Intent Analysis:</strong> Requesting bridge of {simAmount} UCT to {simTarget}.</p>
                  <p><strong>Decision Rationale:</strong> The <em>Atomic Fast</em> path was selected because it avoids the $5.00 gas fee of Legacy Lock & Mint, and bypasses the 45% risk score of standard Liquidity Pools which currently suffer from high slippage on {simTarget}. Hashed Timelock Contracts guarantee execution safety.</p>
                </div>
              </div>
            )}
          </div>

          {/* Risk Limits Block */}
          <div className="bento-card animate-fade-in-up delay-5">
            <div className="card-top">
              <h3 className="card-title"><ShieldIcon /> Agent Constraints</h3>
            </div>
            <div className="constraints-list">
              <div className="constraint-item">
                <div className="c-info">
                  <span className="c-title">Max Slippage Tolerance</span>
                  <span className="c-desc">Global limit for atomic swaps</span>
                </div>
                <div className="c-val">0.5%</div>
              </div>
              <div className="constraint-item">
                <div className="c-info">
                  <span className="c-title">Volatility Auto-Pause</span>
                  <span className="c-desc">Halt operations on spikes</span>
                </div>
                <div className="c-toggle active"></div>
              </div>
              <div className="constraint-item">
                <div className="c-info">
                  <span className="c-title">DM Negotiation Fallback</span>
                  <span className="c-desc">Nostr protocol messaging</span>
                </div>
                <div className="c-toggle active"></div>
              </div>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}

export default App;
