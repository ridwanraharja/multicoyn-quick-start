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
                    className="px-6 py-2.5 rounded-xl font-semibold transition-all bg-linear-to-r from-gradient-1 to-gradient-2 text-white hover:opacity-90 h-10 leading-[1]"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className={`
                      px-4 py-2 rounded-xl font-medium transition-all
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
                <div className="flex items-center gap-3">
                  <button
                    onClick={openChainModal}
                    type="button"
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-xl font-medium transition-all h-10
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
                    {chain.name}
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className={`
                      flex items-center gap-3 px-4 py-2 rounded-xl font-medium transition-all h-10
                      ${
                        theme === "dark"
                          ? "bg-dark-3 hover:bg-dark-4 text-white"
                          : "bg-light-3 hover:bg-light-4 text-dark"
                      }
                    `}
                  >
                    <span className="text-sm">
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ""}
                    </span>
                    <div className="w-6 h-6 rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary">
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
