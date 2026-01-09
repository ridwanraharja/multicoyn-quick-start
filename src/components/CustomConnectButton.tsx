import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTheme } from "../context/ThemeContext";

export function CustomConnectButton() {
  const { theme } = useTheme();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="
                      cursor-pointer px-4 sm:px-6 py-2.5 rounded-xl font-semibold 
                      transition-all duration-300 
                      bg-linear-to-r from-gradient-1 to-gradient-2 
                      text-white hover:opacity-90 h-10 leading-[1]
                      hover:scale-105 active:scale-95
                      hover:shadow-lg hover:shadow-gradient-2/30
                      animate-pulse-glow
                      text-sm sm:text-base
                    "
                  >
                    <span className="hidden sm:inline">Connect Wallet</span>
                    <span className="sm:hidden">Connect</span>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className={`
                      px-3 sm:px-4 py-2 rounded-xl font-medium transition-all duration-300
                      hover:scale-105 active:scale-95
                      text-sm
                      ${
                        theme === "dark"
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-red-500 hover:bg-red-600 text-white"
                      }
                    `}
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Chain button - hide on very small screens */}
                  <button
                    onClick={openChainModal}
                    type="button"
                    className={`
                      hidden sm:flex cursor-pointer items-center gap-2 px-3 py-2 rounded-xl font-medium 
                      transition-all duration-300 h-10
                      hover:scale-105 active:scale-95
                      ${
                        theme === "dark"
                          ? "bg-dark-3 hover:bg-dark-4 text-white"
                          : "bg-light-3 hover:bg-light-4 text-dark"
                      }
                    `}
                  >
                    {chain.hasIcon && (
                      <div
                        className="w-5 h-5 rounded-full overflow-hidden"
                        style={{
                          background: chain.iconBackground,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            className="w-5 h-5"
                          />
                        )}
                      </div>
                    )}
                    <span className="hidden md:inline">{chain.name}</span>
                  </button>

                  {/* Account button */}
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className={`
                      cursor-pointer flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-xl font-medium 
                      transition-all duration-300 h-10
                      hover:scale-105 active:scale-95
                      ${
                        theme === "dark"
                          ? "bg-dark-3 hover:bg-dark-4 text-white"
                          : "bg-light-3 hover:bg-light-4 text-dark"
                      }
                    `}
                  >
                    <span className="text-xs sm:text-sm truncate max-w-[80px] sm:max-w-[150px]">
                      {account.displayName}
                      <span className="hidden lg:inline">
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ""}
                      </span>
                    </span>
                    <div className="w-6 h-6 rounded-full overflow-hidden bg-linear-to-br from-gradient-1 to-gradient-2 ring-2 ring-gradient-1/30">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${account.address}`}
                        alt="Wallet avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
