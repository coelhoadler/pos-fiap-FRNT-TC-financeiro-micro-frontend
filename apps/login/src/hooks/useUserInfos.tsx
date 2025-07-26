
import { useState, useEffect } from "react";
import { userInfos } from "../services/userService";
import { UserInfo } from "../interfaces/IUser";

function useUserInfo() {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      const data = await userInfos();
      setUser(data);
    };

    getUserData();
  }, []);

  return { user };
}

export default useUserInfo;