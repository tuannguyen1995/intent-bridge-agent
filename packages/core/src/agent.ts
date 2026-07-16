import { Providers, AgentConfig } from './providers';
import { IntentMonitor } from './intents';
import { RoutingEngine } from './routing';
import { EscrowExecutor } from './escrow';
import { DmNegotiator } from './dm';

export class IntentBridgeAgent {
    private providers: Providers;
    private monitor: IntentMonitor;
    private routing: RoutingEngine;
    private escrow: EscrowExecutor;
    private dm: DmNegotiator;
    
    private isRunning: boolean = false;
    private pollIntervalMs: number;

    constructor(config: AgentConfig, maxRiskScore: number = 50, pollIntervalMs: number = 5000) {
        this.providers = new Providers(config);
        this.monitor = new IntentMonitor(this.providers);
        this.routing = new RoutingEngine(maxRiskScore);
        this.escrow = new EscrowExecutor(this.providers);
        this.dm = new DmNegotiator();
        this.pollIntervalMs = pollIntervalMs;
    }

    public async start() {
        if (this.isRunning) return;
        this.isRunning = true;
        console.log('[IntentBridgeAgent] Starting autonomous agent loop...');
        
        while (this.isRunning) {
            try {
                await this.agentLoop();
            } catch (err) {
                console.error('[IntentBridgeAgent] Error in agent loop:', err);
            }
            await new Promise(resolve => setTimeout(resolve, this.pollIntervalMs));
        }
    }

    public stop() {
        this.isRunning = false;
        this.dm.close();
        console.log('[IntentBridgeAgent] Stopped autonomous agent loop.');
    }

    private async agentLoop() {
        // 1. Monitor
        const intents = await this.monitor.scanForBridgeIntents();
        
        for (const intent of intents) {
            if (intent.status !== 'open') continue;
            
            // 2. Route
            const bestRoute = await this.routing.findBestRoute(intent);
            
            if (bestRoute) {
                // 3. Execute
                const success = await this.escrow.executeBridge(intent, bestRoute);
                if (success) {
                    intent.status = 'completed';
                }
            } else {
                // 4. Fallback to DM Negotiation
                const negotiated = await this.dm.negotiate(intent);
                if (negotiated) {
                    // Try execution again if terms accepted
                    console.log(`[IntentBridgeAgent] Retrying execution after successful DM negotiation...`);
                    // Mock retry execution
                }
            }
        }
    }
}
