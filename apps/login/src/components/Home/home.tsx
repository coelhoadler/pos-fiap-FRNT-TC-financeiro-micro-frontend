import React from "react";
import byteBankLogo from "./../../assets/logo-bytebank.svg";
import byteBankIconWhite from "./../../assets/icon-bytebank-white.svg";
import graphImage from "./../../assets/graph.svg";
import vantagem1Image from "./../../assets/vantagem1.svg";
import vantagem2Image from "./../../assets/vantagem2.svg";
import vantagem3Image from "./../../assets/vantagem3.svg";
import vantagem4Image from "./../../assets/vantagem4.svg";
import iconWhatsapp from "./../../assets/icon-whatsapp.svg";
import iconInstagram from "./../../assets/icon-instagram.svg";
import iconYoutube from "./../../assets/icon-youtube.svg";


const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      {/* Inicio Header */}
      <header className="bg-black flex justify-between items-center px-10 py-4">
        <div className="flex items-center space-x-4">
          <img src={byteBankLogo} alt="Bytebank" className="h-6 cursor-pointer" onClick={() => window.location.reload()}/>
          <nav className="space-x-6 text-green-500">
            <a href="#" className="hover:underline">Sobre</a>
            <a href="#" className="hover:underline">Serviços</a>
          </nav>
        </div>
        <div className="space-x-4">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer">
            Abrir minha conta
          </button>
          <button className="border border-green-500 text-green-500 hover:bg-green-600 hover:text-white px-4 py-2 rounded cursor-pointer">
            Já tenho conta
          </button>
        </div>
      </header>
      {/* Fim Header */}

      {/* Incio Conteúdo principal */}
      <main className=" text-black">
        <section className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-b  from-primary to-white pb-4">
        <div className="container pt-6 max-w-290 flex flex-col items-center ">
          <div className="flex flex-col items-center justify-center md:flex-row gap-15">
            <div>
              <p className="text-3xl pt-10 font-semibold text-verde">
                Experimente mais liberdade no controle da sua vida financeira.
                Crie sua conta com a gente!
              </p>
            </div>
            
            <img
              src={graphImage}
              alt="User Interaction"
              width={300}
              height={300}
              className="w-auto h-auto"
            />
          </div>
          
          
        </div>
        <section className="mt-20 text-center">
          <h2 className="text-xl font-bold mb-10">Vantagens do nosso banco:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            <div>
              <img src={vantagem1Image} alt="Ícone Presente" className="mx-auto" />
            </div>
            <div>
              <img src={vantagem2Image} alt="Ícone Saque" className="mx-auto" />
            </div>
            <div>
              <img src={vantagem3Image} alt="Ícone Estrela" className="mx-auto" />
            </div>
            <div>
              <img src={vantagem4Image} alt="Ícone Dispositivo" className="mx-auto" />
            </div>
          </div>
        </section>
      </div>
      
        </section>

        
      </main>
      {/* Fim Conteúdo principal */}

      {/* Incio Footer */}
      <footer className="bg-black text-white px-10 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
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
          <img src={byteBankIconWhite} alt="Bytebank" className="h-5 mb-2 mt-3 " />
          <div className="mt-4 flex space-x-4 ">
            <img src={iconInstagram} alt="Instagram" className="h-5 cursor-pointer" onClick={() => window.location.reload()} />
            <img src={iconWhatsapp} alt="Whatsapp" className="h-5 cursor-pointer" onClick={() => window.location.reload()} />
            <img src={iconYoutube} alt="Youtube" className="h-5 cursor-pointer" onClick={() => window.location.reload()} />
          </div>
        </div>
      </footer>
      {/* Fim Footer */}
    </div>
  );
};

export default Home;
