export interface UserInfo {
    name?: string;
    email?: string;
    messageError?: string;
}
export interface LoginUser extends UserInfo {
    password?: string;
}
export interface RegisterUser extends UserInfo {
    password?: string;
    onClose?: (success: boolean) => void;
}