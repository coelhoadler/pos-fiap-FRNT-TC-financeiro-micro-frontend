import Home from './components/Home';
import { TransactionProvider } from './setup/context/transactionContext';
import 'regenerator-runtime/runtime';

import './styles/globals.css';

export default function Root() {
  return (
    <TransactionProvider>
      <Home />
    </TransactionProvider>
  );
}
