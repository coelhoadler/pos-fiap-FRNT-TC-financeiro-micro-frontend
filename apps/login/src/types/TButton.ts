export type TButton = {
    text: string;
    className?: string;
    onClick?: () => void;
    typeButton?: | 'outline' | 'default';
    children?: React.ReactNode;
};