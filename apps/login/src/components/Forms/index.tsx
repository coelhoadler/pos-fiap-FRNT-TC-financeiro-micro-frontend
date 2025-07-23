import { useState } from "react";
import { IFormLogin, IFormRegister } from "../../interfaces/IForm";
import {
  TFormCheckboxItem,
  TFormInputItem,
  TFormLabelItem,
  TFormMessageItem,
} from "../../types/TForms";
import Button from "../Button";

const FormInputItem = ({
  className,
  placeholder,
  type,
  id,
  required,
  onChange,
  value,
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErro("");

    try {
      const response = await fetch("http://localhost:3000/api/user/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.message || "Erro ao fazer login.");
        return;
      }

      const expirationTime = Date.now() + 3600 * 1000;

      
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.name, email: data.email })
      );
      localStorage.setItem("token_expiration", expirationTime.toString());

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Erro:", error);
      setErro("Ocorreu um erro. Tente novamente.");
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
            <FormInputItem
              required={true}
              id="senha"
              placeholder="Digite sua senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
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
}) => {
  return (
    <div className={className}>
      <form action={action} method={method} id={id}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 w-full">
            <FormLabelItem text="Nome" required={true} />
            <FormInputItem
              required={true}
              id="nome"
              placeholder="Digite seu nome"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <FormLabelItem text="Email" required={true} />
            <FormInputItem
              required={true}
              id="email"
              placeholder="Digite seu email"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <FormLabelItem text="Senha" required={true} />
            <FormInputItem
              required={true}
              id="email"
              type="password"
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
            showMessage={true}
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
