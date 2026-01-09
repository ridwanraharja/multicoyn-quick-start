// Contract addresses on Lisk Sepolia
export const CONTRACTS = {
  MARKETPLACE: "0x6381858ddC6bBcb758C23608636f53f1C577E4e2" as const,

  MOCK_NFT: "0xd5B14514255B6a6B23930A9D779414D59aA4D64b" as const,

  USDT: "0x5734cD44e4DEe7Ec47a00d89a432d9a545a093fC" as const,
  IDRX: "0xEF226b25263F1688cD370b558f6e3B89975F097E" as const,
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
