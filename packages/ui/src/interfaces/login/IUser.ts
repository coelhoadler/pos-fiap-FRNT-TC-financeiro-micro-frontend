export interface UserInfoProps {
  name?: string;
  email?: string;
  token?: string;
  messageError?: string;
  isAuthenticated?: boolean;
  loading?: boolean;
}

export interface LoginUserProps extends UserInfoProps {
  password?: string;
}

export interface RegisterUserProps extends UserInfoProps {
  password?: string;
  onClose?: (success: boolean) => void;
}
