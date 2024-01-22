"use client";

import { useEffect, useRef } from "react";

interface ScrollToProps {
  id: string;
  className?: string;
  children?: React.ReactNode;
}

export function ScrollTo({ id, className, children }: ScrollToProps) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (`#${id}` === window.location.hash) {
      window.scrollTo({ top: el.current?.offsetTop });
    }
  }, [id]);

  return (
    <div id={id} className={className} ref={el}>
      {children}
    </div>
  );
}
