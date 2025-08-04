function useUserInfo() {
  const userLocalStorage = localStorage.getItem('user');
  const userInfo = userLocalStorage ? JSON.parse(userLocalStorage) : {};

  return userInfo;
}

export default useUserInfo;