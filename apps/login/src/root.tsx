import "./styles/index.css";
import Home from "./components/Home";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export default function Root(props) {

  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
}
