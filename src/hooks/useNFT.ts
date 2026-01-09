import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { CONTRACTS } from "../contracts/config";
import { NFT_ABI } from "../contracts/abis";

export function useNFTName() {
  return useReadContract({
    address: CONTRACTS.MOCK_NFT,
    abi: NFT_ABI,
    functionName: "name",
  });
}

export function useNFTSymbol() {
  return useReadContract({
    address: CONTRACTS.MOCK_NFT,
    abi: NFT_ABI,
    functionName: "symbol",
  });
}

export function useNFTTokenURI(tokenId: bigint | undefined) {
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

export function useNFTTotalSupply() {
  return useReadContract({
    address: CONTRACTS.MOCK_NFT,
    abi: NFT_ABI,
    functionName: "totalSupply",
  });
}

export function useNFTOwnerOf(tokenId: bigint | undefined) {
  return useReadContract({
    address: CONTRACTS.MOCK_NFT,
    abi: NFT_ABI,
    functionName: "ownerOf",
    args: tokenId !== undefined ? [tokenId] : undefined,
    query: {
      enabled: tokenId !== undefined,
    },
  });
}

export function useNFTBalanceOf(owner: `0x${string}` | undefined) {
  return useReadContract({
    address: CONTRACTS.MOCK_NFT,
    abi: NFT_ABI,
    functionName: "balanceOf",
    args: owner ? [owner] : undefined,
    query: {
      enabled: !!owner,
    },
  });
}

export function useNFTExists(tokenId: bigint | undefined) {
  return useReadContract({
    address: CONTRACTS.MOCK_NFT,
    abi: NFT_ABI,
    functionName: "exists",
    args: tokenId !== undefined ? [tokenId] : undefined,
    query: {
      enabled: tokenId !== undefined,
    },
  });
}

export function useNFTGetApproved(tokenId: bigint | undefined) {
  return useReadContract({
    address: CONTRACTS.MOCK_NFT,
    abi: NFT_ABI,
    functionName: "getApproved",
    args: tokenId !== undefined ? [tokenId] : undefined,
    query: {
      enabled: tokenId !== undefined,
    },
  });
}

export function useNFTIsApprovedForAll(
  owner: `0x${string}` | undefined,
  operator: `0x${string}` | undefined
) {
  return useReadContract({
    address: CONTRACTS.MOCK_NFT,
    abi: NFT_ABI,
    functionName: "isApprovedForAll",
    args: owner && operator ? [owner, operator] : undefined,
    query: {
      enabled: !!owner && !!operator,
    },
  });
}

export function useNFTOwner() {
  return useReadContract({
    address: CONTRACTS.MOCK_NFT,
    abi: NFT_ABI,
    functionName: "owner",
  });
}

export function useMintNFT() {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const mint = (to: `0x${string}`, uri: string) => {
    writeContract({
      address: CONTRACTS.MOCK_NFT,
      abi: NFT_ABI,
      functionName: "mint",
      args: [to, uri],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    mint,
    hash,
    isConfirming,
    isConfirmed,
    ...rest,
  };
}

export function useBatchMintNFT() {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const batchMint = (to: `0x${string}`, uris: string[]) => {
    writeContract({
      address: CONTRACTS.MOCK_NFT,
      abi: NFT_ABI,
      functionName: "batchMint",
      args: [to, uris],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    batchMint,
    hash,
    isConfirming,
    isConfirmed,
    ...rest,
  };
}

export function useApproveNFT() {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const approve = (to: `0x${string}`, tokenId: bigint) => {
    writeContract({
      address: CONTRACTS.MOCK_NFT,
      abi: NFT_ABI,
      functionName: "approve",
      args: [to, tokenId],
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

export function useSetApprovalForAll() {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const setApprovalForAll = (operator: `0x${string}`, approved: boolean) => {
    writeContract({
      address: CONTRACTS.MOCK_NFT,
      abi: NFT_ABI,
      functionName: "setApprovalForAll",
      args: [operator, approved],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    setApprovalForAll,
    hash,
    isConfirming,
    isConfirmed,
    ...rest,
  };
}

export function useTransferNFT() {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const transferFrom = (
    from: `0x${string}`,
    to: `0x${string}`,
    tokenId: bigint
  ) => {
    writeContract({
      address: CONTRACTS.MOCK_NFT,
      abi: NFT_ABI,
      functionName: "transferFrom",
      args: [from, to, tokenId],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    transferFrom,
    hash,
    isConfirming,
    isConfirmed,
    ...rest,
  };
}

export function useSafeTransferNFT() {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const safeTransferFrom = (
    from: `0x${string}`,
    to: `0x${string}`,
    tokenId: bigint
  ) => {
    writeContract({
      address: CONTRACTS.MOCK_NFT,
      abi: NFT_ABI,
      functionName: "safeTransferFrom",
      args: [from, to, tokenId],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    safeTransferFrom,
    hash,
    isConfirming,
    isConfirmed,
    ...rest,
  };
}

export function useRenounceOwnership() {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const renounceOwnership = () => {
    writeContract({
      address: CONTRACTS.MOCK_NFT,
      abi: NFT_ABI,
      functionName: "renounceOwnership",
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    renounceOwnership,
    hash,
    isConfirming,
    isConfirmed,
    ...rest,
  };
}

export function useTransferOwnership() {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const transferOwnership = (newOwner: `0x${string}`) => {
    writeContract({
      address: CONTRACTS.MOCK_NFT,
      abi: NFT_ABI,
      functionName: "transferOwnership",
      args: [newOwner],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    transferOwnership,
    hash,
    isConfirming,
    isConfirmed,
    ...rest,
  };
}
