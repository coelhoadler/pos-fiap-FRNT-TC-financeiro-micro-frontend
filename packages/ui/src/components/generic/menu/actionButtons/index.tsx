import React from "react";
import { Button } from "../../button";
import { TActionButtonsMenu } from "../../../../types/generic/TMenu";

const ActionButtonsMenu = ({
  onClickLogin,
  onClickRegister,
  className,
}: TActionButtonsMenu) => {
  return (
    <div
      className={`flex items-center gap-4 max-md:flex-col max-md:w-full max-md:mt-8 ${
        className ? className : ""
      }`}
    >
      <Button
        className="max-md:w-full"
        text="Abrir minha conta"
        typeButton="button"
        variant="primary-2"
        onClick={onClickRegister}
      />
      <Button
        className="max-md:w-full"
        text="Já tenho conta"
        variant="primary-2-outline"
        typeButton="button"
        onClick={onClickLogin}
      />
    </div>
  );
};

export default ActionButtonsMenu;
