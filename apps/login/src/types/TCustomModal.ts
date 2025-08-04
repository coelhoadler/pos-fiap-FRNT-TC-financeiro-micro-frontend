export type TCustomModal = {
  isOpen: boolean;
  onClose: (boolean) => void;
  onClickLogout?: () => void;
  typeForm?: | 'login' | 'register' | 'logout' | 'message';
  title?: string;
  pathImage?: string;
  descripption?:string;
  id?: string;
};