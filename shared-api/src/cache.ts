// shared-api/src/cache.ts
type Key = string;

//TODO Este arquivo de cache será validado se reamente é necessário
const pendingRequests = new Map<Key, Promise<any>>();

export function getOrAddRequest<T>(
  key: Key,
  requestFn: () => Promise<T>
): Promise<T> {
  if (pendingRequests.has(key)) {
    // já existe requisição pendente para essa chave, retornar ela
    return pendingRequests.get(key)! as Promise<T>;
  }
  const promise = requestFn().finally(() => {
    pendingRequests.delete(key);
  });
  pendingRequests.set(key, promise);
  return promise;
}
