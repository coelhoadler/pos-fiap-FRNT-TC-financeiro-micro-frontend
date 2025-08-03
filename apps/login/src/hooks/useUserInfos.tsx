
import { useState, useEffect } from "react";
import { userInfos } from "../services/userService";
import { UserInfo } from "../interfaces/IUser";

function useUserInfo() {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const getUserData = async () => {

      try {
        
        const data = await userInfos();

        if(data.messageError){
          setUser(null)
        }      

        if(!data.messageError){
          setUser(data);
          console.log("Dados do usuário:", data);
        }   
      } catch (error) {
        setUser(null);
        if (error?.status === 401) {
          window.location.href = '/login';
        }
        console.error("Erro ao buscar informações do usuário getUserData:", error);        
      }
      
    };

      

    getUserData();
  }, []);

  return { user };
}

export default useUserInfo;