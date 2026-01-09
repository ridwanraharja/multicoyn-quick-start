import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { ERC20_ABI } from "../contracts/abis";

export function useTokenName(tokenAddress: `0x${string}` | undefined) {
  return useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "name",
    query: {
      enabled: !!tokenAddress,
    },
  });
}

export function useTokenSymbol(tokenAddress: `0x${string}` | undefined) {
  return useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "symbol",
    query: {
      enabled: !!tokenAddress,
    },
  });
}

export function useTokenDecimals(tokenAddress: `0x${string}` | undefined) {
  return useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "decimals",
    query: {
      enabled: !!tokenAddress,
    },
  });
}

export function useTokenTotalSupply(tokenAddress: `0x${string}` | undefined) {
  return useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "totalSupply",
    query: {
      enabled: !!tokenAddress,
    },
  });
}

export function useTokenBalanceOf(
  tokenAddress: `0x${string}` | undefined,
  account: `0x${string}` | undefined
) {
  return useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: account ? [account] : undefined,
    query: {
      enabled: !!tokenAddress && !!account,
    },
  });
}

export function useTokenAllowance(
  tokenAddress: `0x${string}` | undefined,
  owner: `0x${string}` | undefined,
  spender: `0x${string}` | undefined
) {
  return useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: owner && spender ? [owner, spender] : undefined,
    query: {
      enabled: !!tokenAddress && !!owner && !!spender,
    },
  });
}

export function useTokenOwner(tokenAddress: `0x${string}` | undefined) {
  return useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "owner",
    query: {
      enabled: !!tokenAddress,
    },
  });
}

export function useApproveToken(tokenAddress: `0x${string}`) {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const approve = (spender: `0x${string}`, value: bigint) => {
    writeContract({
      address: tokenAddress,
      abi: ERC20_ABI,
      functionName: "approve",
      args: [spender, value],
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

export function useTransferToken(tokenAddress: `0x${string}`) {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const transfer = (to: `0x${string}`, value: bigint) => {
    writeContract({
      address: tokenAddress,
      abi: ERC20_ABI,
      functionName: "transfer",
      args: [to, value],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    transfer,
    hash,
    isConfirming,
    isConfirmed,
    ...rest,
  };
}

export function useTransferFromToken(tokenAddress: `0x${string}`) {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const transferFrom = (
    from: `0x${string}`,
    to: `0x${string}`,
    value: bigint
  ) => {
    writeContract({
      address: tokenAddress,
      abi: ERC20_ABI,
      functionName: "transferFrom",
      args: [from, to, value],
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

export function useMintToken(tokenAddress: `0x${string}`) {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const mint = (to: `0x${string}`, amount: bigint) => {
    writeContract({
      address: tokenAddress,
      abi: ERC20_ABI,
      functionName: "mint",
      args: [to, amount],
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

export function useFaucet(tokenAddress: `0x${string}`) {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const faucet = (amount: bigint) => {
    writeContract({
      address: tokenAddress,
      abi: ERC20_ABI,
      functionName: "faucet",
      args: [amount],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    faucet,
    hash,
    isConfirming,
    isConfirmed,
    ...rest,
  };
}

export function useRenounceOwnershipToken(tokenAddress: `0x${string}`) {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const renounceOwnership = () => {
    writeContract({
      address: tokenAddress,
      abi: ERC20_ABI,
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

export function useTransferOwnershipToken(tokenAddress: `0x${string}`) {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const transferOwnership = (newOwner: `0x${string}`) => {
    writeContract({
      address: tokenAddress,
      abi: ERC20_ABI,
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
