import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { liskSepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Multicoyn NFT Marketplace",
  projectId: "YOUR_PROJECT_ID",
  chains: [liskSepolia],
  ssr: false,
});
