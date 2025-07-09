import Home from "./components/Home";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
