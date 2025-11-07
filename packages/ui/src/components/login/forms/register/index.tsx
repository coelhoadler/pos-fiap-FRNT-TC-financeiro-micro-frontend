import React from "react";
import { useState } from "react";
import showPassWordIcon from "./../../../../assets/svg/show-password-icon.svg";
import hidePassWordIcon from "./../../../../assets/svg/hide-password-icon.svg";

import { register } from "../../../../services/UserProfile/userService";
import { IFormRegister } from "../../../../interfaces/generic/IForm";
import { Button } from "../../../../components/generic/button";
import { Label } from "../../../../components/generic/label";
import { Input } from "../../../../components/generic/input";
import { Message } from "../../../../components/generic/messages";

export const FormRegister: React.FC<IFormRegister> = ({
  className,
  method,
  action,
  id,
  onClose,
}) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [emailInvalido, setEmailInvalido] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErro("");
    const data = await register({
      email: email,
      name: nome,
      password: senha,
      messageError: erro,
      onClose,
    });
    onClose(true);
    if (!data) {
      setErro("Erro ao fazer login.");
    } else if (data.messageError) {
      setErro(data.messageError);
    }
  };

  return (
    <div className={className}>
      <form action={action} method={method} id={id} onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 w-full">
            <Label text="Nome" required={true} />
            <Input
              required={true}
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Label text="Email" required={true} />
            <Input
              required={true}
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailInvalido(
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)
                );
              }}
              placeholder="Digite seu email"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <Label text="Senha" required={true} />
            <div className="relative">
              <Input
                className="w-full"
                required={true}
                id="email"
                type={showPassword ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
              />
              <div className="absolute right-4 m-auto top-0 bottom-0 w-5 h-5 flex items-center justify-center">
                {showPassword ? (
                  <img
                    src={showPassWordIcon}
                    className="filter-(--filter-ui-gray-300)"
                    alt="Ver Senha"
                  />
                ) : (
                  <img
                    src={hidePassWordIcon}
                    className="filter-(--filter-ui-gray-300)"
                    alt="Esconder Senha"
                  />
                )}
                <Input
                  className="absolute w-full h-full opacity-0 border-none cursor-pointer"
                  id={"showPassword"}
                  required={false}
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 mt-4 mb-2">
            <Input
              required={true}
              className="m-0"
              id="agree-terms"
              type="checkbox"
            />
            <Label
              required={true}
              className="font-normal flex justify-center items-start leading-[1.3] cursor-pointer"
              htmlFor="agree-terms"
              text="Li e estou ciente quanto às condições de tratamento dos meus dados conforme descrito na Política de Privacidade do banco."
            />
          </div>

          <Message
            showMessage={emailInvalido}
            text="Dado incorreto. Revise e digite novamente."
          />

          <Button
            className="w-fit mx-auto mb-4 mt-6"
            typeButton="submit"
            text="Criar Conta"
            variant="primary-2"
          />
        </div>
      </form>
    </div>
  );
};
