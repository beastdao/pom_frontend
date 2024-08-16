import {  createConfig } from "wagmi";
import { sepolia,mainnet } from 'wagmi/chains';
import {  getDefaultConfig } from "connectkit";

const walletConnectProjectId : string = process.env.REACT_APP_WALLET_CONNECT!;

const env = process.env.REACT_APP_ENV;
// Choose which chains you'd like to show
const chains = env === 'mainnet' ? [mainnet] : env === 'sepolia' ? [sepolia] : [sepolia];

const config = createConfig(
  getDefaultConfig({
    appName: "POM",
    walletConnectProjectId,
    chains,
  }),
);


export default config;
