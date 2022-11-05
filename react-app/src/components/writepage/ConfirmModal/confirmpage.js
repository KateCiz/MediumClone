import React from 'react'
import "./confirmpage.css"

const ConfirmForm = ({closeModal, publish, update}) => {

    const exitFromModal = (e) => {
      closeModal();
    };

    const handleClick = () => {
      publish()
      exitFromModal()
    }

    return (
      <div className="confirm-container">
        <button className="exit-icon" onClick={exitFromModal}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <span className="heading-confirm">Confirm publication?</span>
        <div className="btns-container">
          <button className="cancel-btn-publish" onClick={exitFromModal}>
            cancel
          </button>
          {update === false ? (
            <button className="publish-final-btn" onClick={handleClick}>
              publish
            </button>
          ) : (
            <button className="publish-final-btn" onClick={handleClick}>
              update
            </button>
          )}
        </div>
      </div>
    );
}



export default ConfirmForm;
