import "./styles/index.css";
import Home from "./components/Home";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { useEffect } from "react";
import { isTokenValid } from "./utils/expirationToken";

export default function Root(props) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isTokenValid()) {      
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("token_expiration");
      window.location.href = "/";
    }
  }, []);

  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
}
