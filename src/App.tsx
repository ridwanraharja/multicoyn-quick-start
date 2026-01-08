import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import {
  CategoryTabs,
  Header,
  NFTCard,
  NFTDetailSidebar,
  Sidebar,
} from "./components";
import { MenuIcon } from "./components/icons";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { CONTRACTS } from "./contracts/config";
import {
  useApproveToken,
  useBuyNFT,
  useGetListing,
  useNFTMetadata,
  useTokenAllowance,
} from "./hooks/useNFTMarketplace";
import { formatPrice } from "./utils/format";
import { decodeMetadataURI, getImageUrl } from "./utils/metadata";

const NFT_TOKEN_IDS = [1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n, 9n, 10n, 11n, 12n];

const TOKEN_TO_LISTING: Record<string, bigint> = {
  "1": 1n, // Hypurr #14
  "2": 2n, // Hypurr #17
  "3": 3n, // Hypurr #22
  "4": 4n, // Hypurr #3
  "5": 5n, // Hypurr #35
  "6": 6n, // Hypurr #37
  "7": 7n, // Hypurr #46
  "8": 8n, // Hypurr #5
  "9": 9n, // Hypurr #61
  "10": 10n, // Hypurr #63
  "11": 11n, // Hypurr #7
  "12": 12n, // Hypurr #8
};

interface NFTData {
  id: string;
  tokenId: bigint;
  listingId?: bigint;
  name: string;
  price: string;
  priceRaw?: bigint;
  image: string;
  paymentToken?: `0x${string}`;
  seller?: `0x${string}`;
  active?: boolean;
}

function Dashboard() {
  const { theme } = useTheme();
  const { address } = useAccount();
  const [activeNav, setActiveNav] = useState("discover");
  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] = useState("nft");
  const [selectedNFT, setSelectedNFT] = useState<string | null>(null);
  const [nftData, setNftData] = useState<NFTData[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch metadata for all NFTs
  const metadataQueries = NFT_TOKEN_IDS.map((tokenId) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useNFTMetadata(tokenId)
  );

  // Fetch listings for NFTs that are listed
  const listingQueries = Object.values(TOKEN_TO_LISTING).map((listingId) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useGetListing(listingId)
  );

  useEffect(() => {
    const data: NFTData[] = NFT_TOKEN_IDS.map((tokenId, index) => {
      const metadataQuery = metadataQueries[index];
      const uri = metadataQuery.data as string | undefined;
      const metadata = uri ? decodeMetadataURI(uri) : null;

      const listingId = TOKEN_TO_LISTING[tokenId.toString()];
      const listingQuery = listingQueries.find((q) =>
        q.data
          ? (q.data as { listingId: bigint }).listingId === listingId
          : false
      );
      const listing = listingQuery?.data as
        | {
            listingId: bigint;
            nftContract: `0x${string}`;
            tokenId: bigint;
            seller: `0x${string}`;
            paymentToken: `0x${string}`;
            price: bigint;
            active: boolean;
            listedAt: bigint;
          }
        | undefined;

      return {
        id: tokenId.toString(),
        tokenId,
        listingId,
        name: metadata?.name || `NFT #${tokenId}`,
        price:
          listing?.active && listing.paymentToken
            ? formatPrice(listing.price, listing.paymentToken)
            : "Not Listed",
        priceRaw: listing?.price,
        image: getImageUrl(metadata),
        paymentToken: listing?.paymentToken,
        seller: listing?.seller,
        active: listing?.active,
      };
    });

    setNftData(data);
  }, [metadataQueries, listingQueries]);

  const selectedNFTData = useMemo(
    () =>
      selectedNFT
        ? nftData.find((nft) => nft.id === selectedNFT) || null
        : null,
    [selectedNFT, nftData]
  );

  const { buyNFT, isSuccess: buySuccess } = useBuyNFT();
  const paymentToken = selectedNFTData?.paymentToken;
  const { data: allowance } = useTokenAllowance(paymentToken, address);
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
      approveToken(selectedNFTData.priceRaw);
      return;
    }

    console.log("Buying NFT with Metamask", selectedNFTData);
    buyNFT(selectedNFTData.listingId);
  };

  const handlePayWithMulticoyn = () => {
    console.log("Pay with Multicoyn", selectedNFTData);
  };

  useEffect(() => {
    if (buySuccess) {
      setSelectedNFT(null);
    }
  }, [buySuccess]);

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
          {/* Mobile Header with Menu Button */}
          <div className="flex items-center gap-4 lg:hidden mb-4">
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
            <div className="flex items-center gap-3">
              <div
                className={`
                w-8 h-8 rounded-lg flex items-center justify-center
                bg-linear-to-br from-gradient-1 to-gradient-2
              `}
              >
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <h1
                className={`
                  text-lg font-bold
                  ${theme === "dark" ? "text-white" : "text-dark"}
                `}
              >
                Market
              </h1>
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
