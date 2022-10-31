import React from 'react'
import "./confirmpage.css"

const ConfirmForm = ({closeModal, publish}) => {

    const exitFromModal = (e) => {
      closeModal();
    };

    return (
      <div className="confirm-container">
        <button className="exit-icon" onClick={exitFromModal}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <span className="heading-confirm">Confirm publication?</span>
        <div className="btns-container">
          <button className="cancel-btn-publish" onClick={exitFromModal}>cancel</button>
          <button className="publish-final-btn" onClick={publish}>publish</button>
        </div>
      </div>
    );
}



export default ConfirmForm;
