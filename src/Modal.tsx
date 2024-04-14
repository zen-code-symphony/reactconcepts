import { MutableRefObject, ReactElement, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children }: { children: ReactElement }) {
  const eleRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  if (!eleRef.current) {
    eleRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (!modalRoot || !eleRef.current) {
      return;
    }
    modalRoot.appendChild(eleRef.current);

    return () => {
      if (eleRef.current) {
        modalRoot.removeChild(eleRef.current);
      }
    };
  }, []);

  return createPortal(<div>{children}</div>, eleRef.current);
}
