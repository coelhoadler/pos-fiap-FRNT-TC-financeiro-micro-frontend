import "./styles/index.css";
import Home from "./components/Home";
import { Provider } from "react-redux";
import { store } from '@financeiro/ui';
import { Footer } from '@financeiro/ui';
import { HeaderLogin } from '@financeiro/ui';
import { publicApiFunction } from '@financeiro/api-client';

export default function Root(props) {
  publicApiFunction();

  return (
    <Provider store={store}>
      <HeaderLogin />
      <Home />
      <Footer />
    </Provider>
  );
}
