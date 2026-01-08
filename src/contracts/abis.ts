// SimpleNFTMarketplace ABI
export const MARKETPLACE_ABI = [
  {
    type: "function",
    name: "listNFT",
    inputs: [
      { name: "nftContract", type: "address" },
      { name: "tokenId", type: "uint256" },
      { name: "paymentToken", type: "address" },
      { name: "price", type: "uint256" },
    ],
    outputs: [{ name: "listingId", type: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "buyNFT",
    inputs: [{ name: "listingId", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "cancelListing",
    inputs: [{ name: "listingId", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateListingPrice",
    inputs: [
      { name: "listingId", type: "uint256" },
      { name: "newPrice", type: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getListing",
    inputs: [{ name: "listingId", type: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "listingId", type: "uint256" },
          { name: "nftContract", type: "address" },
          { name: "tokenId", type: "uint256" },
          { name: "seller", type: "address" },
          { name: "paymentToken", type: "address" },
          { name: "price", type: "uint256" },
          { name: "active", type: "bool" },
          { name: "listedAt", type: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPrice",
    inputs: [{ name: "listingId", type: "uint256" }],
    outputs: [{ name: "price", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "NFTListed",
    inputs: [
      { name: "listingId", type: "uint256", indexed: true },
      { name: "nftContract", type: "address", indexed: true },
      { name: "tokenId", type: "uint256", indexed: true },
      { name: "seller", type: "address", indexed: false },
      { name: "paymentToken", type: "address", indexed: false },
      { name: "price", type: "uint256", indexed: false },
    ],
  },
  {
    type: "event",
    name: "NFTPurchased",
    inputs: [
      { name: "listingId", type: "uint256", indexed: true },
      { name: "buyer", type: "address", indexed: true },
      { name: "seller", type: "address", indexed: true },
      { name: "paymentToken", type: "address", indexed: false },
      { name: "price", type: "uint256", indexed: false },
    ],
  },
] as const;

// MockNFT ABI
export const NFT_ABI = [
  {
    type: "function",
    name: "tokenURI",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "ownerOf",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setApprovalForAll",
    inputs: [
      { name: "operator", type: "address" },
      { name: "approved", type: "bool" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isApprovedForAll",
    inputs: [
      { name: "owner", type: "address" },
      { name: "operator", type: "address" },
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
  },
] as const;

// ERC20 ABI (for USDT/IDRX)
export const ERC20_ABI = [
  {
    type: "function",
    name: "approve",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "allowance",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "decimals",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
    stateMutability: "view",
  },
] as const;
