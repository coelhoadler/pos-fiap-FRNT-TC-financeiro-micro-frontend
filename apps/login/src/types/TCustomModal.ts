export type TCustomModal = {
  isOpen: boolean;
  onClose: () => void;
  onClickLogout?: () => void;
  typeForm?: | 'login' | 'register' | 'logout';
  title?: string;
  pathImage?: string;
  descripption?:string;
  id?: string;
};