import { useAccount } from "wagmi";
import { encodeFunctionData } from "viem";
import { useTheme } from "../context/ThemeContext";
import { CloseIcon, MetamaskIcon, MulticoynIcon } from "./icons";
import { MulticoynButton } from "multicoyn-sdk";
import { MARKETPLACE_ABI } from "../contracts/abis";
import { CONTRACTS } from "../contracts/config";

interface NFTData {
  id: string;
  name: string;
  price: string;
  priceRaw?: bigint;
  image: string;
  paymentToken?: `0x${string}`;
  seller?: `0x${string}`;
  listingId?: bigint;
}

interface NFTDetailSidebarProps {
  nft: NFTData | null;
  onClose: () => void;
  onPayWithMetamask?: () => void;
  onPayWithMulticoyn?: () => void;
}

export function NFTDetailSidebar({
  nft,
  onClose,
  onPayWithMetamask,
  onPayWithMulticoyn,
}: NFTDetailSidebarProps) {
  const { theme } = useTheme();
  const { isConnected, address } = useAccount();

  if (!nft) return null;

  // Encode buyNFTFor call for PaymentRouter integration
  const callData =
    nft.listingId !== undefined && address
      ? encodeFunctionData({
          abi: MARKETPLACE_ABI,
          functionName: "buyNFTFor",
          args: [nft.listingId, address],
        })
      : undefined;

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative right-0 top-0 z-50 lg:z-auto
          w-full sm:w-[400px] lg:w-[360px] h-screen 
          flex flex-col
          animate-slide-in-right
          ${
            theme === "dark"
              ? "bg-dark-2/95 lg:bg-dark-2 backdrop-blur-xl lg:backdrop-blur-none border-l border-border"
              : "bg-light-2/95 lg:bg-light-2 backdrop-blur-xl lg:backdrop-blur-none border-l border-light-4"
          }
        `}
      >
        {/* Header */}
        <div
          className={`
          p-4 flex items-center justify-between 
          border-b ${theme === "dark" ? "border-border" : "border-light-4"}
        `}
        >
          <h2
            className={`
              text-lg font-bold animate-fade-in-up
              ${theme === "dark" ? "text-white" : "text-dark"}
            `}
          >
            NFT Details
          </h2>
          <button
            onClick={onClose}
            className={`
              p-2 cursor-pointer rounded-lg transition-all duration-200
              hover:scale-110 active:scale-95
              hover:rotate-90
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
          {/* NFT Image with glow effect */}
          <div
            className={`
              relative w-full aspect-square rounded-2xl flex items-center justify-center
              overflow-hidden group
              animate-fade-in-scale
              ${theme === "dark" ? "bg-dark-3" : "bg-light-3"}
            `}
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-gradient-1/20 to-gradient-2/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <img
              src={nft.image}
              alt={nft.name}
              className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            />

            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>

          {/* NFT Info */}
          <div
            className="mt-4 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <h3
              className={`
                text-xl font-bold
                ${theme === "dark" ? "text-white" : "text-dark"}
              `}
            >
              {nft.name}
            </h3>

            {/* Price Section */}
            <div className="mt-4" style={{ animationDelay: "0.2s" }}>
              <p
                className={`
                  text-sm
                  ${theme === "dark" ? "text-white-75" : "text-gray"}
                `}
              >
                Price
              </p>
              <p
                className={`
                  text-2xl font-bold mt-1 bg-linear-to-r from-gradient-1 to-gradient-2 bg-clip-text text-transparent
                `}
              >
                {nft.price}
              </p>
            </div>

            {/* Token Details Card */}
            <div
              className={`
                mt-6 p-4 rounded-xl
                transition-all duration-300
                hover:scale-[1.02]
                animate-fade-in-up
                ${
                  theme === "dark"
                    ? "bg-dark-3 hover:bg-dark-4"
                    : "bg-light-3 hover:bg-light-4"
                }
              `}
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex justify-between items-center">
                <span
                  className={`
                    text-sm
                    ${theme === "dark" ? "text-white-75" : "text-gray"}
                  `}
                >
                  Token ID
                </span>
                <span
                  className={`
                    text-sm font-medium font-mono
                    ${theme === "dark" ? "text-white" : "text-dark"}
                  `}
                >
                  #{nft.id}
                </span>
              </div>
              <div className="flex justify-between items-center mt-3">
                <span
                  className={`
                    text-sm
                    ${theme === "dark" ? "text-white-75" : "text-gray"}
                  `}
                >
                  Blockchain
                </span>
                <span
                  className={`
                    text-sm font-medium flex items-center gap-2
                    ${theme === "dark" ? "text-white" : "text-dark"}
                  `}
                >
                  <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                  Ethereum
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className={`
          p-4 border-t space-y-3
          ${theme === "dark" ? "border-border" : "border-light-4"}
        `}
        >
          {isConnected && (
            <>
              <button
                onClick={onPayWithMetamask}
                className={`
                  w-full cursor-pointer flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl font-medium 
                  transition-all duration-300
                  bg-[#F6851B] hover:bg-[#E2761B] text-white
                  hover:scale-[1.02] active:scale-[0.98]
                  hover:shadow-lg hover:shadow-[#F6851B]/30
                  animate-fade-in-up
                `}
                style={{ animationDelay: "0.4s" }}
              >
                <MetamaskIcon className="w-6 h-6" />
                Pay with Metamask
              </button>

              {nft.seller && nft.priceRaw !== undefined && (
                <MulticoynButton
                  totalAmount={Number(nft.priceRaw) / 1e6}
                  merchantAddress={nft.seller}
                  currency="USD"
                  items={[
                    {
                      name: nft.name,
                      price: Number(nft.priceRaw) / 1e6,
                    },
                  ]}
                  settleInIDR={false}
                  target={callData ? CONTRACTS.MARKETPLACE : undefined}
                  callData={callData}
                  onPaymentComplete={(result) => {
                    console.log("Payment successful:", result);
                    onPayWithMulticoyn?.();
                  }}
                  onPaymentError={(error) => {
                    console.error("Payment failed:", error);
                  }}
                  className="
                    w-full cursor-pointer flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl font-medium
                    transition-all duration-300
                    bg-linear-to-r from-gradient-1 to-gradient-2
                    hover:opacity-90 text-white
                    hover:scale-[1.02] active:scale-[0.98]
                    hover:shadow-lg hover:shadow-gradient-2/30
                    animate-fade-in-up animate-gradient-shift
                  "
                >
                  <MulticoynIcon className="w-6 h-6" />
                  Pay with Multicoyn
                </MulticoynButton>
              )}
            </>
          )}
        </div>
      </aside>
    </>
  );
}
