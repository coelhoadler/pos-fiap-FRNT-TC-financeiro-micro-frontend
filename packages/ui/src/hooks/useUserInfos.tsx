// TODO: Pesquisar outra abordagem pois a atual tem implicacoes de seguranca
// TODO: Mudar o nome do arquivo (talvez)

function useUserInfo() {
  const userLocalStorage = localStorage.getItem('user');
  const userInfo = userLocalStorage ? JSON.parse(userLocalStorage) : {};

  return userInfo;
}

export default useUserInfo;
