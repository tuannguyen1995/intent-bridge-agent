export const createNodeProviders = (config: any) => {
    return { network: config.network };
};

export const createWalletApiProviders = (config: any) => {
    return { 
        network: config.network,
        intents: {
            search: async () => []
        },
        escrow: {
            lock: async () => true
        },
        payments: {
            settle: async () => true
        }
    };
};
