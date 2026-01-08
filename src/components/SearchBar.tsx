import { useTheme } from "../context/ThemeContext";
import { FilterIcon, SearchIcon } from "./icons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFilter?: () => void;
}

export function SearchBar({ value, onChange, onFilter }: SearchBarProps) {
  const { theme } = useTheme();

  return (
    <div className="flex items-center gap-3 sm:gap-4 w-full">
      <div
        className={`
          relative flex items-center flex-1 w-full sm:max-w-[386px]
          ${theme === "dark" ? "bg-dark-3" : "bg-light-3"}
          rounded-xl overflow-hidden
          transition-all duration-300
          focus-within:ring-2 focus-within:ring-gradient-1/50
        `}
      >
        <div
          className={`absolute left-4 ${
            theme === "dark" ? "text-white-50" : "text-gray"
          }`}
        >
          <SearchIcon className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search here.."
          className={`
            w-full py-3 pl-11 pr-4 text-sm bg-transparent outline-none
            transition-colors duration-200
            ${
              theme === "dark"
                ? "text-white placeholder:text-white-50"
                : "text-dark placeholder:text-gray"
            }
          `}
        />
        <button
          onClick={onFilter}
          className={`
            px-3 sm:px-4 py-3 transition-all duration-200 cursor-pointer
            hover:scale-105 active:scale-95
            ${
              theme === "dark"
                ? "text-primary hover:bg-dark-4"
                : "text-dark-1 hover:bg-light-4"
            }
          `}
        >
          <FilterIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
