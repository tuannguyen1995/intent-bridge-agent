import { createNodeProviders, createWalletApiProviders } from './mock-sdk';
import { ethers } from 'ethers';

export interface AgentConfig {
    rpcUrl: string;
    privateKey: string;
}

export class Providers {
    public nodeProvider: any;
    public walletProvider: any;
    public signer: ethers.Wallet;

    constructor(config: AgentConfig) {
        // Setup ethers signer for potential external chain operations
        const provider = new ethers.JsonRpcProvider(config.rpcUrl);
        this.signer = new ethers.Wallet(config.privateKey, provider);

        // Setup Sphere SDK Node Providers
        this.nodeProvider = createNodeProviders({
            network: 'testnet-v2', // Target Unicity Testnet v2
        });

        // Setup Sphere SDK Wallet Providers
        this.walletProvider = createWalletApiProviders({
            network: 'testnet-v2',
            privateKey: config.privateKey, // Agent's identity
        });
    }

    public getNodeProvider() {
        return this.nodeProvider;
    }

    public getWalletProvider() {
        return this.walletProvider;
    }

    public getSigner() {
        return this.signer;
    }
}
