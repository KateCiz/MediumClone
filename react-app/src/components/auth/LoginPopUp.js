import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import "./signinmodal/index.css";
import SignUpForm from "./SignUpForm";
import { AiOutlineLike } from "react-icons/ai";


function LoginPopUpModal({ location }) {
  const [showModal, setShowModal] = useState(false);
  const [switchPage, setSwitchPage] = useState(true);

  let Click;
    if(location === 'like'){
        Click = <AiOutlineLike className="like-story-btn" onClick={() => setShowModal(true)} />;
    }
    if(location === 'comment'){
        Click = <textarea onClick={() => setShowModal(true)} maxLength='200' rows='5' cols='50' wrap="hard" placeholder='What are your thoughts?' className="comment-textarea"></textarea>
    }
    if(location === 'write'){
       Click = <button
            className="login-btn-homeScreen"
            onClick={() => setShowModal(true)}
          >
            Write
          </button>
    }
    if(location === 'start-reading'){
        Click = <button className="start-reading-btn" onClick={() => setShowModal(true)}>Start reading</button>
    }
    if(location === 'like-comment'){
      Click = <AiOutlineLike className="like-comment-btn" onClick={() => setShowModal(true)} />;
    }

  return (
    <>
      {Click}
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

export default LoginPopUpModal;
