import React from "react";
import graphImage from "./../../assets/graph.svg";
import vantagem1Image from "./../../assets/vantagem1.svg";
import vantagem2Image from "./../../assets/vantagem2.svg";
import vantagem3Image from "./../../assets/vantagem3.svg";
import vantagem4Image from "./../../assets/vantagem4.svg";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col bg-gradient-to-b  from-primary to-white pt-8 pb-24">
      {/* Incio Conteúdo principal */}
      <div className="container m-auto max-w-290">
        <section className="flex flex-col md:flex-row justify-between items-center">
          <div className=" flex flex-col items-center justify-center w-full h-full ">
            <div className=" pt-6 flex flex-col items-center ">
              <div className="flex flex-col items-center justify-center md:flex-row gap-15">
                <div>
                  <p className="text-3xl pt-10 font-semibold text-verde">
                    Experimente mais liberdade no controle da sua vida
                    financeira. Crie sua conta com a gente!
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
            <section className="mt-20 text-center w-full">
              <h2 className="text-xl font-bold mb-10">
                Vantagens do nosso banco:
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                <div>
                  <img
                    src={vantagem1Image}
                    alt="Ícone Presente"
                    className="mx-auto"
                  />
                </div>
                <div>
                  <img
                    src={vantagem2Image}
                    alt="Ícone Saque"
                    className="mx-auto"
                  />
                </div>
                <div>
                  <img
                    src={vantagem3Image}
                    alt="Ícone Estrela"
                    className="mx-auto"
                  />
                </div>
                <div>
                  <img
                    src={vantagem4Image}
                    alt="Ícone Dispositivo"
                    className="mx-auto"
                  />
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
      {/* Fim Conteúdo principal */}
    </div>
  );
};

export default Home;
