export type TMessage = {
    className?: string;
    id?: string;
    text: string;
    showMessage: boolean;
    variant: 'error' | 'info' | 'success';
};
