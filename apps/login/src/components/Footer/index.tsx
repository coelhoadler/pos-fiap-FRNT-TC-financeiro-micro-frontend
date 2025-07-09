import React from "react";
import byteBankIconWhite from "./../../assets/icon-bytebank-white.svg";
import iconInstagram from "./../../assets/icon-instagram.svg";
import iconWhatsapp from "./../../assets/icon-whatsapp.svg";
import iconYoutube from "./../../assets/icon-youtube.svg";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white px-10 py-10 ">
      <div className="container max-w-290 m-auto flex justify-between items-center">
        <div>
          <h4 className="font-bold mb-2">Serviços</h4>
          <ul className="space-y-1 text-sm">
            <li>Conta corrente</li>
            <li>Conta PJ</li>
            <li>Cartão de crédito</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Contato</h4>
          <ul className="space-y-1 text-sm">
            <li>0800 004 250 08</li>
            <li>meajuda@bytebank.com.br</li>
            <li>ouvidoria@bytebank.com.br</li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-bold">Desenvolvido por Equipe</p>
          <img
            src={byteBankIconWhite}
            alt="Bytebank"
            className="h-5 mb-2 mt-3 "
          />
          <div className="mt-4 flex space-x-4 ">
            <img
              src={iconInstagram}
              alt="Instagram"
              className="h-5 cursor-pointer"
              onClick={() => window.location.reload()}
            />
            <img
              src={iconWhatsapp}
              alt="Whatsapp"
              className="h-5 cursor-pointer"
              onClick={() => window.location.reload()}
            />
            <img
              src={iconYoutube}
              alt="Youtube"
              className="h-5 cursor-pointer"
              onClick={() => window.location.reload()}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
