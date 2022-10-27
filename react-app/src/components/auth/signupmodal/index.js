import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import SignUpForm from "../SignUpForm";
import "./index.css";
import LoginForm from "../LoginForm";

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);
  const [switchPage, setSwitchPage] = useState(true);

  return (
    <>
      <button
        className="signup-btn-homepage"
        onClick={() => setShowModal(true)}
      >
        Get started
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm closeModal={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
