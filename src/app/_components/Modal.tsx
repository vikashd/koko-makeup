import { Dialog } from "@headlessui/react";
import cx from "classnames";

type ModalProps = React.ComponentProps<typeof Dialog> & {
  children?: React.ReactNode;
};

export function Modal({ className, children, ...props }: ModalProps) {
  return (
    <Dialog
      {...props}
      className={cx(
        "fixed w-screen h-dvh top-0 left-0 bg-blue-950/90 z-50",
        className
      )}
    >
      <Dialog.Panel className="relative flex justify-center items-center h-full">
        {children}
      </Dialog.Panel>
    </Dialog>
  );
}
