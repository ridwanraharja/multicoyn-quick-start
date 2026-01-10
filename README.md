# Multicoyn Quick Start - NFT Marketplace

<div align="center">
  <img src="https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-7.2-646CFF?style=flat-square&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/wagmi-2.19-black?style=flat-square" alt="wagmi" />
</div>

<br />

A modern NFT Marketplace demo application showcasing the usage of [**multicoyn-sdk**](https://www.npmjs.com/package/multicoyn-sdk) - a Web3 payment SDK for multichain crypto payments.

## ✨ Features

- 🎨 **Modern UI/UX** - Beautiful responsive design with dark/light theme support
- 🔗 **Web3 Integration** - Seamless wallet connection via RainbowKit
- 🛒 **NFT Marketplace** - Browse, view details, and purchase NFTs
- 💳 **Multi-Payment Options** - Pay with Metamask or Multicoyn SDK
- 🔄 **Real-time Data** - Live blockchain data fetching with wagmi hooks
- 📱 **Responsive Design** - Works perfectly on desktop and mobile devices
- ⚡ **Fast Development** - Powered by Vite for instant HMR

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- MetaMask or any Web3 wallet

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/nicholaspai/multicoyn-quick-start.git
   cd multicoyn-quick-start
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure WalletConnect Project ID**

   Get your project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/) and update `src/wagmi.ts`:

   ```typescript
   export const config = getDefaultConfig({
     appName: "Multicoyn NFT Marketplace",
     projectId: "YOUR_PROJECT_ID", // Replace with your project ID
     chains: [liskSepolia],
     ssr: false,
   });
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173`

## 📦 Project Structure

```
multicoyn-quick-start/
├── src/
│   ├── assets/              # Static assets (images, icons)
│   ├── components/          # React components
│   │   ├── icons/           # SVG icon components
│   │   ├── CategoryTabs.tsx
│   │   ├── CustomConnectButton.tsx
│   │   ├── Header.tsx
│   │   ├── NFTCard.tsx
│   │   ├── NFTDetailSidebar.tsx
│   │   ├── SearchBar.tsx
│   │   └── Sidebar.tsx
│   ├── context/             # React context providers
│   │   └── ThemeContext.tsx
│   ├── contracts/           # Smart contract configs & ABIs
│   │   ├── abis.ts
│   │   └── config.ts
│   ├── hooks/               # Custom React hooks
│   │   ├── useERC20.ts
│   │   ├── useMarketplace.ts
│   │   └── useNFT.ts
│   ├── utils/               # Utility functions
│   │   ├── format.ts
│   │   └── metadata.ts
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   ├── wagmi.ts             # Wagmi configuration
│   └── index.css            # Global styles
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🔧 Configuration

### Smart Contracts (Lisk Sepolia)

The marketplace is deployed on Lisk Sepolia testnet:

| Contract    | Address                                      |
| ----------- | -------------------------------------------- |
| Marketplace | `0x6381858ddC6bBcb758C23608636f53f1C577E4e2` |
| Mock NFT    | `0xd5B14514255B6a6B23930A9D779414D59aA4D64b` |
| USDT        | `0x5734cD44e4DEe7Ec47a00d89a432d9a545a093fC` |
| IDRX        | `0xEF226b25263F1688cD370b558f6e3B89975F097E` |

### Network Configuration

```typescript
// Lisk Sepolia Testnet
{
  id: 4202,
  name: "Lisk Sepolia",
  rpcUrls: ["https://rpc.sepolia-api.lisk.com"],
  blockExplorer: "https://sepolia-blockscout.lisk.com"
}
```

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) with TypeScript
- **Build Tool**: [Vite 7](https://vite.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Web3 Libraries**:
  - [wagmi](https://wagmi.sh/) - React Hooks for Ethereum
  - [viem](https://viem.sh/) - TypeScript Interface for Ethereum
  - [RainbowKit](https://www.rainbowkit.com/) - Wallet connection UI
  - [TanStack Query](https://tanstack.com/query) - Data fetching & caching

## 📖 Usage Examples

### Connecting Wallet

The app uses RainbowKit for seamless wallet connection:

```tsx
import { CustomConnectButton } from "./components";

function MyComponent() {
  return <CustomConnectButton />;
}
```

### Reading NFT Data

```tsx
import { useGetAllMarketNFTs } from "./hooks/useMarketplace";
import { CONTRACTS } from "./contracts/config";

function NFTList() {
  const { data: nfts } = useGetAllMarketNFTs(CONTRACTS.MOCK_NFT);

  return (
    <div>
      {nfts?.map((nft) => (
        <NFTCard key={nft.tokenId} {...nft} />
      ))}
    </div>
  );
}
```

### Buying an NFT

```tsx
import { useBuyNFT } from "./hooks/useMarketplace";
import { useApproveToken } from "./hooks/useERC20";

function BuyButton({ listingId, price, paymentToken }) {
  const { buyNFT } = useBuyNFT();
  const { approve } = useApproveToken(paymentToken);

  const handleBuy = async () => {
    // First approve token spending
    await approve(CONTRACTS.MARKETPLACE, price);
    // Then buy the NFT
    buyNFT(listingId);
  };

  return <button onClick={handleBuy}>Buy NFT</button>;
}
```

## 🎨 Theming

The app supports both dark and light themes. Toggle between themes using the sidebar button:

```tsx
import { useTheme } from "./context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
```

## 📜 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## 🔗 Related Links

- [multicoyn-sdk on npm](https://www.npmjs.com/package/multicoyn-sdk)
- [wagmi Documentation](https://wagmi.sh/)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs/introduction)
- [Lisk Sepolia Explorer](https://sepolia-blockscout.lisk.com/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">
  <p>Built with ❤️ using <a href="https://www.npmjs.com/package/multicoyn-sdk">multicoyn-sdk</a></p>
</div>
