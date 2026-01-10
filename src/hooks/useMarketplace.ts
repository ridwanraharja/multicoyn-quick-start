import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { CONTRACTS } from "../contracts/config";
import { MARKETPLACE_ABI } from "../contracts/abis";

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

export function useGetNFTListing(
  nftContract: `0x${string}` | undefined,
  tokenId: bigint | undefined
) {
  return useReadContract({
    address: CONTRACTS.MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "getNFTListing",
    args:
      nftContract && tokenId !== undefined ? [nftContract, tokenId] : undefined,
    query: {
      enabled: !!nftContract && tokenId !== undefined,
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

export function useGetSellerListings(seller: `0x${string}` | undefined) {
  return useReadContract({
    address: CONTRACTS.MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "getSellerListings",
    args: seller ? [seller] : undefined,
    query: {
      enabled: !!seller,
    },
  });
}

export function useMarketplacePaused() {
  return useReadContract({
    address: CONTRACTS.MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "paused",
  });
}

export function useMarketplaceOwner() {
  return useReadContract({
    address: CONTRACTS.MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "owner",
  });
}

export function useListNFT() {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const listNFT = (
    nftContract: `0x${string}`,
    tokenId: bigint,
    paymentToken: `0x${string}`,
    price: bigint
  ) => {
    writeContract({
      address: CONTRACTS.MARKETPLACE,
      abi: MARKETPLACE_ABI,
      functionName: "listNFT",
      args: [nftContract, tokenId, paymentToken, price],
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

export function usePauseMarketplace() {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const pause = () => {
    writeContract({
      address: CONTRACTS.MARKETPLACE,
      abi: MARKETPLACE_ABI,
      functionName: "pause",
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    pause,
    hash,
    isConfirming,
    isConfirmed,
    ...rest,
  };
}

export function useUnpauseMarketplace() {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const unpause = () => {
    writeContract({
      address: CONTRACTS.MARKETPLACE,
      abi: MARKETPLACE_ABI,
      functionName: "unpause",
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    unpause,
    hash,
    isConfirming,
    isConfirmed,
    ...rest,
  };
}

export function useGetAllMarketNFTs(nftContract: `0x${string}` | undefined) {
  const result = useReadContract({
    address: CONTRACTS.MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "getAllMarketNFTs",
    args: nftContract ? [nftContract] : undefined,
    query: {
      enabled: !!nftContract,
      gcTime: 0,
      staleTime: 0,
    },
  });

  return result;
}

export function useGetBatchNFTMarketData(
  nftContract: `0x${string}` | undefined,
  tokenIds: bigint[] | undefined
) {
  return useReadContract({
    address: CONTRACTS.MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: "getBatchNFTMarketData",
    args:
      nftContract && tokenIds && tokenIds.length > 0
        ? [nftContract, tokenIds]
        : undefined,
    query: {
      enabled: !!nftContract && !!tokenIds && tokenIds.length > 0,
    },
  });
}
