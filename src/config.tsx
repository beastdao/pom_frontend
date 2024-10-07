import { createConfig } from '@wagmi/core';
import { mainnet, sepolia } from '@wagmi/core/chains';
import { getDefaultConfig } from 'connectkit';

const walletConnectProjectId: string = import.meta.env.VITE_APP_WALLET_CONNECT!;

const env = import.meta.env.VITE_APP_ENV;
// Choose which chains you'd like to show
const chains_to_use = env === 'mainnet' ? mainnet : env === 'sepolia' ? sepolia : sepolia;

export const config = createConfig(
    getDefaultConfig({
        appName: 'POM',
        walletConnectProjectId,
        chains: [chains_to_use],
    })
);

export default config;
