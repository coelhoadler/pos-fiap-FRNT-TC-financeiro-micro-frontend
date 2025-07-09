
export type TMenuFooterTitle = {
    text: string;
    className?: string;
};
export type TMenuFooterItems = {
    text?: string;
    className?: string;
    children?: React.ReactNode;
};
export type TSocialMedia = {
    text: string;
    className?: string;
    href: string;
    image: string;
    isBlank?: boolean;
};