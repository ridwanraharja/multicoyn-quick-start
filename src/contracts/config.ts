// Contract addresses on Lisk Sepolia
export const CONTRACTS = {
  MARKETPLACE: "0x62AFbeaBc2594DA954977cDae5Ba400e301DC75C" as const,

  MOCK_NFT: "0xd5B14514255B6a6B23930A9D779414D59aA4D64b" as const,

  // Tokens
  USDC: "0x0Ff0aED4862e168086FD8BC38a4c27cE1830228b" as const,
  USDT: "0xBc63b0cf19b757c2a6Ef646027f8CeA7Af2c3e7F" as const,
  DAI: "0xd2aAa24D5C305B7968e955A89F0bf4E7776E7078" as const,
  WBTC: "0x1BEC7ec7F995B9bcd93F411B2cE7d289C6b05f03" as const,
  IDRX: "0x39B9205cDC53114c0B0F22F04C1215A13197b4d9" as const,
} as const;

export const LISK_SEPOLIA = {
  id: 4202,
  name: "Lisk Sepolia",
  rpcUrls: {
    default: {
      http: ["https://rpc.sepolia-api.lisk.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://sepolia-blockscout.lisk.com",
    },
  },
  nativeCurrency: {
    name: "Sepolia Ether",
    symbol: "ETH",
    decimals: 18,
  },
} as const;
