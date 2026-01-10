import { useTheme } from "../context/ThemeContext";
import { CloseIcon, DiscoverIcon, MoonIcon, SunIcon } from "./icons";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: "discover", label: "Discover", icon: DiscoverIcon },
];

interface SidebarProps {
  activeNav: string;
  onNavChange: (id: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({
  activeNav,
  onNavChange,
  isOpen = true,
  onClose,
}: SidebarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative z-50 lg:z-auto
          w-[280px] lg:w-[220px] h-screen flex flex-col
          transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${
            theme === "dark"
              ? "bg-dark-2/95 lg:bg-dark-2 backdrop-blur-xl lg:backdrop-blur-none border-r border-border"
              : "bg-light-2/95 lg:bg-light-2 backdrop-blur-xl lg:backdrop-blur-none border-r border-light-4 shadow-sm"
          }
        `}
      >
        {/* Header with Logo */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Animated Logo */}
            <div
              className={`
              w-10 h-10 rounded-xl flex items-center justify-center
              bg-linear-to-br from-gradient-1 to-gradient-2
              animate-pulse-glow
            `}
            >
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <h1
              className={`
                text-xl font-bold
                ${theme === "dark" ? "text-white" : "text-dark"}
              `}
            >
              Marketplace
            </h1>
          </div>

          {/* Close button - mobile only */}
          <button
            onClick={onClose}
            className={`
              lg:hidden p-2 rounded-lg transition-all duration-200 cursor-pointer
              hover:scale-110 active:scale-95
              ${
                theme === "dark"
                  ? "hover:bg-dark-3 text-white-75"
                  : "hover:bg-light-3 text-gray"
              }
            `}
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4">
          <ul className="space-y-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <li
                  key={item.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <button
                    onClick={() => {
                      onNavChange(item.id);
                      if (window.innerWidth < 1024) onClose?.();
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98]
                      ${
                        isActive
                          ? theme === "dark"
                            ? "bg-linear-to-r from-gradient-1/20 to-gradient-2/20 text-white border border-gradient-1/30"
                            : "bg-linear-to-r from-gradient-1/20 to-gradient-2/20 text-dark border border-gradient-1/30"
                          : theme === "dark"
                          ? "text-white-75 hover:bg-dark-3 hover:text-white"
                          : "text-gray hover:bg-light-3 hover:text-dark"
                      }
                    `}
                  >
                    <Icon
                      className={`w-5 h-5 ${isActive ? "text-gradient-1" : ""}`}
                    />
                    {item.label}
                    {isActive && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-gradient-1 animate-pulse" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Theme Toggle */}
        <div
          className={`p-4 border-t ${
            theme === "dark" ? "border-border" : "border-light-4"
          }`}
        >
          <button
            onClick={toggleTheme}
            className={`
              w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium 
              transition-all duration-300
              hover:scale-[1.02] active:scale-[0.98]
              group
              ${
                theme === "dark"
                  ? "bg-dark-3 text-white-75 hover:text-white hover:bg-dark-4"
                  : "bg-light-3 text-gray hover:text-dark hover:bg-light-4"
              }
            `}
          >
            {theme === "dark" ? (
              <>
                <SunIcon className="w-5 h-5 group-hover:animate-spin-slow" />
                Light Mode
              </>
            ) : (
              <>
                <MoonIcon className="w-5 h-5 group-hover:animate-float" />
                Dark Mode
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
