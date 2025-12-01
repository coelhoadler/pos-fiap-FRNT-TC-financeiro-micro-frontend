import React from "react";
import { TButton } from "../../../types/generic/TButton";
import { cn } from "../../../utils/utils";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

export const Button = ({
  text,
  className,
  typeButton,
  variant = "primary",
  children,
  disabled,
  onClick,
}: TButton) => {
  return (
    <>
      {variant === "edit" || variant === "delete" || variant === "reload" ? (
        <button
          title={text}
          className={cn(
            `bg-ui-primary rounded-full h-10 w-10 flex items-center justify-center cursor-pointer`,
            disabled
              ? "pointer-events-none bg-ui-gray-300 text-black opacity-[.8]"
              : "",
            className
          )}
          disabled={disabled}
          onClick={onClick}
        >
          {variant === "edit" && (
            <DriveFileRenameOutlineIcon
              sx={{
                color: "white",
                cursor: "pointer",
                transition: "color 0.3s",
                "&:hover": {
                  color: "#8aec49",
                },
              }}
            />
          )}
          {variant === "delete" && (
            <DeleteForeverIcon
              sx={{
                color: "white",
                cursor: "pointer",
                transition: "color 0.3s",
                "&:hover": {
                  color: "#8d4d48",
                },
              }}
            />
          )}

          {variant === "reload" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M8 16H3v5" />
            </svg>
          )}
        </button>
      ) : (
        <button
          type={
            typeButton === "button"
              ? "button"
              : typeButton === "submit"
              ? "submit"
              : "reset"
          }
          disabled={disabled}
          onClick={onClick}
          className={cn(
            `font-family-base text-md px-4 py-2 rounded-lg font-semibold cursor-pointer transition-all`,
            variant === "primary"
              ? "bg-ui-primary hover:bg-ui-primary-500 text-white"
              : variant === "primary-outline"
              ? "border border-ui-primary text-ui-primary hover:bg-ui-primary hover:text-white"
              : variant === "primary-2"
              ? "bg-ui-primary-2 hover:bg-ui-primary-2-500 text-white"
              : variant === "primary-2-outline"
              ? "border border-ui-primary-2 text-ui-primary-2 hover:bg-ui-primary-2 hover:text-white"
              : "",
            disabled
              ? "pointer-events-none bg-ui-gray-300 text-black opacity-[.8]"
              : "",
            className
          )}
        >
          {text || children}
        </button>
      )}
    </>
  );
};

export default Button;
