import Home from "./components/Home";
import { TransactionProvider } from "./setup/context/transactionContext";

import Header from "./components/Header";
import { DesktopMenu } from "./components/MobileMenu";
import { useEffect, useState } from "react";
import { getUserProfile } from "./services/UserProfile/apiEndpoints";
import "./styles/globals.css";

export default function Root() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await getUserProfile();

        if (response) {
          setUsername(response.data.name);
          setIsLoggedIn(true);
        } else {
          setError("Usuário não autenticado.");
          setIsLoggedIn(false);
        }
      } catch (error) {
        setError("Erro ao buscar informações do usuário.");
      }
    }

    getUserInfo();
  }, []);

  return (
    <TransactionProvider>
      <Header isLoggedIn={isLoggedIn} nameUser={username} />
      <main
        className={`flex justify-center min-w-[320px] pt-[116px] pb-[1rem] max-w-[80%] m-auto max-lg:max-w-full max-lg:px-[15px] max-lg:pb-7 ${
          error ? "h-screen" : ""
        }`}
      >
        {error ? (
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center shadow-lg py-6 px-10 bg-white rounded-md">
              <h1 className="text-primary text-center font-family-base text-lg font-bold mb-5">{error}</h1>
              <p className="font-family-base text-md mb-4">Por favor, faça login novamente.</p>
              <a href="/" className="font-family-base text-md border border-primary rounded-sm py-2 px-4 text-primary hover:bg-primary transition-all hover:text-white ">
                Ir para a página de login
              </a>
            </div>
          </div>
        ) : (
          <div className="lg:grid-cols-[250px_auto] lg:grid-colums md:grid-cols-1 w-full  grid gap-3 grid-cols-1">
            <div className="lg:justify-center lg:items-start max-sm:hidden flex justify-center items-center box-content grow-1">
              <DesktopMenu />
            </div>
            <div className="lg:justify-center items-center md:items-start flex grow-3 justify-center max-lg:pt-5">
              <Home username={username} />
            </div>
          </div>
        )}
      </main>
    </TransactionProvider>
  );
}
