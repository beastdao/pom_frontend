import {  createConfig } from "wagmi";
import { localhost,sepolia } from 'wagmi/chains';
import {  getDefaultConfig } from "connectkit";

const walletConnectProjectId : string = process.env.REACT_APP_WALLET_CONNECT!;
// Choose which chains you'd like to show
const chains = [sepolia];


const config = createConfig(
  getDefaultConfig({
    appName: "POM",
    walletConnectProjectId,
    chains,

  }),
);


export default config;
