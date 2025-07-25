import { useState } from "react";
import { IFormLogin, IFormRegister } from "../../interfaces/IForm";
import showPassWordIcon from "./../../assets/show-password-icon.svg";
import hidePassWordIcon from "./../../assets/hide-password-icon.svg";
import {
  TFormCheckboxItem,
  TFormInputItem,
  TFormLabelItem,
  TFormMessageItem,
} from "../../types/TForms";
import Button from "../Button";
import { login, register } from "../../services/userService";

const FormInputItem = ({
  className,
  placeholder,
  type,
  id,
  required,
  onChange,
  value,
  onClick,
  checked,
}: TFormInputItem) => {
  return (
    <>
      <input
        id={id}
        className={`min-h-10 bg-white focus:border-primary/50 text-md placeholder:font-normal focus:outline-none focus:shadow-none border-inactive rounded-sm border py-0 px-2.5   font-family-base font-medium text-text-primary  ${
          className ? className : ""
        } `}
        value={value ? value : ""}
        placeholder={placeholder ? placeholder : ""}
        required={required}
        onChange={onChange}
        onClick={onClick}
        checked={checked}
        type={
          type === "password"
            ? "password"
            : type === "text"
            ? "text"
            : type === "submit"
            ? "submit"
            : type === "checkbox"
            ? "checkbox"
            : type === "radio"
            ? "radio"
            : type === "email"
            ? "email"
            : "text"
        }
      />
    </>
  );
};

const FormLabelItem = ({
  className,
  htmlFor,
  text,
  required,
}: TFormLabelItem) => {
  return (
    <label
      className={` font-bold font-family-base text-black text-md ${
        className ? className : ""
      }`}
      htmlFor={htmlFor ? htmlFor : ""}
    >
      {required && <span className="text-error mr-0.5">*</span>}
      {text}
    </label>
  );
};

const FormCheckboxItem = ({
  className,
  id,
  labelText,
  required,
}: TFormCheckboxItem) => {
  return (
    <div className={` flex items-start gap-3 ${className ? className : ""}`}>
      <FormInputItem
        type="checkbox"
        className={`w-6 h-6 border-link min-h-[24px!important] cursor-pointer appearance-none checked:bg-no-repeat checked:bg-position-[center_top_6px] checked:bg-size-[14px] checked:bg-[image:var(--bg-check-icon)]`}
        id={id ? id : ""}
        required={required ? required : false}
      />
      <FormLabelItem
        htmlFor={id}
        className="font-normal text-sm cursor-pointer"
        text={labelText}
        required={required ? required : false}
      />
    </div>
  );
};

const FormMessageItem = ({
  className,
  text,
  id,
  showMessage,
}: TFormMessageItem) => {
  return (
    <>
      {showMessage && (
        <p
          className={` text-error text-sm font-family-base font-normal ${
            className ? className : ""
          }`}
          id={id ? id : ""}
        >
          {text}
        </p>
      )}
    </>
  );
};

const FormLogin: React.FC<IFormLogin> = ({ className, method, action, id }) => {
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
    if (!data) {
      setErro("Erro ao fazer login.");
    } else if (data.messageError) {
      setErro(data.messageError);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} method={method} id={id}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 w-full">
            <FormLabelItem text="Email" required={true} />
            <FormInputItem
              required={true}
              id="email"
              placeholder="Digite seu email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <FormLabelItem text="Senha" required={true} />
            <div className="relative">
              <FormInputItem
                className="w-full custom-password"
                required={true}
                id="senha"
                placeholder="Digite sua senha"
                type={showPassword ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <div className="absolute right-4 m-auto top-0 bottom-0 w-5 h-5 flex items-center justify-center">
                {showPassword ? (
                  <img src={showPassWordIcon} className="filter-(--filter-gray-300)" alt="Ver Senha" />
                ) : (
                  <img src={hidePassWordIcon} className="filter-(--filter-gray-300)" alt="Esconder Senha" />
                )}
                <FormInputItem
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

          <FormMessageItem showMessage={!!erro} text={erro} />

          <Button className="w-fit m-auto" typeButton="submit" text="Acessar" />
        </div>
      </form>
    </div>
  );
};

const FormRegister: React.FC<IFormRegister> = ({
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
            <FormLabelItem text="Nome" required={true} />
            <FormInputItem
              required={true}
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <FormLabelItem text="Email" required={true} />
            <FormInputItem
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
            <FormLabelItem text="Senha" required={true} />
            <FormInputItem
              required={true}
              id="email"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
            />
          </div>

          <FormCheckboxItem
            required={true}
            className="mt-4 mb-2"
            id="agree-terms"
            labelText="Li e estou ciente quanto às condições de tratamento dos meus dados conforme descrito na Política de Privacidade do banco."
          />

          <FormMessageItem
            showMessage={emailInvalido}
            text="Dado incorreto. Revise e digite novamente."
          />

          <Button
            className="w-fit mx-auto my-4"
            typeButton="submit"
            text="Criar Conta"
          />
        </div>
      </form>
    </div>
  );
};

export {
  FormLogin,
  FormRegister,
  FormInputItem,
  FormLabelItem,
  FormMessageItem,
  FormCheckboxItem,
};
