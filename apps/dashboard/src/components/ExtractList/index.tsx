'use client';
import {
  CloseButton,
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from '@headlessui/react';
import { useState } from 'react';
import AccountStatement from '../AccountStatement';
import FormTransaction from '../TransactionContainer';
import closeIcon from '../../assets/svg/close-icon.svg';

export default function Extract() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
  };

  return (
    <div className="flex gap-3 w-full">
      <AccountStatement
        onEditTransaction={() => {
          setIsOpen(true);
          setIsClosing(false);
        }}
      />
      <Dialog
        open={isOpen}
        onClose={() => {
          setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
          }, 300);
        }}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div
          className={`fixed inset-0 transition-all flex w-screen items-center justify-center ${
            isClosing ? 'animate-scaleOut' : 'animate-scaleIn'
          } ${isOpen ? 'animate-scaleIn' : 'animate-scaleOut'}`}
        >
          <DialogPanel className=" space-y-4 max-w-[50%] max-lg:max-w-[80%] max-sm:max-w-[90%] m-auto w-full bg-white rounded-[10px] shadow-md p-6">
            <CloseButton
              className="cursor-pointer block w-full"
              onClick={handleClose}
            >
              <img
                className="ml-auto text-primary filter-(--filter-primary)"
                width={24}
                height={24}
                src={closeIcon}
                alt={'Fechar'}
              />
            </CloseButton>

            <FormTransaction
              onlyTransactionEditing={() => {
                setIsClosing(true);
                setTimeout(() => {
                  setIsOpen(false);
                }, 300);
              }}
            />
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
