export type TCustomModal = {
  open: boolean;
  onClose: (boolean) => void;
  onClickLogout?: () => void;
  variant?: | 'login' | 'register' | 'logout' | 'message' | 'transactions';
  title?: string;
  pathImage?: string;
  descripption?:string;
  id?: string;
  className?: string;
  type?: string;
  setOpen?: (open: boolean) => void;
  handleConfirmSubmit?: (event?: object) => void;
};