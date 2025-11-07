import React from "react";
import { useState } from "react";
import showPassWordIcon from "./../../../../assets/svg/show-password-icon.svg";
import hidePassWordIcon from "./../../../../assets/svg/hide-password-icon.svg";

import { login } from "../../../../services/UserProfile/userService";
import { IFormLogin } from "../../../../interfaces/generic/IForm";
import { Button } from "../../../../components/generic/button";
import { Label } from "../../../../components/generic/label";
import { Input } from "../../../../components/generic/input";
import { Message } from "../../../../components/generic/messages";
import { cn } from "../../../../utils/utils";

export const FormLogin: React.FC<IFormLogin> = ({ className, method, id }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErro("");

    const data = await login({
      email,
      password: senha,
      messageError: erro,
    });

    if (data?.messageError) {
      setErro(data.messageError);
    }
  };

  return (
    <div className={cn(`w-full`, className ? className : "")}>
      <form onSubmit={handleSubmit} method={method} id={id}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 w-full">
            <Label text="Email" required={true} />
            <Input
              required={true}
              id="email"
              placeholder="Digite seu email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <Label text="Senha" required={true} />
            <div className="relative">
              <Input
                className="w-full"
                required={true}
                id="senha"
                placeholder="Digite sua senha"
                type={showPassword ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <div className="absolute right-4 m-auto top-0 bottom-0 w-5 h-5 flex items-center justify-center">
                {showPassword ? (
                  <img
                    src={showPassWordIcon}
                    className="filter-(--filter-gray-300)"
                    alt="Ver Senha"
                  />
                ) : (
                  <img
                    src={hidePassWordIcon}
                    className="filter-(--filter-gray-300)"
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

          <Message variant="error" showMessage={!!erro} text={erro} />

          <Button
            className="w-fit m-auto mt-6"
            variant="primary-2"
            typeButton="submit"
            text="Acessar"
          />
        </div>
      </form>
    </div>
  );
};
