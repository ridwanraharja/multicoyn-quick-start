import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { FaucetModal } from "./FaucetModal";

export function FaucetButton() {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`
          w-full relative cursor-pointer flex items-center justify-center gap-2
          px-4 py-3 rounded-xl font-medium text-sm
          transition-all duration-300
          hover:scale-[1.02] active:scale-[0.98]
          ${
            theme === "dark"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50"
              : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-600/50"
          }
        `}
      >
        <svg
          className="w-5 h-5 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Get Test Tokens
      </button>

      <FaucetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
