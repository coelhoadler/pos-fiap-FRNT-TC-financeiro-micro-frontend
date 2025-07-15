export type TCustomModal = {
  isOpen: boolean;
  onClose: () => void;
  typeForm?: | 'login' | 'register';
  title?: string;
  pathImage?: string;
  descripption?:string;
};