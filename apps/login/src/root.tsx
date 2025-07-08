import Home from "./components/Home/home";
import "./index.css";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";

export default function Root(props) {
  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
  // <section className="bg-primary text-green-500">{props.name} is mounted!</section>;
}
