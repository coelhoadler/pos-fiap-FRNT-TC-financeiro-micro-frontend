export interface IForm {
    labelEmail?: string;
    inputEmail?: string;
    labelSenha?: string;
    inputSenha?: string;
    labelNome?: string;
    inputNome?: string;
    messageError?: string | React.ReactNode;
    textBtn?: string;
    linkEsqueciSenha?: string;
    checkboxLabel?: string;
    checkboxInput?: string;
    className?:string;
    id?:string;
    action?:string;
    method:string;
    onClick?: () => void;
    onChange?:() => void;
}
export interface IFormLogin extends IForm {
    linkEsqueciSenha?: string;
}
export interface IFormRegister extends IForm {
}