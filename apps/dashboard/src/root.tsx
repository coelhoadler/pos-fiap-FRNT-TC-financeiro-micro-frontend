import Home from './components/Home';
import { TransactionProvider } from './setup/context/transactionContext';
import 'regenerator-runtime/runtime';

import './styles/globals.css';
import Header from './components/Header';

export default function Root() {
  return (
    <TransactionProvider>
      <Header nameUser="Joana" /> {/* Hard coded por enquanto */}
      <Home />
    </TransactionProvider>
  );
}
