import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import "./signinmodal/index.css";
import SignUpForm from "./SignUpForm";


function WriteLoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  const [switchPage, setSwitchPage] = useState(true);

  return (
    <>
      <button
        className="login-btn-homeScreen"
        onClick={() => setShowModal(true)}
      >
        Write
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {switchPage ? (
            <LoginForm
              closeModal={() => setShowModal(false)}
              switchPage={() => setSwitchPage(!switchPage)}
            />
          ) : (
            <SignUpForm
            closeModal={() => setShowModal(false)}
            switchPage={() => setSwitchPage(!switchPage)}
            />
          )}
        </Modal>
      )}
    </>
  );
}

export default WriteLoginFormModal;