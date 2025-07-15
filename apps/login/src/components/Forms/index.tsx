import { IFormLogin, IFormRegister } from "../../interfaces/IForm";
import {
  TFormInputItem,
  TFormLabelItem,
  TFormMessageItem,
} from "../../types/TForms";

const FormInputItem = ({
  className,
  value,
  placeholder,
  type,
  id,
  required,
}: TFormInputItem) => {
  return (
    <>
      <input
        id={id}
        value={value ? value : ""}
        className={` focus:border-primary/50 text-md placeholder:font-normal focus:outline-none focus:shadow-none border-inactive rounded-sm border py-0 px-2.5 min-h-10  font-family-base font-medium text-text-primary  ${
          className ? className : ""
        } ${
          type === "submit"
            ? " w-fit mx-auto my-3  hover:bg-link-500 text-white px-4 py-2 rounded-[8px] cursor-pointer transition-all bg-link"
            : "bg-white"
        }`}
        placeholder={placeholder ? placeholder : ""}
        required={required}
        type={
          type === "password"
            ? "password"
            : type === "text"
            ? "text"
            : type === "submit"
            ? "submit"
            : "text"
        }
      />
    </>
  );
};

const FormLabelItem = ({ className, htmlFor, text }: TFormLabelItem) => {
  return (
    <label
      className={` font-bold font-family-base text-black text-md ${
        className ? className : ""
      }`}
      htmlFor={htmlFor ? htmlFor : ""}
    >
      {text}
    </label>
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

const FormLogin: React.FC<IFormLogin> = ({
  className,
  method,
  labelEmail,
  inputEmail,
  labelSenha,
  inputSenha,
  messageError,
  textBtn,
  action,
  id,
}) => {
  return (
    <div className={className}>
      <form action={action} method={method} id={id}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 w-full">
            <FormLabelItem text="Email" />
            <FormInputItem
              required={true}
              id="email"
              placeholder="Digite seu email"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <FormLabelItem text="Senha" />
            <FormInputItem
              required={true}
              id="email"
              placeholder="Digite sua senha"
            />
          </div>

          <FormMessageItem
            showMessage={true}
            text="Dado incorreto. Revise e digite novamente."
          />

          <FormInputItem
            value="Acessar"
            id="entrar"
            required={false}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};
const FormRegister: React.FC<IFormRegister> = ({
  className,
  method,
  labelEmail,
  inputEmail,
  labelSenha,
  inputSenha,
  messageError,
  textBtn,
  action,
  id,
}) => {
  return (
    <div className={className}>
      <form action={action} method={method} id={id}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 w-full">
            <FormLabelItem text="Nome" />
            <FormInputItem
              required={true}
              id="nome"
              placeholder="Digite seu nome"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <FormLabelItem text="Email" />
            <FormInputItem
              required={true}
              id="email"
              placeholder="Digite seu email"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <FormLabelItem text="Senha" />
            <FormInputItem
              required={true}
              id="email"
              placeholder="Digite sua senha"
            />
          </div>

          <FormMessageItem
            showMessage={true}
            text="Dado incorreto. Revise e digite novamente."
          />

          <FormInputItem
            value="Criar Conta"
            id="entrar"
            required={false}
            type="submit"
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
};
