export interface IForm {
    className?: string;
    id?: string;
    action?: string;
    method: string;
}
export interface IFormLogin extends IForm {}
export interface IFormRegister extends IForm { }