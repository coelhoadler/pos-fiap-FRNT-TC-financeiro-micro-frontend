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
    onClick?: () => void;
};

export type TCtaItems = {
    className?: string;
    onClickLogin?: () => void;
    onClickRegister?: () => void;
};
export type TMenuLogado = {
    className?: string;
    name?:string;
};