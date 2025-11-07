export interface UserInfo {
    name?: string;
    email?: string;
    token?: string;
    messageError?: string;
    isAuthenticated?: boolean,
    loading?: boolean
}

export interface LoginUser extends UserInfo {
    password?: string;
}

export interface RegisterUser extends UserInfo {
    password?: string;
    onClose?: (success: boolean) => void;
}