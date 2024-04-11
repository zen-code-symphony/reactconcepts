import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children }) {
  const eleRef = useRef(null);
  if (!eleRef.current) {
    eleRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(eleRef.current);

    return () => modalRoot.removeChild(eleRef.current);
  }, []);

  return createPortal(<div>{children}</div>, eleRef.current);
}
