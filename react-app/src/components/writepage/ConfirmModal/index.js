import "./index.css";
import React, { useState } from "react";
import { SmallModal } from "../../../context/smallModal";
import "./index.css";
import ConfirmForm from "./confirmpage";

function ConfirmModal({ filledState, publish, update }) {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    if (filledState === true) {
      setShowModal(true);
    }
  };

  return (
    <>
      {update===false ? (
        <button
          className={filledState ? "publish-btn" : "no-fill-btn"}
          onClick={() => handleModal()}
        >
          publish
        </button>
      ) : (
        <button
          className={filledState ? "publish-btn" : "no-fill-btn"}
          onClick={() => handleModal()}
        >
          update
        </button>
      )}
      {showModal && (
        <SmallModal onClose={() => setShowModal(false)}>
          <ConfirmForm
            closeModal={() => setShowModal(false)}
            publish={publish}
            update={update}
          />
        </SmallModal>
      )}
    </>
  );
}
export default ConfirmModal;
