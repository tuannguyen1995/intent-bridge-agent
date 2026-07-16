import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [intents, setIntents] = useState<any[]>([]);
  const [stats, setStats] = useState({ bridgesCompleted: 0, totalVolume: '0' });
  const [activeTab, setActiveTab] = useState('atomic');

  useEffect(() => {
    // Mock fetching from Agent/Backend
    setIntents([
      { id: '1', token: 'UCT', amount: '500', targetChain: 'Base', status: 'completed' },
      { id: '2', token: 'UCT', amount: '1200', targetChain: 'Ethereum', status: 'open' },
      { id: '3', token: 'USDC', amount: '8500', targetChain: 'Arbitrum', status: 'matched' },
    ]);
    setStats({ bridgesCompleted: 24, totalVolume: '142,500 UCT' });
  }, []);

  return (
    <div className="container">
      <div className="ambient-background"></div>
      
      <header className="header">
        <div className="badge">Sphere SDK v2 Powered</div>
        <h1>IntentBridge <span className="text-gradient">Agent</span></h1>
        <p>The first autonomous cross-chain bridge driven entirely by intents.</p>
      </header>
      
      <main className="main-content">
        <div className="dashboard-grid">
          {/* Left Column: Stats & Intents */}
          <div className="left-column">
            <section className="glass-card premium-card">
              <div className="card-header">
                <h2>Agent Performance</h2>
                <div className="pulse-indicator">
                  <span className="pulse-dot"></span> Live
                </div>
              </div>
              <div className="stats-grid">
                <div className="stat-box">
                  <p className="stat-label">Completed Bridges</p>
                  <h3 className="stat-value">{stats.bridgesCompleted}</h3>
                </div>
                <div className="stat-box">
                  <p className="stat-label">Total Volume</p>
                  <h3 className="stat-value text-gradient">{stats.totalVolume}</h3>
                </div>
              </div>
            </section>

            <section className="glass-card intents-section">
              <h2>Active Market Intents</h2>
              <div className="table-responsive">
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
                      <tr key={intent.id} className="table-row-hover">
                        <td className="font-mono text-muted">#{intent.id}</td>
                        <td className="font-semibold">{intent.token}</td>
                        <td>{intent.amount}</td>
                        <td>
                          <span className="chain-pill">{intent.targetChain}</span>
                        </td>
                        <td>
                          <span className={`status-badge status-${intent.status}`}>
                            {intent.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Right Column: Knowledge Hub */}
          <div className="right-column">
            <section className="glass-card knowledge-hub">
              <h2>Cross-Chain Architecture Hub</h2>
              <p className="text-muted text-sm mb-4">
                Hiểu rõ cơ chế hoạt động của IntentBridge so với các giải pháp truyền thống.
              </p>

              <div className="tabs">
                <button 
                  className={`tab-btn ${activeTab === 'atomic' ? 'active' : ''}`}
                  onClick={() => setActiveTab('atomic')}
                >
                  Atomic Swap (IntentBridge)
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'lockMint' ? 'active' : ''}`}
                  onClick={() => setActiveTab('lockMint')}
                >
                  Lock & Mint
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'liquidity' ? 'active' : ''}`}
                  onClick={() => setActiveTab('liquidity')}
                >
                  Liquidity Networks
                </button>
              </div>

              <div className="tab-content">
                {activeTab === 'atomic' && (
                  <div className="mechanism-card">
                    <h3 className="text-gradient">Cơ chế Atomic Swap (Hoán đổi nguyên tử)</h3>
                    <p>
                      <strong>Định nghĩa:</strong> Hai bên trao đổi tài sản trên hai blockchain khác nhau một cách đồng thời (atomic) và phi tập trung.
                    </p>
                    <ul className="feature-list">
                      <li>✅ <strong>Bảo mật tối đa:</strong> Không cần trust (tin tưởng) bên thứ ba. Giao dịch thành công 100% hoặc thất bại hoàn toàn và hoàn tiền (sử dụng Hashed Timelock Contracts - HTLC).</li>
                      <li>✅ <strong>Không rủi ro Honeypot:</strong> Tài sản không bị tập trung ở một Smart Contract lớn dễ bị hacker tấn công.</li>
                      <li>💡 <strong>Cách IntentBridge hoạt động:</strong> Agent tự động tìm người có nhu cầu ngược lại (hoặc thanh khoản có sẵn) và tạo ra một Atomic Swap. Agent sẽ theo dõi và khóa quỹ (Escrow) tự động thay cho người dùng.</li>
                    </ul>
                  </div>
                )}

                {activeTab === 'lockMint' && (
                  <div className="mechanism-card">
                    <h3>Lock & Mint (Ví dụ: WBTC, Portal)</h3>
                    <p>
                      <strong>Định nghĩa:</strong> Bạn khóa tài sản ở chain gốc (Lock) vào một Smart Contract, và một Validator sẽ đúc (Mint) token tương đương (Wrapped Token) ở chain đích.
                    </p>
                    <ul className="feature-list warning-list">
                      <li>⚠️ <strong>Rủi ro tập trung (Honeypot):</strong> Nơi khóa tài sản chứa hàng trăm triệu USD, là mục tiêu số 1 của Hacker (ví dụ vụ hack Ronin, Wormhole).</li>
                      <li>⚠️ <strong>Wrapped Token:</strong> Bạn không nhận được token thực sự ở chain đích mà chỉ là giấy ghi nợ (Wrapped version). Nếu bridge sập, Wrapped Token mất giá trị.</li>
                    </ul>
                  </div>
                )}

                {activeTab === 'liquidity' && (
                  <div className="mechanism-card">
                    <h3>Liquidity Networks (Ví dụ: Stargate, Hop)</h3>
                    <p>
                      <strong>Định nghĩa:</strong> Bridge duy trì các bể thanh khoản (Pool) ở cả hai chain. Người dùng nạp token gốc vào Pool A và rút token gốc từ Pool B.
                    </p>
                    <ul className="feature-list warning-list">
                      <li>✅ <strong>Native Token:</strong> Nhận được token gốc (USDC thật) thay vì Wrapped Token.</li>
                      <li>⚠️ <strong>Cạn kiệt thanh khoản:</strong> Nếu quá nhiều người muốn chuyển sang Chain B, Pool B sẽ hết tiền và giao dịch bị kẹt hoặc phí trượt giá (Slippage) cực kỳ cao.</li>
                      <li>⚠️ <strong>Chi phí vốn lớn:</strong> Yêu cầu giao thức phải huy động rất nhiều tiền nhàn rỗi để tạo pool.</li>
                    </ul>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
