import { useTheme } from "../context/ThemeContext";
import {
  DiscoverIcon,
  TransactionIcon,
  MoonIcon,
  SunIcon,
  MenuIcon,
} from "./icons";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: "discover", label: "Discover", icon: DiscoverIcon },
  { id: "transaction", label: "Transaction", icon: TransactionIcon },
];

interface SidebarProps {
  activeNav: string;
  onNavChange: (id: string) => void;
}

export function Sidebar({ activeNav, onNavChange }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside
      className={`
      w-[220px] h-screen flex flex-col
      ${
        theme === "dark"
          ? "bg-dark-2 border-r border-border"
          : "bg-light-2 border-r border-light-4 shadow-sm"
      }
    `}
    >
      <div className="p-6 flex items-center justify-between">
        <h1
          className={`
          text-xl font-bold
          ${theme === "dark" ? "text-white" : "text-dark"}
        `}
        >
          Market
        </h1>
        <button
          className={`
          p-2 rounded-lg transition-colors
          ${
            theme === "dark"
              ? "hover:bg-dark-3 text-white-75"
              : "hover:bg-light-3 text-gray"
          }
        `}
        >
          <MenuIcon className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavChange(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${
                      isActive
                        ? "bg-dark-4 text-white"
                        : theme === "dark"
                        ? "text-white-75 hover:bg-dark-3 hover:text-white"
                        : "text-gray hover:bg-light-3 hover:text-dark"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={toggleTheme}
          className={`
            w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all
            ${
              theme === "dark"
                ? "bg-dark-3 text-white-75 hover:text-white"
                : "bg-light-3 text-gray hover:text-dark"
            }
          `}
        >
          {theme === "dark" ? (
            <>
              <SunIcon className="w-5 h-5" />
              Light Mode
            </>
          ) : (
            <>
              <MoonIcon className="w-5 h-5" />
              Dark Mode
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
