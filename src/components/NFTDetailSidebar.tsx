import { useTheme } from "../context/ThemeContext";
import { CloseIcon, MetamaskIcon, MulticoynIcon } from "./icons";
import { useAccount } from "wagmi";

interface NFTData {
  id: string;
  name: string;
  price: string;
  image: string;
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
  const { isConnected } = useAccount();

  if (!nft) return null;

  return (
    <aside
      className={`
        w-[360px] h-screen flex flex-col border-l
        ${
          theme === "dark"
            ? "bg-dark-2 border-border"
            : "bg-light-2 border-light-4"
        }
      `}
    >
      <div className="p-4 flex items-center justify-between border-b border-border">
        <h2
          className={`
            text-lg font-bold
            ${theme === "dark" ? "text-white" : "text-dark"}
          `}
        >
          NFT Details
        </h2>
        <button
          onClick={onClose}
          className={`
            p-2 cursor-pointer rounded-lg transition-colors
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

      <div className="flex-1 overflow-y-auto p-4">
        <div
          className={`
            w-full aspect-square rounded-2xl flex items-center justify-center
            ${theme === "dark" ? "bg-dark-3" : "bg-light-3"}
          `}
        >
          <img
            src={nft.image}
            alt={nft.name}
            className="w-full h-full object-contain p-4"
          />
        </div>

        <div className="mt-4">
          <h3
            className={`
              text-xl font-bold
              ${theme === "dark" ? "text-white" : "text-dark"}
            `}
          >
            {nft.name}
          </h3>

          <div className="mt-4">
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
                text-2xl font-bold mt-1
                ${theme === "dark" ? "text-white" : "text-dark"}
              `}
            >
              {nft.price}
            </p>
          </div>

          <div
            className={`
              mt-6 p-4 rounded-xl
              ${theme === "dark" ? "bg-dark-3" : "bg-light-3"}
            `}
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
                  text-sm font-medium
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
                  text-sm font-medium
                  ${theme === "dark" ? "text-white" : "text-dark"}
                `}
              >
                Ethereum
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border space-y-3">
        {isConnected && (
          <>
            <button
              onClick={onPayWithMetamask}
              className={`
                w-full cursor-pointer flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
                bg-[#F6851B] hover:bg-[#E2761B] text-white
              `}
            >
              <MetamaskIcon className="w-6 h-6" />
              Pay with Metamask
            </button>

            <button
              onClick={onPayWithMulticoyn}
              className="w-full cursor-pointer flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-medium transition-all bg-linear-to-r from-gradient-1 to-gradient-2 hover:opacity-90 text-white"
            >
              <MulticoynIcon className="w-6 h-6" />
              Pay with Multicoyn
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
