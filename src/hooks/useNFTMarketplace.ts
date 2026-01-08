import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { CONTRACTS } from "../contracts/config";
import { MARKETPLACE_ABI, NFT_ABI, ERC20_ABI } from "../contracts/abis";

export function useGetListing(listingId: bigint | undefined) {
  return useReadContract({
    address: CONTRACTS.MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "getListing",
    args: listingId !== undefined ? [listingId] : undefined,
    query: {
      enabled: listingId !== undefined,
    },
  });
}

export function useGetPrice(listingId: bigint | undefined) {
  return useReadContract({
    address: CONTRACTS.MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "getPrice",
    args: listingId !== undefined ? [listingId] : undefined,
    query: {
      enabled: listingId !== undefined,
    },
  });
}

export function useNFTMetadata(tokenId: bigint | undefined) {
  return useReadContract({
    address: CONTRACTS.MOCK_NFT,
    abi: NFT_ABI,
    functionName: "tokenURI",
    args: tokenId !== undefined ? [tokenId] : undefined,
    query: {
      enabled: tokenId !== undefined,
    },
  });
}

export function useIsMarketplaceApproved(owner: `0x${string}` | undefined) {
  return useReadContract({
    address: CONTRACTS.MOCK_NFT,
    abi: NFT_ABI,
    functionName: "isApprovedForAll",
    args: owner ? [owner, CONTRACTS.MARKETPLACE] : undefined,
    query: {
      enabled: !!owner,
    },
  });
}

export function useTokenAllowance(
  tokenAddress: `0x${string}` | undefined,
  owner: `0x${string}` | undefined
) {
  return useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: owner && tokenAddress ? [owner, CONTRACTS.MARKETPLACE] : undefined,
    query: {
      enabled: !!owner && !!tokenAddress,
    },
  });
}

export function useApproveMarketplace() {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const approve = () => {
    writeContract({
      address: CONTRACTS.MOCK_NFT,
      abi: NFT_ABI,
      functionName: "setApprovalForAll",
      args: [CONTRACTS.MARKETPLACE, true],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    approve,
    hash,
    isConfirming,
    isConfirmed,
    ...rest,
  };
}

export function useApproveToken(tokenAddress: `0x${string}`) {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const approve = (amount: bigint) => {
    writeContract({
      address: tokenAddress,
      abi: ERC20_ABI,
      functionName: "approve",
      args: [CONTRACTS.MARKETPLACE, amount],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    approve,
    hash,
    isConfirming,
    isConfirmed,
    ...rest,
  };
}

export function useListNFT() {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const listNFT = (
    tokenId: bigint,
    paymentToken: `0x${string}`,
    price: bigint
  ) => {
    writeContract({
      address: CONTRACTS.MARKETPLACE,
      abi: MARKETPLACE_ABI,
      functionName: "listNFT",
      args: [CONTRACTS.MOCK_NFT, tokenId, paymentToken, price],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    listNFT,
    hash,
    isConfirming,
    isConfirmed,
    ...rest,
  };
}

export function useBuyNFT() {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const buyNFT = (listingId: bigint) => {
    writeContract({
      address: CONTRACTS.MARKETPLACE,
      abi: MARKETPLACE_ABI,
      functionName: "buyNFT",
      args: [listingId],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    buyNFT,
    hash,
    isConfirming,
    isConfirmed,
    ...rest,
  };
}

export function useCancelListing() {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const cancelListing = (listingId: bigint) => {
    writeContract({
      address: CONTRACTS.MARKETPLACE,
      abi: MARKETPLACE_ABI,
      functionName: "cancelListing",
      args: [listingId],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    cancelListing,
    hash,
    isConfirming,
    isConfirmed,
    ...rest,
  };
}

export function useUpdateListingPrice() {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const updatePrice = (listingId: bigint, newPrice: bigint) => {
    writeContract({
      address: CONTRACTS.MARKETPLACE,
      abi: MARKETPLACE_ABI,
      functionName: "updateListingPrice",
      args: [listingId, newPrice],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    updatePrice,
    hash,
    isConfirming,
    isConfirmed,
    ...rest,
  };
}
