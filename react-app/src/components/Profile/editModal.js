import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditProfileForm from "./editForm";
import "./editButton.css"

function EditProfileModal(){
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button className="edit-profile-button" onClick={() => setShowModal(true)}>
                Edit Profile
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
