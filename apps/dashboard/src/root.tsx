import Home from './components/Home';
import { TransactionProvider } from './setup/context/transactionContext';

import Header from './components/Header';
import { DesktopMenu } from './components/MobileMenu';
import { useEffect, useState } from 'react';
import { getUserProfile } from './services/UserProfile/apiEndpoints';
import './styles/globals.css';

export default function Root() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await getUserProfile();

        if (response) {
          setUsername(response.data.name);
        } else {
          setError("Usuário não autenticado.");
        }
      } catch (error) {
        setError("Erro ao buscar informações do usuário.");
      }
    };

    getUserInfo();

  }, []);

  return (
    <TransactionProvider>
      <Header nameUser={username} />
      <main className="flex justify-center min-w-[320px] pt-[116px] pb-[1rem] max-w-[80%] m-auto max-lg:max-w-full max-lg:px-[15px] max-lg:pb-7">
        { 
        error ? 
        <div className="text-red-500">
            <div className="error flex flex-col items-center justify-center h-screen">
              <h1>{error}</h1>
              <p>Por favor, faça login novamente.</p>
              <a href="/login" className="text-blue-500 hover:underline">Ir para a página de login</a>
            </div>
        </div> : 
        <div className="lg:grid-cols-[250px_auto] lg:grid-colums md:grid-cols-1 w-full  grid gap-3 grid-cols-1">
          <div className="lg:justify-center lg:items-start max-sm:hidden flex justify-center items-center box-content grow-1">
            <DesktopMenu />
          </div>
          <div className="lg:justify-center items-center md:items-start flex grow-3 justify-center max-lg:pt-5">
            <Home username={username} />
          </div>
        </div>
      }
      </main>        
    </TransactionProvider>

  );
}
