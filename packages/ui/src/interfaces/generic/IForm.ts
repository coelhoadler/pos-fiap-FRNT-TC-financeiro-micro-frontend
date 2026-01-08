export interface IForm {
    className?: string;
    id?: string;
    action?: string;
    onClose?: (boolean) => void;
    method: string;
}
export interface IFormLogin extends IForm {}
export interface IFormRegister extends IForm { }