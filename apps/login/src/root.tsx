import "./styles/index.css";
import Home from "./components/Home";
import { Provider } from "react-redux";
import { store } from '@financeiro/ui';
import { Footer } from '@financeiro/ui';
import { HeaderLogin } from '@financeiro/ui';

export default function Root(props) {

  return (
    <Provider store={store}>
      <HeaderLogin />
      <Home />
      <Footer />
    </Provider>
  );
}
