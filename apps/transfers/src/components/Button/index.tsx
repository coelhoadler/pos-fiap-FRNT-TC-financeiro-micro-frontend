import React from "react";

interface ButtonProps {
  primary?: boolean;
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  primary = false,
  style,
  type = "button",
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      className={[
        "min-w-[250px]",
        "h-[48px]",
        `${primary ? "hover:bg-primary" : "hover:bg-secondary"}`,
        `${disabled ? "pointer-events-none" : ""}`,
        "bg-inactive",
        "cursor-pointer",
        "text-primary",
        "hover:text-white",
        "py-2 px-4",
        "rounded-[8px]",
        "transition",
        "font-medium",
      ].join(" ")}
      onClick={onClick}
      style={style}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
