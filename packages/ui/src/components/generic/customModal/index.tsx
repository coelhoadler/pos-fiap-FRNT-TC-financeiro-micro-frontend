import React from "react";
import { TCustomModal } from "../../../types/generic/TCustomModal";
import closeIcon from "../../../assets/svg/close-icon.svg";
import { Button } from "../../../financeiro-ui";
import { FormLogin, FormRegister } from "../forms";

const CustomModal = ({
  open,
  title,
  pathImage,
  descripption,
  variant,
  className,
  id,
  onClickLogout,
  handleConfirmSubmit,
  setOpen,
  type,
}: TCustomModal) => {
  const handleClose = () => {
    if (!id) return;
    const modal = document.getElementById(id);
    const modalContainer = modal?.querySelector(".modal-container");

    modalContainer?.classList.add("animate-ui-scaleOut");
    setTimeout(() => {
      setOpen && setOpen(false);
    }, 210);
  };

  return (
    <div
      id={id}
      className={`fixed inset-0 flex custom-modal justify-center items-center z-50 ${
        open ? "block" : "hidden"
      }`}
    >
      <div
        onClick={handleClose}
        className="absolute top-0 bottom-0 left-0 right-0 m-auto h-full block w-full bg-black/45"
      ></div>
      <div
        className={`bg-ui-gray-100 z-51 modal-container p-8 flex flex-col items-center justify-center rounded-md transition-all min-w-[40%] max-w-[800px] max-lg:max-w-[80%] max-lg:min-w-[60%] max-md:max-w-[95%] max-2xl:max-h-[800px] max-2xl:overflow-y-auto max-2xl:justify-start max-md:max-h-[750px] max-md:justify-start max-md:overflow-y-auto duration-300 shadow-sm  ${
          open ? "animate-ui-scaleIn" : "animate-ui-scaleOut"
        } ${
          variant === "logout"
            ? "min-w-[420px!important] max-w-[420px!important] max-md:min-w-[80%!important] max-md:max-w-[90%!important]"
            : ""
        }`}
      >
        <div className="w-full relative">
          <button
            className=" hover:scale-[.95] transition-all absolute right-0 top-0 indent-[99999px] text-ui-zero w-3 h-3  cursor-pointer"
            onClick={handleClose}
          >
            Fechar
            <img
              className="m-auto w-full h-full"
              src={closeIcon}
              alt="Fechar"
            />
          </button>

          <div className="w-full flex flex-col items-center justify-center gap-2 mt-8 mb-8">
            {pathImage && (
              <div className="mb-4">
                <img
                  src={pathImage}
                  alt={title ? title : "Imagem ilustrativa"}
                />
              </div>
            )}

            {title && (
              <h4
                className={`font-family-base font-bold text-md text-black text-center`}
              >
                {title}
              </h4>
            )}
            {descripption && (
              <p className="font-family-base font-normal text-black text-sm">
                {descripption}
              </p>
            )}
          </div>

          {variant == "login" && (
            <div className="mt-2 max-w-[90%] m-auto max-md:max-w-full">
              <FormLogin action="login" id="login" method="get" />
            </div>
          )}
          {variant == "register" && (
            <div className="mt-2 max-w-[90%] m-auto max-md:max-w-full">
              <FormRegister
                action="register"
                id="register"
                method="post"
                onClose={handleClose}
              />
            </div>
          )}
          {variant == "logout" && (
            <div className="mt-2 max-w-[90%] flex justify-center items-center gap-10 m-auto max-md:max-w-full">
              <Button
                onClick={onClickLogout}
                variant="primary-2-outline"
                text="Sim"
              />
              <Button
                variant="primary-2-outline"
                onClick={handleClose}
                text="Não"
              />
            </div>
          )}
          {variant == "message" && (
            <div className="mt-2 max-w-[90%] flex justify-center items-center gap-10 m-auto max-md:max-w-full">
              <p className="font-family-base font-normal text-black text-sm">
                {descripption}
              </p>
            </div>
          )}

          {variant === "transactions" && <div>transações</div>}
        </div>
      </div>
    </div>
  );
};
export { CustomModal };
