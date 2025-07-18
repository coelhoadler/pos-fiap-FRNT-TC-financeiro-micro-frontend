export type TButton = {
    text: string;
    className?: string;
    onClick?: () => void;
    styleButton?: | 'outline' | 'default';
    typeButton?:| "button" | "submit" | "reset";
    children?: React.ReactNode;
};