import { useTheme } from "../context/ThemeContext";

interface NFTCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export function NFTCard({
  name,
  price,
  image,
  isSelected,
  onClick,
}: NFTCardProps) {
  const { theme } = useTheme();

  return (
    <div
      onClick={onClick}
      className={`
        stagger-item flex-1 rounded-2xl overflow-hidden cursor-pointer 
        transition-all duration-300 ease-out
        hover-lift group
        ${
          isSelected
            ? "ring-2 ring-gradient-1 ring-offset-2 ring-offset-dark-1 scale-[1.02]"
            : ""
        }
        ${
          theme === "dark"
            ? "bg-dark-2 hover:bg-dark-3"
            : "bg-light-2 hover:bg-light-3 shadow-sm hover:shadow-lg"
        }
      `}
    >
      <div
        className={`
          relative w-full h-[182px] flex items-center justify-center rounded-2xl overflow-hidden
          ${theme === "dark" ? "bg-dark-3" : "bg-light-3"}
        `}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-dark-1/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
        />

        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </div>

      <div className="p-3">
        <h3
          className={`
            text-sm font-medium truncate transition-colors duration-200
            ${
              theme === "dark"
                ? "text-white group-hover:text-gradient-1"
                : "text-dark"
            }
          `}
        >
          {name}
        </h3>
        <p
          className={`
            text-sm font-bold mt-1
            bg-linear-to-r from-gradient-1 to-gradient-2 bg-clip-text text-transparent
          `}
        >
          {price}
        </p>
      </div>
    </div>
  );
}
