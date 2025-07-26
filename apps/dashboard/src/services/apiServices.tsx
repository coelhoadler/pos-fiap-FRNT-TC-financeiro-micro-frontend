import { IAccount } from '../Models/accountModels';
import { IApiServices } from '../Models/apiServiceModels';
import axiosClient from './axiosClient';

export class ApiServices<T> implements IApiServices<T> {
  private API_BASE_URL: string;

  constructor(endpoint: string) {
    this.API_BASE_URL = endpoint;
  }

  async getAll(): Promise<T[]> {
    const response = await axiosClient.get<T[]>(`${this.API_BASE_URL}`);
    return response.data;
  }

  async getById(id: string): Promise<T> {
    const response = await axiosClient.get<T>(`${this.API_BASE_URL}/${id}`);
    return response.data;
  }

  async create(data: Partial<T>): Promise<T> {
    const response = await axiosClient.post<T>(this.API_BASE_URL, data);
    return response.data;
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const response = await axiosClient.put<T>(
      `${this.API_BASE_URL}/${id}`,
      data
    );
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await axiosClient.delete(`${this.API_BASE_URL}/${id}`);
  }

  /**
   * Get Joana account by account number
   * @param accountNumber Joana account number
   * @returns object IAccount
   */
  async getAccountById(accountNumber: string): Promise<IAccount> {
    const response = await axiosClient.get<IAccount>(`${this.API_BASE_URL}`);
    return response.data;
  }

  async updateAccountById(
    accountNumber: string,
    data: Partial<IAccount>
  ): Promise<IAccount> {
    const response = await axiosClient.put<IAccount>(
      `${this.API_BASE_URL}`,
      data
    );
    return response.data;
  }
}
