import { useTheme } from "../context/ThemeContext";
import { AllIcon, NFTIcon, GamingIcon, ArtsIcon } from "./icons";

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
    <div className="flex items-center gap-3">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.id;
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
              ${
                isActive
                  ? theme === "dark"
                    ? "bg-dark-1 text-primary border border-primary"
                    : "bg-light-2 text-gray border border-dark-1 hover:border-dark-1"
                  : theme === "dark"
                  ? "bg-dark-1 text-white-75 border border-border hover:border-primary/50"
                  : "bg-light-2 text-gray border border-light-4 hover:border-dark-1"
              }
            `}
          >
            <Icon className="w-4.5 h-4.5" />
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
