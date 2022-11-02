import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./followModal.css";

const FollowModalContext = React.createContext();

export function FollowModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <FollowModalContext.Provider value={value}>
        {children}
      </FollowModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function FollowModal({ onClose, children }) {
  const modalNode = useContext(FollowModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="follow-modal">
      <div id="follow-modal-background" onClick={onClose} />
      <div id="follow-modal-content">{children}</div>
    </div>,
    modalNode
  );
}
