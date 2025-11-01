import api from "./https";

export const AuthAPI = {
  
  login: async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", { email, password });
    return data;
  },

  getProfile: async () => {
    const { data } = await api.get("/auth/profile");
    return data;
  }
  
};