export type TFormInputItem = {
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
export type TFormLabelItem = {
    className?: string;
    htmlFor?: string;
    text: string;
    required?: boolean;
};
export type TFormMessageItem = {
    className?: string;
    id?: string;
    text: string;
    showMessage: boolean;
};
export type TFormCheckboxItem = {
    className?: string;
    id?: string;
    required?: boolean;
    labelText: string;
};