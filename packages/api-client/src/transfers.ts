import api from "./https";

export const FinanceAPI = {
  
  getTaxes: async () => {
    const { data } = await api.get("/finance/taxes");
    return data;
  },

  getLCR: async () => {
    const { data } = await api.get("/finance/lcr");
    return data;
  }
  
};