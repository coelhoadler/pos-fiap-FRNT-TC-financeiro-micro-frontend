import { loginFailure, loginRequest, loginSuccess } from "../features/slice";
import { UserInfo, LoginUser, RegisterUser } from "../interfaces/IUser";
import store from "../store";

export const userInfos = async (): Promise<UserInfo | null> => {
  try {
    store.dispatch(loginRequest());
    const response = await fetch("http://localhost:3000/api/user/info", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();

      localStorage.setItem("token", data.token);
      store.dispatch(loginSuccess({ email: data.email, name: data.name, token: data.token }));
      return { name: data.name, email: data.email, token: data.token };
    }

    if (response.status === 401) {
      const message = "Usuário não autenticado ou sessão expirada.";
      console.error(message);
      store.dispatch(loginFailure({ message }));
      return { messageError: message }
    }

  } catch (error) {
    if (error?.status === 401) {
      window.location.href = '/login';
    }
    const message = "Erro ao buscar informações do usuário.";
    console.log(message, error);
    store.dispatch(loginFailure({ message }));
    return { messageError: error }
  }
};

export const login = async ({ email, password, messageError }): Promise<LoginUser | null> => {
  try {
    const response = await fetch("http://localhost:3000/api/user/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password: password })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data.message || "Erro ao fazer login.");
      return { messageError: data.message || "Erro ao fazer login." };
    }

    localStorage.setItem('token', data?.token);
    localStorage.setItem('user', JSON.stringify(data))
    window.location.href = "/dashboard";
  } catch (error) {
    console.error("Erro:", error);
    if (error?.status === 401) {
      window.location.href = '/login';
    }
    return { messageError: "Erro inesperado ao tentar logar." };
  }
};

export const register = async ({ email, password, name, messageError, onClose }): Promise<RegisterUser | null> => {
  try {
    const response = await fetch("http://localhost:3000/api/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data.message || "Erro ao criar a conta.");
      return { messageError: data.message || "Erro ao criar a conta." };
    }

    console.log("Conta criada com sucesso:", data);

    onClose(true);

    setTimeout(() => {
      alert("Conta criada com sucesso!");
    }, 1000);

  } catch (error) {
    console.error("Erro:", error);
    if (error?.status === 401) {
      window.location.href = '/login';
    }
    return { messageError: "Erro inesperado ao tentar criar a conta." };
  }
};

export const logout = async () => {
  await fetch("http://localhost:3000/api/user/logout", {
    method: "POST",
    credentials: "include",
  });
  window.location.href = "/";
};



