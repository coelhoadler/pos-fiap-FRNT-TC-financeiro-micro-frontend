import useUserInfo from "../../hooks/useUserInfos"

export type TMenu = {
  onClickItem?: () => void;
};

export type TMenuItem = {
  title: string;
  path: string;
};

export type TActionButtonsMenu = {
  className?: string;
  onClickLogin?: () => void;
  onClickRegister?: () => void;
};

export type TCustomLinkMenu = {
  text: string;
  href: string;
  className?: string;
  style?: React.CSSProperties;
  isBlank?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

export type TMenuMobile = {
  className?: string;
  useAuth?: ReturnType<typeof useUserInfo>;
  menuLinksItems?: TMenuLinksItems[];
   menuLinksItemsLogado?: TMenuLinksItems[];
  variant?: "dashboard" | "login";
};
export type TMenuDesktop = {
  className?: string;
  useAuth?: ReturnType<typeof useUserInfo>;
  menuLinksItems?: TMenuLinksItems[]; menuLinksItemsLogado?: TMenuLinksItems[];
  variant?: "dashboard" | "login";
};

export type TMenuLogado = {
  className?: string;
  name?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  variant?: "dashboard" | "login";
  menuLinksItemsLogado?: TMenuLinksItems[];
};

export type TMenuLinksItems = {
  text: string;
  href: string;
  className?: string;
  style?: React.CSSProperties;
  isBlank?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};