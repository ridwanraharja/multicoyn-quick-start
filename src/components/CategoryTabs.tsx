import { useTheme } from "../context/ThemeContext";
import { AllIcon, ArtsIcon, GamingIcon, NFTIcon } from "./icons";

interface Category {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const categories: Category[] = [
  { id: "all", label: "All", icon: AllIcon },
  { id: "nft", label: "NFT", icon: NFTIcon },
  { id: "gaming", label: "Gaming", icon: GamingIcon },
  { id: "arts", label: "Arts", icon: ArtsIcon },
];

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export function CategoryTabs({
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  const { theme } = useTheme();

  return (
    <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar p-1 ">
      {categories.map((category, index) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.id;
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            style={{ animationDelay: `${index * 0.05}s` }}
            className={`
              flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium 
              transition-all duration-300 cursor-pointer whitespace-nowrap
              hover:scale-105 active:scale-95
              animate-fade-in-up
              border
              ${
                isActive
                  ? theme === "dark"
                    ? "bg-linear-to-r from-gradient-1/20 to-gradient-2/20 text-white border-gradient-1 shadow-lg shadow-gradient-1/20"
                    : "bg-light-2 text-dark border-gradient-1 shadow-lg shadow-gradient-1/20"
                  : theme === "dark"
                  ? "bg-dark-3 text-white-75 border-border hover:border-gradient-1 hover:text-white"
                  : "bg-light-2 text-gray border-light-4 hover:border-gradient-1 hover:text-dark"
              }
            `}
          >
            <Icon
              className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${
                isActive ? "animate-pulse" : ""
              }`}
            />
            <span className="hidden xs:inline sm:inline">{category.label}</span>
          </button>
        );
      })}
    </div>
  );
}
