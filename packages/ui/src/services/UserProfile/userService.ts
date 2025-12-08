
import { loginFailure, loginRequest, loginSuccess } from '../../features/login/slice';
import store from '../../store/login';

import {
  userAuthentication,
  userInfo,
  userLogout,
  userRegister,
} from '../../../../../libs/api-client/src/auth';

import { LoginUserProps, RegisterUserProps, UserInfoProps } from '../../interfaces/login/IUser';

export const userInfos = async (): Promise<UserInfoProps | null> => {
  try {
    // TODO: Verificar o gerenciamento de estado
    // TODO: Validar se precisa nas demais requisições
    store.dispatch(loginRequest());
    const response = await userInfo();

    const data = await response.json();
    store.dispatch(
      loginSuccess({ email: data.email, name: data.name, token: data.token })
    );
    return { name: data.name, email: data.email, token: data.token };
  } catch (error) {
    if (error?.status === 401) {
      window.location.href = '/login';
    }

    const message = error.message;
    console.log('UserInfoError', message);
    store.dispatch(loginFailure({ error: message }));

    return { messageError: message };
  }
};

export const login = async ({
  email,
  password,
  messageError,
}): Promise<LoginUserProps | null> => {
  try {
    const response = await userAuthentication(email, password);

    localStorage.setItem('user', JSON.stringify(response));
    window.location.href = '/dashboard';
  } catch (error) {
    console.error('LoginError:', error);
    if (error?.status === 401) {
      window.location.href = '/login';
    }
    return { messageError: 'Erro inesperado ao tentar logar.' };
  }
};

export const register = async ({
  email,
  password,
  name,
  messageError,
  onClose,
}): Promise<RegisterUserProps | null> => {
  try {
    await userRegister(name, email, password);
    onClose(true);
  } catch (error) {
    console.error('RegisterError:', error);
    if (error?.status === 401) {
      window.location.href = '/login';
    }
    return { messageError: 'Erro inesperado ao tentar criar a conta.' };
  }
};

export const logout = async () => {
  try {
    await userLogout();
  } catch (error) {
    console.error('LogoutError:', error);
  } finally {
    localStorage.removeItem('user');
    window.location.href = '/';
  }
};
