"use client";

import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { Xmark } from "iconoir-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface Notification {
  id: string;
  type: "error" | "success";
  message: string;
}

interface NotificationsProps {
  notifications: Notification[];
  onClose: (id: string) => void;
}

export function Notifications({ notifications, onClose }: NotificationsProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <>
      {createPortal(
        <ul className="fixed flex flex-col items-start gap-2 font-sans text-sm p-4 left-0 bottom-0">
          <AnimatePresence initial={false}>
            {notifications.map(({ id, type, message }) => (
              <motion.li
                key={id}
                className={cx(
                  "flex items-center p-3 text-white rounded-[3px]",
                  {
                    "bg-green-500": type === "success",
                    "bg-red-500": type === "error",
                  }
                )}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              >
                {message}
                <button className="ml-2" onClick={() => onClose(id)}>
                  <Xmark />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>,
        document.body
      )}
    </>
  );
}
