import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import {
  CategoryTabs,
  CustomConnectButton,
  Header,
  NFTCard,
  NFTDetailSidebar,
  Sidebar,
} from "./components";
import { MenuIcon, NotificationIcon } from "./components/icons";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { CONTRACTS } from "./contracts/config";
import { useBuyNFT, useGetAllMarketNFTs } from "./hooks/useMarketplace";
import { useApproveToken, useTokenAllowance } from "./hooks/useERC20";
import { formatPrice } from "./utils/format";
import { decodeMetadataURI, getImageUrl } from "./utils/metadata";
import HypurrLogo from "./assets/hypur-logo.jpeg";

function Dashboard() {
  const { theme } = useTheme();
  const { address } = useAccount();
  const [activeNav, setActiveNav] = useState("discover");
  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] = useState("nft");
  const [selectedNFT, setSelectedNFT] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: allMarketNFTs } = useGetAllMarketNFTs(CONTRACTS.MOCK_NFT);

  const nftData = useMemo(() => {
    if (!allMarketNFTs) return [];

    return (
      allMarketNFTs as Array<{
        tokenId: bigint;
        tokenURI: string;
        listingId: bigint;
        hasListing: boolean;
        seller: `0x${string}`;
        paymentToken: `0x${string}`;
        price: bigint;
        active: boolean;
        listedAt: bigint;
      }>
    ).map((nft) => {
      const metadata = nft.tokenURI ? decodeMetadataURI(nft.tokenURI) : null;

      return {
        id: nft.tokenId.toString(),
        tokenId: nft.tokenId,
        listingId: nft.hasListing ? nft.listingId : undefined,
        name: metadata?.name || `NFT #${nft.tokenId}`,
        price:
          nft.active && nft.paymentToken
            ? formatPrice(nft.price, nft.paymentToken)
            : "Not Listed",
        priceRaw: nft.price,
        image: getImageUrl(metadata),
        paymentToken: nft.paymentToken || undefined,
        seller: nft.seller || undefined,
        active: nft.active,
      };
    });
  }, [allMarketNFTs]);

  const selectedNFTData = useMemo(
    () =>
      selectedNFT
        ? nftData.find((nft) => nft.id === selectedNFT) || null
        : null,
    [selectedNFT, nftData]
  );

  const { buyNFT, isSuccess: buySuccess } = useBuyNFT();
  const paymentToken = selectedNFTData?.paymentToken;
  const { data: allowance } = useTokenAllowance(
    paymentToken,
    address,
    CONTRACTS.MARKETPLACE
  );
  const { approve: approveToken } = useApproveToken(
    paymentToken || CONTRACTS.USDT
  );

  const handlePayWithMetamask = async () => {
    if (!selectedNFTData?.listingId || !selectedNFTData.priceRaw) {
      console.error("No listing data");
      return;
    }

    if (allowance !== undefined && allowance < selectedNFTData.priceRaw) {
      console.log("Approving token spending...");
      approveToken(CONTRACTS.MARKETPLACE, selectedNFTData.priceRaw);
      return;
    }

    console.log("Buying NFT with Metamask", selectedNFTData);
    buyNFT(selectedNFTData.listingId);
  };

  const handlePayWithMulticoyn = () => {
    console.log("Pay with Multicoyn", selectedNFTData);
  };

  // Close sidebar when purchase is successful
  useEffect(() => {
    if (buySuccess && selectedNFT) {
      const timer = setTimeout(() => setSelectedNFT(null), 100);
      return () => clearTimeout(timer);
    }
  }, [buySuccess, selectedNFT]);

  return (
    <div
      className={`
      flex min-h-screen
      ${theme === "dark" ? "bg-dark-1" : "bg-light-1"}
    `}
    >
      {/* Left Sidebar */}
      <Sidebar
        activeNav={activeNav}
        onNavChange={setActiveNav}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 flex h-screen overflow-y-auto">
        <div className="flex-1 px-4 sm:px-7 py-4">
          {/* Mobile Header with Menu Button, Notification & Wallet */}
          <div className="flex items-center justify-between lg:hidden mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className={`
                  p-2.5 rounded-xl transition-all duration-200 cursor-pointer
                  hover:scale-105 active:scale-95
                  ${
                    theme === "dark"
                      ? "bg-dark-3 hover:bg-dark-4 text-white"
                      : "bg-light-3 hover:bg-light-4 text-dark"
                  }
                `}
              >
                <MenuIcon className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl overflow-hidden animate-pulse-glow hidden sm:block">
                  <img
                    src={HypurrLogo}
                    alt="Market Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1
                  className={`
                    text-lg font-bold hidden sm:block
                    ${theme === "dark" ? "text-white" : "text-dark"}
                  `}
                >
                  Marketplace
                </h1>
              </div>
            </div>

            {/* Notification & Connect Wallet for Mobile */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                className={`
                  p-2 rounded-xl transition-all duration-200 relative cursor-pointer
                  hover:scale-105 active:scale-95
                  ${
                    theme === "dark"
                      ? "hover:bg-dark-3 text-white-75 hover:text-white"
                      : "hover:bg-light-3 text-gray hover:text-dark"
                  }
                `}
              >
                <NotificationIcon className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gradient-1 rounded-full animate-pulse" />
              </button>
              <CustomConnectButton />
            </div>
          </div>

          <Header searchValue={searchValue} onSearchChange={setSearchValue} />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 sm:mt-8 mb-4 sm:mb-6 gap-4">
            <h2
              className={`
              text-xl sm:text-2xl font-bold animate-fade-in-up
              ${theme === "dark" ? "text-white" : "text-dark"}
            `}
            >
              All Collections
            </h2>
            <CategoryTabs
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 pb-8">
            {nftData.map((nft) => (
              <NFTCard
                key={nft.id}
                {...nft}
                isSelected={selectedNFT === nft.id}
                onClick={() => setSelectedNFT(nft.id)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Right Sidebar - NFT Details */}
      {selectedNFTData && (
        <NFTDetailSidebar
          nft={selectedNFTData}
          onClose={() => setSelectedNFT(null)}
          onPayWithMetamask={handlePayWithMetamask}
          onPayWithMulticoyn={handlePayWithMulticoyn}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
