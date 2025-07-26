export type TMenuMobile = {
  className?: string;
};
export type TMenuDesktop = {
  className?: string;
};

export type TMenuLinksItems = {
    text: string;
    href: string;
    className?: string;
    style?: React.CSSProperties;
    isBlank?: boolean;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

export type TCtaItems = {
    className?: string;
    onClickLogin?: () => void;
    onClickRegister?: () => void;
};
export type TMenuLogado = {
    className?: string;
    name?:string;
     onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};