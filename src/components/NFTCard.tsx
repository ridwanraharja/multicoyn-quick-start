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
        w-[182px] rounded-2xl overflow-hidden cursor-pointer transition-all
        ${
          isSelected
            ? "ring-2 ring-primary ring-offset-2 ring-offset-dark-1"
            : ""
        }
        ${
          theme === "dark"
            ? "bg-dark-3 hover:bg-dark-4"
            : "bg-light-2 hover:bg-light-3 shadow-sm"
        }
      `}
    >
      <div
        className={`
        relative w-full h-[124px] flex items-center justify-center
        ${theme === "dark" ? "bg-dark-3" : "bg-light-3"}
      `}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain p-2"
        />
      </div>

      <div className="p-3">
        <h3
          className={`
          text-sm font-medium truncate
          ${theme === "dark" ? "text-white" : "text-dark"}
        `}
        >
          {name}
        </h3>
        <p
          className={`
          text-sm font-bold mt-1
          ${theme === "dark" ? "text-white" : "text-dark"}
        `}
        >
          {price}
        </p>
      </div>
    </div>
  );
}
