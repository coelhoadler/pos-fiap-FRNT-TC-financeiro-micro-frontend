import axios, { AxiosInstance } from 'axios';

type ApiConfig = {
  baseURL?: string;
  token?: string | null;
};

class SharedApi {
  axios: AxiosInstance;

  constructor(config?: ApiConfig) {
    this.axios = axios.create({
      baseURL:
        config?.baseURL ?? (window as any).__SHARED_API_BASE_URL ?? '/api',
      headers: { 'Content-Type': 'application/json' },
    });
    if (config?.token) {
      this.setToken(config.token);
    }
  }

  setToken(token: string | null) {
    if (token)
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    else delete this.axios.defaults.headers.common['Authorization'];
  }

  async get<T = any>(url: string, params?: any) {
    const r = await this.axios.get<T>(url, { params });
    return r.data;
  }
  async post<T = any>(url: string, body?: any) {
    const r = await this.axios.post<T>(url, body);
    return r.data;
  }
  // adicione helpers put/patch/delete se quiser...
}

const defaultInstance = new SharedApi();

// Exports (nome simples, compatível com import map)
export { SharedApi, defaultInstance as sharedApi };
