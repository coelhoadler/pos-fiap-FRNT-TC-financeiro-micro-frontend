export type TFormInputItem = {
    value?: string;
    placeholder?: string;
    className?: string;
    id: string;
    type?: 'text' | 'submit' | 'password';
    required: boolean;
};
export type TFormLabelItem = {
    className?: string;
    htmlFor?: string;
    text: string;
};
export type TFormMessageItem = {
    className?: string;
    id?: string;
    text: string;
    showMessage: boolean;
};