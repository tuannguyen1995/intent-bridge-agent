# IntentBridge Agent

**IntentBridge Agent** is a sophisticated, autonomous Cross-Chain Bridge Agent built for the **Unicity Builder Program** (Primary Track: Payments and Markets). It enables seamless, intent-based token bridging between Unicity Testnet v2 and external EVM chains without human intervention.

## 🌟 Why This Project Shines (XP Optimization)

### Deep SDK Usage
- **Identity & NameTags:** Utilizes `@unicitylabs/sphere-sdk` Node & Wallet Providers to manage its autonomous identity.
- **Signed Intents Market:** Continuously scans and filters the decentralized intents market.
- **Atomic Swaps & Escrow:** Executes atomic swaps by locking funds in escrow, verifying external chain receipts, and settling on Unicity.

### Strongly Agentic
The core agent loop runs completely autonomously. It:
1. **Discovers Intents:** Scans for bridge requests.
2. **Evaluates Routes:** Calculates the best route, considering liquidity, fees, slippage, and dynamic risk (volatility pausing).
3. **Executes & Settles:** Manages cross-chain transactions and releases escrow autonomously.
4. **Negotiates via DM:** Falls back to Nostr encrypted DMs to negotiate terms for complex/unmatched intents.

### AstridOS Compatible
Designed to run seamlessly within an AstridOS sandbox. A `Dockerfile` is provided for containerized execution.

## 🛠 Project Structure (Monorepo)

- `packages/core`: The autonomous agent loop, intents monitor, routing engine, escrow executor, and Nostr DM fallback.
- `packages/cli`: A command-line interface to manage the agent.
- `packages/web`: A modern React dashboard to monitor intents, volume, and agent performance.

## 🚀 Setup & Execution (Testnet v2)

### Prerequisites
- Node.js v18+
- Unicity Testnet v2 Wallet Private Key

### 1. Install Dependencies
```bash
# From the intent-bridge root:
npm install
```

### 2. Configure Environment
Create a `.env` file in `packages/cli` (or root):
```env
PRIVATE_KEY="your_unicity_testnet_v2_private_key"
RPC_URL="https://base-sepolia.g.alchemy.com/v2/your_key"
```

### 3. Build the Project
```bash
npm run build --workspaces
```

### 4. Run the Agent (CLI)
```bash
cd packages/cli
npm run start -- --private-key <key> --max-risk 40
```

### 5. Run the Web Dashboard
```bash
cd packages/web
npm run dev
```

## 🐋 AstridOS Sandbox Execution
To run the agent securely inside AstridOS:
```bash
docker build -t intent-bridge-agent .
docker run --env-file .env intent-bridge-agent
```
