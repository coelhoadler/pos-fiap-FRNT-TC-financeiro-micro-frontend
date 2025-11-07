export type TInput = {
    placeholder?: string;
    className?: string;
    id: string;
    type?: 'text' | 'submit' | 'password' | 'checkbox' | 'radio' | 'email';
    required: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?:  () => void;
    checked?: boolean;
};