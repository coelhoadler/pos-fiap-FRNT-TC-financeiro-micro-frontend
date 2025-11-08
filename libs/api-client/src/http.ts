import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

// Nome do cookie onde o token está armazenado
const TOKEN_COOKIE_NAME = 'auth_token'; // Ajuste conforme seu projeto

// Configuração base do cliente HTTP
const httpClient: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor de requisição para adicionar o token automaticamente
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Busca o token dos cookies
    const token = Cookies.get('token');

    if (token) {
      // Adiciona o token no header Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de resposta para tratar erros de autenticação
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se receber 401 (não autorizado), redireciona para login
    if (error.response?.status === 401) {
      // Remove o token expirado
      Cookies.remove(TOKEN_COOKIE_NAME);

      // Redireciona para o microfrontend de login
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default httpClient;
