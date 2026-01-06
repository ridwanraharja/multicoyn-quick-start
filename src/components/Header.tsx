import { useTheme } from "../context/ThemeContext";
import { NotificationIcon } from "./icons";
import { SearchBar } from "./SearchBar";

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function Header({ searchValue, onSearchChange }: HeaderProps) {
  const { theme } = useTheme();

  return (
    <header className="flex items-center justify-between py-4">
      <SearchBar value={searchValue} onChange={onSearchChange} />

      <div className="flex items-center gap-4">
        <button
          className={`
          p-2 rounded-xl transition-colors relative cursor-pointer
          ${
            theme === "dark"
              ? "hover:bg-dark-3 text-white-75 hover:text-white"
              : "hover:bg-light-3 text-gray hover:text-dark"
          }
        `}
        >
          <NotificationIcon className="w-6 h-6" />
          {/* <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" /> */}
        </button>

        <div className="w-8 h-8 rounded-full overflow-hidden bg-linear-to-br from-primary to-secondary">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
