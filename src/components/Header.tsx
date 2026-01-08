import { useTheme } from "../context/ThemeContext";
import { CustomConnectButton } from "./CustomConnectButton";
import { NotificationIcon } from "./icons";
import { SearchBar } from "./SearchBar";

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function Header({ searchValue, onSearchChange }: HeaderProps) {
  const { theme } = useTheme();

  return (
    <header className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between py-4 gap-4 animate-fade-in-up">
      <div className="flex-1">
        <SearchBar value={searchValue} onChange={onSearchChange} />
      </div>

      <div className="flex items-center justify-end gap-3 sm:gap-4">
        <button
          className={`
            p-2.5 rounded-xl transition-all duration-200 relative cursor-pointer
            hover:scale-105 active:scale-95
            ${
              theme === "dark"
                ? "hover:bg-dark-3 text-white-75 hover:text-white"
                : "hover:bg-light-3 text-gray hover:text-dark"
            }
          `}
        >
          <NotificationIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          {/* Notification dot with pulse animation */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-gradient-1 rounded-full animate-pulse" />
        </button>

        <CustomConnectButton />
      </div>
    </header>
  );
}
