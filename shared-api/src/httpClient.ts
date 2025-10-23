// shared-api/src/httpClient.ts
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

//TODO está generalização do httpClient será validada conforme evolução das APIs

const API_BASE_URL = 'http://localhost:3000';

const httpClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // você pode configurar timeout etc
  timeout: 10000,
});

// Interceptor de requisição (por exemplo, adicionar token)
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // recuperar token de localStorage ou outro lugar
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de resposta (tratamento de erros genéricos)
httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // tratamento centralizado de erros, por exemplo se 401, forçar logout
    if (error.response && error.response.status === 401) {
      // fazer logout centralizado ou emitir evento
    }
    return Promise.reject(error);
  }
);

export default httpClient;
