export type TFooter = {
    id?: string;
    className?: string;
};

export type TMenuTitle = {
    text: string;
    className?: string;
};

export type TMenuItems = {
    text?: string;
    className?: string;
    children?: React.ReactNode;
    link?: string;
};
