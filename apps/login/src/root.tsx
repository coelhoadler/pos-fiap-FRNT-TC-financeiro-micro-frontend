import "./styles/index.css";
import Home from "./components/Home";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Provider } from "react-redux";
import store from "./store";

export default function Root(props) {

  return (
    <Provider store={store}>
      <Header />
      <Home />
      <Footer />
    </Provider>
  );
}
