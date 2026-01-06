import { useState } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import {
  Sidebar,
  Header,
  CategoryTabs,
  NFTCard,
  NFTDetailSidebar,
} from "./components";

// Sample NFT data
const nftData = [
  {
    id: "1",
    name: "Cyber Jungle: Ape Pro..",
    price: "Rp92.000",
    image:
      "https://api.dicebear.com/7.x/bottts/svg?seed=cyber1&backgroundColor=191c34",
  },
  {
    id: "2",
    name: "Cyber Jungle: Ape Pro..",
    price: "Rp92.000",
    image:
      "https://api.dicebear.com/7.x/bottts/svg?seed=cyber2&backgroundColor=191c34",
  },
  {
    id: "3",
    name: "Cyber Jungle: Ape Pro..",
    price: "Rp92.000",
    image:
      "https://api.dicebear.com/7.x/bottts/svg?seed=cyber3&backgroundColor=191c34",
  },
  {
    id: "4",
    name: "Cyber Jungle: Ape Pro..",
    price: "Rp92.000",
    image:
      "https://api.dicebear.com/7.x/bottts/svg?seed=cyber4&backgroundColor=191c34",
  },
  {
    id: "5",
    name: "Cyber Jungle: Ape Pro..",
    price: "Rp92.000",
    image:
      "https://api.dicebear.com/7.x/bottts/svg?seed=cyber5&backgroundColor=191c34",
  },
  {
    id: "6",
    name: "Cyber Jungle: Ape Pro..",
    price: "Rp92.000",
    image:
      "https://api.dicebear.com/7.x/bottts/svg?seed=cyber6&backgroundColor=191c34",
  },
  {
    id: "7",
    name: "Cyber Jungle: Ape Pro..",
    price: "Rp92.000",
    image:
      "https://api.dicebear.com/7.x/bottts/svg?seed=cyber7&backgroundColor=191c34",
  },
  {
    id: "8",
    name: "Cyber Jungle: Ape Pro..",
    price: "Rp92.000",
    image:
      "https://api.dicebear.com/7.x/bottts/svg?seed=cyber8&backgroundColor=191c34",
  },
  {
    id: "9",
    name: "Cyber Jungle: Ape Pro..",
    price: "Rp92.000",
    image:
      "https://api.dicebear.com/7.x/bottts/svg?seed=cyber9&backgroundColor=191c34",
  },
  {
    id: "10",
    name: "Cyber Jungle: Ape Pro..",
    price: "Rp92.000",
    image:
      "https://api.dicebear.com/7.x/bottts/svg?seed=cyber10&backgroundColor=191c34",
  },
  {
    id: "11",
    name: "Cyber Jungle: Ape Pro..",
    price: "Rp92.000",
    image:
      "https://api.dicebear.com/7.x/bottts/svg?seed=cyber11&backgroundColor=191c34",
  },
  {
    id: "12",
    name: "Cyber Jungle: Ape Pro..",
    price: "Rp92.000",
    image:
      "https://api.dicebear.com/7.x/bottts/svg?seed=cyber12&backgroundColor=191c34",
  },
];

function Dashboard() {
  const { theme } = useTheme();
  const [activeNav, setActiveNav] = useState("discover");
  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] = useState("nft");
  const [selectedNFT, setSelectedNFT] = useState<string | null>(null);

  const selectedNFTData = selectedNFT
    ? nftData.find((nft) => nft.id === selectedNFT) || null
    : null;

  const handlePayWithMetamask = () => {
    console.log("Pay with Metamask", selectedNFTData);
    // TODO: Implement Metamask payment
  };

  const handlePayWithMulticoyn = () => {
    console.log("Pay with Multicoyn", selectedNFTData);
    // TODO: Implement Multicoyn payment
  };

  return (
    <div
      className={`
      flex min-h-screen
      ${theme === "dark" ? "bg-dark-1" : "bg-light-1"}
    `}
    >
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />

      <main className="flex-1 flex h-screen overflow-y-auto">
        <div className="flex-1 px-7 py-4">
          <Header searchValue={searchValue} onSearchChange={setSearchValue} />

          <div className="flex items-center justify-between mt-8 mb-6">
            <h2
              className={`
              text-2xl font-bold
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

          <div className="grid grid-cols-4 gap-5">
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
