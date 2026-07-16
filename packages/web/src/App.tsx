import { useState, useEffect } from 'react';
import './App.css';

// SVG Icons
const ActivityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
);
const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);
const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
);

function App() {
  const [intents, setIntents] = useState<any[]>([]);
  const [stats, setStats] = useState({ bridgesCompleted: 0, totalVolume: '0' });
  const [activeTab, setActiveTab] = useState('atomic');

  useEffect(() => {
    setIntents([
      { id: '1A9F', token: 'UCT', amount: '500.00', targetChain: 'Base', status: 'completed' },
      { id: '2B4C', token: 'UCT', amount: '1,200.50', targetChain: 'Ethereum', status: 'processing' },
      { id: '3D8E', token: 'USDC', amount: '8,500.00', targetChain: 'Arbitrum', status: 'matched' },
      { id: '4F1A', token: 'UCT', amount: '250.00', targetChain: 'Optimism', status: 'open' },
    ]);
    setStats({ bridgesCompleted: 894, totalVolume: '1,425,800.50' });
  }, []);

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
            Sphere SDK v2
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
          <div className="panel left-panel">
            <div className="panel-header">
              <h2><ActivityIcon /> Agent Network Status</h2>
            </div>
            
            <div className="metric-cards">
              <div className="metric-card">
                <p className="metric-title">Total Volume Secured</p>
                <h3 className="metric-value">${stats.totalVolume}</h3>
                <div className="metric-trend positive">+12.5% this week</div>
              </div>
              <div className="metric-card">
                <p className="metric-title">Bridges Executed</p>
                <h3 className="metric-value">{stats.bridgesCompleted}</h3>
                <div className="metric-trend positive">99.9% success rate</div>
              </div>
            </div>

            <div className="intents-container">
              <div className="intents-header">
                <h3>Live Intent Orderbook</h3>
                <span className="live-badge">LIVE</span>
              </div>
              <div className="table-wrapper">
                <table className="vip-table">
                  <thead>
                    <tr>
                      <th>Intent Hash</th>
                      <th>Asset</th>
                      <th>Destination</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {intents.map((intent, i) => (
                      <tr key={i}>
                        <td className="hash-col">{intent.id}...</td>
                        <td className="asset-col">
                          <div className="asset-circle"></div>
                          <span className="amount">{intent.amount}</span> {intent.token}
                        </td>
                        <td className="chain-col">
                          <GlobeIcon /> {intent.targetChain}
                        </td>
                        <td>
                          <div className={`status-tag status-${intent.status}`}>
                            {intent.status}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Educational / Features Panel */}
          <div className="panel right-panel">
            <div className="panel-header">
              <h2><ShieldIcon /> Architecture Hub</h2>
              <p className="subtext">Why IntentBridge is superior.</p>
            </div>

            <div className="tab-navigation">
              <button className={`tab-item ${activeTab === 'atomic' ? 'active' : ''}`} onClick={() => setActiveTab('atomic')}>
                <ZapIcon /> Atomic Swap
              </button>
              <button className={`tab-item ${activeTab === 'legacy' ? 'active' : ''}`} onClick={() => setActiveTab('legacy')}>
                <ShieldIcon /> Legacy Bridges
              </button>
            </div>

            <div className="tab-body">
              {activeTab === 'atomic' && (
                <div className="info-card fade-in">
                  <h3 className="info-title">Intent-Based Atomic Swaps</h3>
                  <div className="info-desc">
                    <p>The safest way to bridge. Assets are never held in a centralized honeypot.</p>
                  </div>
                  <ul className="perk-list">
                    <li>
                      <div className="perk-icon">✓</div>
                      <div>
                        <strong>Zero Counterparty Risk</strong>
                        <span>Trades execute completely or fail safely via Hashed Timelock Contracts (HTLC).</span>
                      </div>
                    </li>
                    <li>
                      <div className="perk-icon">✓</div>
                      <div>
                        <strong>Autonomous Execution</strong>
                        <span>The Agent automatically sources liquidity and executes on your behalf.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === 'legacy' && (
                <div className="info-card fade-in">
                  <h3 className="info-title">Lock & Mint / Liquidity Pools</h3>
                  <div className="info-desc">
                    <p>Traditional bridges rely on flawed architectures that expose user funds.</p>
                  </div>
                  <ul className="perk-list danger-list">
                    <li>
                      <div className="perk-icon">⚠</div>
                      <div>
                        <strong>Honeypot Vulnerability</strong>
                        <span>Lock & Mint bridges store billions in a single contract, attracting hackers.</span>
                      </div>
                    </li>
                    <li>
                      <div className="perk-icon">⚠</div>
                      <div>
                        <strong>Liquidity Fragmentation</strong>
                        <span>Pool-based bridges suffer from high slippage when liquidity dries up.</span>
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
