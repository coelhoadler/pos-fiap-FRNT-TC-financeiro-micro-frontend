import { TButton } from "../../types/TButton";

const Button = ({
  text,
  className,
  typeButton,
  styleButton,
  children,
  onClick,
}: TButton) => {
  return (
    <button
      type={
        typeButton === "button"
          ? "button"
          : typeButton === "submit"
          ? "submit"
          : "reset"
      }
      onClick={onClick}
      className={`font-family-base text-md px-4 py-2 rounded-[8px] font-semibold cursor-pointer transition-all ${
        styleButton === "outline"
          ? "border border-link text-link hover:bg-link hover:text-white"
          : "bg-link hover:bg-link-500 text-white"
      }  ${className ? className : ""}`}
    >
      {text || children}
    </button>
  );
};

export default Button;
