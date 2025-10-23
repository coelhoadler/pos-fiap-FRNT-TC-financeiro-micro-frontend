// shared-api/src/api.ts
import httpClient from './httpClient';
import { getOrAddRequest } from './cache';
import { Transfer } from './types';
//TODO todas as funções de API serão ajustadas
export interface User {
  id: string;
  name: string;
  // ...
}

// exemplo de função de API com deduplicação
export function getUser(userId: string): Promise<User> {
  const key = `getUser:${userId}`;
  return getOrAddRequest(key, () => {
    return httpClient
      .get<User>(`/users/${userId}`)
      .then((res: any) => res.data);
  });
}

// outro endpoint
export function getTransfers(accountId: string): Promise<Transfer[]> {
  const key = `getTransfers:${accountId}`;
  return getOrAddRequest(key, () => {
    return httpClient
      .get<Transfer[]>(`/transfers?accountId=${accountId}`)
      .then((res: any) => res.data);
  });
}

// etc.
