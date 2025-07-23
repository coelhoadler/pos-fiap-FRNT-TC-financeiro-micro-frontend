export const isTokenValid = (): boolean => {
  const expiration = localStorage.getItem("token_expiration");
  if (!expiration) return false;

  const now = Date.now();
  return now < parseInt(expiration);
};
