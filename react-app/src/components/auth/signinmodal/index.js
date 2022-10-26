import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "../LoginForm";

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="login-btn-homeScreen"
        onClick={() => setShowModal(true)}
      >
        Sign in
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm closeModal={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
