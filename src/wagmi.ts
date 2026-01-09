import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, sepolia, liskSepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Multicoyn NFT Marketplace',
  projectId: 'YOUR_PROJECT_ID', // Get from WalletConnect Cloud (https://cloud.walletconnect.com)
  chains: [mainnet, polygon, optimism, arbitrum, sepolia, liskSepolia],
  ssr: false,
});
