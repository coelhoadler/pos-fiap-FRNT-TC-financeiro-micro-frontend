import Home from './components/Home';
import { TransactionProvider } from './setup/context/transactionContext';

import Header from './components/Header';
import { DesktopMenu } from './components/MobileMenu';
import './styles/globals.css';
import { useEffect, useState } from 'react';
import { getUserProfile } from './services/UserProfile/apiEndpoints';

export default function Root() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile;
        setUsername(response.data.name);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <TransactionProvider>
      <Header nameUser={username} />

      <main className="flex justify-center min-w-[320px] pt-[116px] pb-[1rem] max-w-[80%] m-auto max-lg:max-w-full max-lg:px-[15px] max-lg:pb-7">
        <div className="lg:grid-cols-[250px_auto] lg:grid-colums md:grid-cols-1 w-full  grid gap-3 grid-cols-1">
          <div className="lg:justify-center lg:items-start max-sm:hidden flex justify-center items-center box-content grow-1">
            <DesktopMenu />
          </div>
          <div className="lg:justify-center items-center md:items-start flex grow-3 justify-center max-lg:pt-5">
            <Home username={username} />
          </div>
        </div>
      </main>
    </TransactionProvider>
  );
}
