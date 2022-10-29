import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditProfileForm from "./editForm";

function EditProfileModal(){
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button className="edit-profile-button" onClick={() => setShowModal(true)}>
                edit profile
            </button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
            <EditProfileForm
              closeModal={() => setShowModal(false)}
            />
            </Modal>
      )}


        </>
    );
};

export default EditProfileModal
