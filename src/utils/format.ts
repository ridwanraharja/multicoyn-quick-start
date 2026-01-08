import { formatUnits } from "viem";
import { CONTRACTS } from "../contracts/config";

export function formatTokenAmount(
  amount: bigint,
  tokenAddress: `0x${string}`
): string {
  const isUSDT = tokenAddress.toLowerCase() === CONTRACTS.USDT.toLowerCase();
  const decimals = isUSDT ? 6 : 18;
  const symbol = isUSDT ? "USDT" : "IDRX";

  const formatted = formatUnits(amount, decimals);

  const parts = formatted.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `${parts.join(".")} ${symbol}`;
}

export function getTokenSymbol(tokenAddress: `0x${string}`): string {
  const isUSDT = tokenAddress.toLowerCase() === CONTRACTS.USDT.toLowerCase();
  return isUSDT ? "USDT" : "IDRX";
}

export function getTokenDecimals(tokenAddress: `0x${string}`): number {
  const isUSDT = tokenAddress.toLowerCase() === CONTRACTS.USDT.toLowerCase();
  return isUSDT ? 6 : 18;
}

export function formatPrice(
  price: bigint | undefined,
  tokenAddress: `0x${string}` | undefined
): string {
  if (!price || !tokenAddress) {
    return "Not Listed";
  }

  return formatTokenAmount(price, tokenAddress);
}

export function shortenAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
