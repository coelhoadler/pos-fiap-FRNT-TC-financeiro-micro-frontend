import React from "react";
import byteBankIconWhite from "./../../assets/icon-bytebank-white.svg";
import iconInstagram from "./../../assets/icon-instagram.svg";
import iconWhatsapp from "./../../assets/icon-whatsapp.svg";
import iconYoutube from "./../../assets/icon-youtube.svg";
import {
  TMenuFooterTitle,
  TMenuFooterItems,
  TSocialMedia,
} from "../../types/TFooter";

const MenuFooterTitle = ({ text, className }: TMenuFooterTitle) => {
  return (
    <h4
      className={`font-bold font-family-base text-md mb-2 text-white ${
        className ? className : ""
      }`}
    >
      {text}
    </h4>
  );
};

const MenuFooterItems = ({ text, className, children }: TMenuFooterItems) => {
  return (
    <li
      className={`font-normal font-family-base text-sm mb-2 text-white ${
        className ? className : ""
      }`}
    >
      {text || children}
    </li>
  );
};

const SocialMediaFooter = ({
  text,
  className,
  href,
  image,
  isBlank,
}: TSocialMedia) => {
  return (
    <div
      className={`relative hover:scale-110 transition-all ${
        className ? className : ""
      }`}
    >
      <a
        href={href}
        target={isBlank ? "_blank" : "_self"}
        title={text}
        className="text-zero cursor-pointer absolute top-0 left-0 right-0 bottom-0 m-auto z-[1] w-full h-full block "
      >
        {text}
      </a>
      <img src={image} alt={text} className="w-7 h-7" />
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white px-10 py-10 ">
      <div className="container max-w-290 m-auto flex justify-between items-center">
        <div>
          <MenuFooterTitle text="Serviços" />
          <ul className="space-y-1">
            <MenuFooterItems text="Conta corrente" />
            <MenuFooterItems text="Conta PJ" />
            <MenuFooterItems text="Cartão de crédito" />
          </ul>
        </div>
        <div>
          <MenuFooterTitle text="Contato" />
          <ul className="space-y-1">
            <MenuFooterItems text="0800 004 250 08" />

            <MenuFooterItems>
              <a
                href="mailto:#"
                className="hover:underline transition-all"
                title="meajuda@bytebank.com.br"
              >
                meajuda@bytebank.com.br
              </a>
            </MenuFooterItems>
            <MenuFooterItems>
              <a
                href="mailto:#"
                className="hover:underline transition-all"
                title="ouvidoria@bytebank.com.br"
              >
                ouvidoria@bytebank.com.br
              </a>
            </MenuFooterItems>
          </ul>
        </div>
        <div>
          <MenuFooterTitle text="Desenvolvido por Equipe" />
          <img
            src={byteBankIconWhite}
            alt="Bytebank"
            className="h-5 mb-2 mt-3 "
          />
          <div className="mt-4 flex space-x-4 ">
            <SocialMediaFooter text="Instagram" href="#" image={iconInstagram} />
            <SocialMediaFooter text="Whatsapp" href="#" image={iconWhatsapp} />
            <SocialMediaFooter text="Youtube" href="#" image={iconYoutube} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer, MenuFooterTitle, MenuFooterItems, SocialMediaFooter };
