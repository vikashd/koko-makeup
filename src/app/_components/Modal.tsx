import { Dialog } from "@headlessui/react";

type ModalProps = {
  open: boolean;
  onClose(): void;
  children?: React.ReactNode;
};

export function Modal({ open, onClose, children }: ModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed w-screen h-screen top-0 left-0 bg-blue-950/90 z-50"
    >
      <Dialog.Panel className="relative flex justify-center items-center h-full">
        {children}
      </Dialog.Panel>
    </Dialog>
  );
}
