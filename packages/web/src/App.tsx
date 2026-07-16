import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [intents, setIntents] = useState<any[]>([]);
  const [stats, setStats] = useState({ bridgesCompleted: 0, totalVolume: '0' });

  useEffect(() => {
    // Mock fetching from Agent/Backend
    setIntents([
      { id: '1', token: 'UCT', amount: '500', targetChain: 'Base', status: 'completed' },
      { id: '2', token: 'UCT', amount: '1200', targetChain: 'Ethereum', status: 'open' },
    ]);
    setStats({ bridgesCompleted: 15, totalVolume: '45,200 UCT' });
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>IntentBridge Dashboard</h1>
        <p>Unicity Labs Sphere SDK v2 - Autonomous Cross-Chain Bridge</p>
      </header>
      
      <main className="main-content">
        <section className="stats-card">
          <h2>Agent Stats</h2>
          <div className="stats-grid">
            <div className="stat-box">
              <h3>{stats.bridgesCompleted}</h3>
              <p>Completed Bridges</p>
            </div>
            <div className="stat-box">
              <h3>{stats.totalVolume}</h3>
              <p>Total Volume</p>
            </div>
          </div>
        </section>

        <section className="intents-section">
          <h2>Active Intents</h2>
          <table className="intents-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Token</th>
                <th>Amount</th>
                <th>Target Chain</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {intents.map(intent => (
                <tr key={intent.id}>
                  <td>{intent.id}</td>
                  <td>{intent.token}</td>
                  <td>{intent.amount}</td>
                  <td>{intent.targetChain}</td>
                  <td>
                    <span className={`status-badge status-${intent.status}`}>
                      {intent.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default App;
