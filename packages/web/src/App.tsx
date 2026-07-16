import { useState, useEffect, useRef } from 'react';
import './App.css';

// Premium SVG Icons
const ActivityIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;
const ZapIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
const ShieldIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
const GlobeIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>;
const TerminalIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>;
const RouteIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="19" r="3"></circle><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"></path><circle cx="18" cy="5" r="3"></circle></svg>;
const LockIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;

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
        { name: 'Atomic Path (Agent Recommended)', time: '~45s', gas: '$0.85', risk: 12, recommended: true },
        { name: 'Standard Liquidity Pool', time: '~2m', gas: '$1.20', risk: 45, recommended: false },
        { name: 'Legacy Lock & Mint', time: '~15m', gas: '$5.00', risk: 85, recommended: false },
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
          <div className="version-badge">BETA v2.0</div>
        </div>
        <div className="header-actions">
          <div className="live-status">
            <span className="pulsing-dot"></span>
            Sphere SDK Active
          </div>
          <button className="primary-btn">Connect Workspace</button>
        </div>
      </header>

      <main className="pro-main">
        {/* Minimal Hero */}
        <section className="hero-block">
          <h1 className="hero-text">Intelligent Cross-Chain <br/><span className="highlight-text">Autonomous Settlement</span></h1>
          <p className="hero-subtext">Zero honeypots. Absolute atomic precision. Powered by Unicity Agentic Networks.</p>
        </section>

        {/* Top Metrics Row */}
        <section className="metrics-grid">
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
            <div className="metric-icon-wrap"><LockIcon /></div>
            <div className="metric-data">
              <span className="metric-label">Current Escrow Value</span>
              <span className="metric-val">$45,200.00</span>
            </div>
          </div>
        </section>

        {/* Bento Grid Layout */}
        <section className="bento-grid">
          
          {/* Large Terminal Block */}
          <div className="bento-card col-span-2 terminal-card">
            <div className="card-top">
              <h3 className="card-title"><TerminalIcon /> Agent Execution Logs</h3>
              <span className="badge-outline">Live Feed</span>
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

          {/* Route Simulator Block */}
          <div className="bento-card">
            <div className="card-top">
              <h3 className="card-title"><RouteIcon /> Route Simulator</h3>
            </div>
            <div className="simulator-body">
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
                {simulating ? 'Analyzing Graph...' : 'Calculate Optimal Path'}
              </button>
              
              {routes && (
                <div className="routes-list mt-4">
                  {routes.map((r, i) => (
                    <div key={i} className={`route-item ${r.recommended ? 'route-active' : ''}`}>
                      <div className="route-header">
                        <span className="route-name">{r.name}</span>
                      </div>
                      <div className="route-meta">
                        <span>{r.time}</span> • <span>{r.gas}</span> • <span className={r.risk < 20 ? 'text-green' : 'text-orange'}>Risk: {r.risk}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Live Orderbook Block */}
          <div className="bento-card col-span-2">
            <div className="card-top">
              <h3 className="card-title"><GlobeIcon /> Global Intent Orderbook</h3>
              <button className="text-btn">View All</button>
            </div>
            <div className="table-responsive">
              <table className="pro-table">
                <thead>
                  <tr>
                    <th>Intent Hash</th>
                    <th>Volume</th>
                    <th>Destination</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-mono text-dim">0x8F1A...42B9</td>
                    <td className="font-medium">500.00 UCT</td>
                    <td>Base Network</td>
                    <td><span className="pro-tag tag-success">Settled</span></td>
                  </tr>
                  <tr>
                    <td className="font-mono text-dim">0x9B2C...11A3</td>
                    <td className="font-medium">1,200.50 USDC</td>
                    <td>Arbitrum</td>
                    <td><span className="pro-tag tag-processing">Routing</span></td>
                  </tr>
                  <tr>
                    <td className="font-mono text-dim">0x3D8E...99FF</td>
                    <td className="font-medium">250.00 UCT</td>
                    <td>Optimism</td>
                    <td><span className="pro-tag tag-open">Open</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Risk Limits Block */}
          <div className="bento-card">
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
