export interface SuccessSnackbarProps {
  open: boolean;
  onClose: () => void;
  duration?: number;
  message?: string;
}