export type TButton = {
    text: string;
    className?: string;
    onClick?: () => void;
    variant?: | 'primary-outline' | 'primary' | 'primary-2-outline' | 'primary-2';
    typeButton?: "button" | "submit" | "reset";
    children?: React.ReactNode;
};