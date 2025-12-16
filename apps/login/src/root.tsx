import "./styles/index.css";
import Home from "./components/Home";
import { Provider } from "react-redux";
import { store } from '@financeiro/ui';
import { Footer } from '@financeiro/ui';
import { HeaderLogin } from '@financeiro/ui';
import { publicApiFunction, publicApiFunction2 } from '@financeiro/api-client';

export default function Root(props) {
  publicApiFunction();
  publicApiFunction2();

  return (
    <Provider store={store}>
      <HeaderLogin />
      <Home />
      <Footer />
    </Provider>
  );
}
