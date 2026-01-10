import { useState } from "react";
import { createPortal } from "react-dom";
import { useAccount, useWriteContract, usePublicClient } from "wagmi";
import { parseUnits } from "viem";
import { useTheme } from "../context/ThemeContext";
import { CONTRACTS } from "../contracts/config";
import { ERC20_ABI } from "../contracts/abis";
import { TOKEN_METADATA } from "../constants/tokens";
import { CloseIcon } from "./icons";
import toast from "react-hot-toast";

interface Token {
  symbol: string;
  name: string;
  address: `0x${string}`;
  decimals: number;
  amount: string;
  logo: string;
}

const TOKENS: Token[] = [
  {
    symbol: "USDC",
    name: TOKEN_METADATA.USDC.name,
    address: CONTRACTS.USDC,
    decimals: TOKEN_METADATA.USDC.decimals,
    amount: "1000",
    logo: TOKEN_METADATA.USDC.logo,
  },
  {
    symbol: "USDT",
    name: TOKEN_METADATA.USDT.name,
    address: CONTRACTS.USDT,
    decimals: TOKEN_METADATA.USDT.decimals,
    amount: "1000",
    logo: TOKEN_METADATA.USDT.logo,
  },
  {
    symbol: "DAI",
    name: TOKEN_METADATA.DAI.name,
    address: CONTRACTS.DAI,
    decimals: TOKEN_METADATA.DAI.decimals,
    amount: "1000",
    logo: TOKEN_METADATA.DAI.logo,
  },
  {
    symbol: "WBTC",
    name: TOKEN_METADATA.WBTC.name,
    address: CONTRACTS.WBTC,
    decimals: TOKEN_METADATA.WBTC.decimals,
    amount: "1",
    logo: TOKEN_METADATA.WBTC.logo,
  },
];

interface FaucetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FaucetModal({ isOpen, onClose }: FaucetModalProps) {
  const { theme } = useTheme();
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();
  const [mintingToken, setMintingToken] = useState<string | null>(null);

  const handleMint = async (token: Token) => {
    if (!isConnected || !address || !publicClient) {
      toast.error("Please connect your wallet first");
      return;
    }

    setMintingToken(token.symbol);
    const amount = parseUnits(token.amount, token.decimals);

    try {
      const hash = await writeContractAsync({
        address: token.address,
        abi: ERC20_ABI,
        functionName: "faucet",
        args: [amount],
      });

      toast.loading(`Waiting for confirmation...`, { id: token.symbol });

      await publicClient.waitForTransactionReceipt({ hash });

      toast.success(`${token.amount} ${token.symbol} minted successfully!`, {
        id: token.symbol,
      });
      setMintingToken(null);
    } catch (error) {
      toast.error(`Failed to mint ${token.symbol}`, { id: token.symbol });
      console.error(error);
      setMintingToken(null);
    }
  };

  const handleMintAll = async () => {
    if (!isConnected || !address || !publicClient) {
      toast.error("Please connect your wallet first");
      return;
    }

    const loadingToast = toast.loading("Minting all tokens...");

    try {
      for (let i = 0; i < TOKENS.length; i++) {
        const token = TOKENS[i];
        setMintingToken(token.symbol);
        toast.loading(
          `Minting ${token.symbol}... (${i + 1}/${TOKENS.length})`,
          {
            id: loadingToast,
          }
        );

        const amount = parseUnits(token.amount, token.decimals);

        const hash = await writeContractAsync({
          address: token.address,
          abi: ERC20_ABI,
          functionName: "faucet",
          args: [amount],
        });

        toast.loading(
          `Waiting for ${token.symbol} confirmation... (${i + 1}/${
            TOKENS.length
          })`,
          {
            id: loadingToast,
          }
        );

        await publicClient.waitForTransactionReceipt({ hash });

        if (i < TOKENS.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      toast.success("All tokens minted successfully!", {
        id: loadingToast,
        duration: 5000,
      });
      setMintingToken(null);
    } catch (error) {
      toast.error("Failed to mint some tokens", { id: loadingToast });
      console.error(error);
      setMintingToken(null);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      <div
        className={`
          relative w-full max-w-md z-[9999] animate-scale-in
          ${
            theme === "dark"
              ? "bg-dark-2 border border-border"
              : "bg-light-2 border border-light-4"
          }
          rounded-2xl shadow-2xl p-6
        `}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              className={`text-2xl font-bold ${
                theme === "dark" ? "text-white" : "text-dark"
              }`}
            >
              Test Token Faucet
            </h2>
            <p
              className={`text-sm mt-1 ${
                theme === "dark" ? "text-white-75" : "text-gray"
              }`}
            >
              Get free test tokens for development
            </p>
          </div>
          <button
            onClick={onClose}
            className={`
              cursor-pointer p-2 rounded-lg transition-all duration-200
              hover:scale-110 active:scale-95
              ${
                theme === "dark"
                  ? "hover:bg-dark-3 text-white-75"
                  : "hover:bg-light-3 text-gray"
              }
            `}
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto">
          {TOKENS.map((token) => {
            const isLoading = mintingToken === token.symbol;

            return (
              <div
                key={token.symbol}
                className={`
                  p-4 rounded-xl border transition-all duration-200
                  ${
                    theme === "dark"
                      ? "border-border hover:border-gradient-1/50 bg-dark-3/50"
                      : "border-light-4 hover:border-gradient-1/50 bg-light-3/50"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center overflow-hidden
                        ${
                          theme === "dark"
                            ? "bg-dark-4"
                            : "bg-white border border-light-4"
                        }
                      `}
                    >
                      <img
                        src={token.logo}
                        alt={token.symbol}
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    <div>
                      <div
                        className={`font-semibold ${
                          theme === "dark" ? "text-white" : "text-dark"
                        }`}
                      >
                        {token.symbol}
                      </div>
                      <div
                        className={`text-xs ${
                          theme === "dark" ? "text-white-75" : "text-gray"
                        }`}
                      >
                        {token.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className={`
                        px-3 py-1.5 rounded-lg text-sm font-medium
                        ${
                          theme === "dark"
                            ? "bg-dark-4 text-white-75"
                            : "bg-light-4 text-gray"
                        }
                      `}
                    >
                      {token.amount} {token.symbol}
                    </div>
                    <button
                      onClick={() => handleMint(token)}
                      disabled={!isConnected || isLoading}
                      className={`
                        cursor-pointer px-4 py-2 rounded-lg font-medium text-sm
                        transition-all duration-200
                        ${
                          !isConnected || isLoading
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:scale-105 active:scale-95"
                        }
                        ${
                          theme === "dark"
                            ? "bg-gradient-1 text-white hover:shadow-lg hover:shadow-gradient-1/50"
                            : "bg-gradient-1 text-white hover:shadow-lg hover:shadow-gradient-1/50"
                        }
                      `}
                    >
                      {isLoading ? (
                        <svg
                          className="animate-spin h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      ) : (
                        "Mint"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleMintAll}
          disabled={!isConnected || mintingToken !== null}
          className={`
            cursor-pointer w-full py-3 rounded-xl font-semibold text-sm
            flex items-center justify-center gap-2
            transition-all duration-300
            ${
              !isConnected || mintingToken !== null
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-[1.02] active:scale-[0.98]"
            }
            ${
              theme === "dark"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50"
                : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-600/50"
            }
          `}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Mint All Tokens
        </button>

        {!isConnected && (
          <p
            className={`
              text-center text-sm mt-4
              ${theme === "dark" ? "text-white-75" : "text-gray"}
            `}
          >
            Please connect your wallet to mint tokens
          </p>
        )}
      </div>
    </div>,
    document.body
  );
}
