import { TCustomModal } from "../../types/TCustomModal";
import { FormLogin, FormRegister } from "../Forms";
import closeIcon from "./../../assets/close-icon.svg";

const CustomModal = ({
  isOpen,
  title,
  pathImage,
  descripption,
  typeForm,
  id,
  onClose,
}: TCustomModal) => {
  return (
    <div
      id={id}
      className={`fixed inset-0 flex justify-center items-center z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div
        onClick={onClose}
        className="absolute top-0 bottom-0 left-0 right-0 m-auto h-full block w-full bg-black/45"
      ></div>
      <div
        className={`bg-gray-100 modal-container p-8 flex flex-col items-center justify-center rounded-md transition-all min-w-[40%] max-w-[800px] max-lg:max-w-[80%] max-lg:min-w-[60%] max-md:max-w-[95%] max-2xl:max-h-[800px] max-2xl:overflow-y-auto max-2xl:justify-start max-md:max-h-[750px] max-md:justify-start max-md:overflow-y-auto duration-300 shadow-sm  ${
          isOpen ? "animate-scaleIn" : "animate-scaleOut"
        }`}
      >
        <div className="w-full relative">
          <button
            className=" hover:scale-[.95] transition-all absolute right-0 top-0 indent-[99999px] text-[0px] w-3 h-3  cursor-pointer"
            onClick={onClose}
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
              <h4 className="font-family-base font-bold text-md text-black">
                {title}
              </h4>
            )}
            {descripption && (
              <p className="font-family-base font-normal text-black text-sm">
                {descripption}
              </p>
            )}
          </div>

          {typeForm == "login" && (
            <div className="mt-2 max-w-[90%] m-auto max-md:max-w-full">
              <FormLogin action="login" id="login" method="get" />
            </div>
          )}
          {typeForm == "register" && (
            <div className="mt-2 max-w-[90%] m-auto max-md:max-w-full">
              <FormRegister action="register" id="register" method="post" onClose={
                () => {
                  onClose && onClose();
                }
              } />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export { CustomModal };
