import React, { useEffect, useState } from "react";
import { FollowModal } from "../../../context/followModal";
import FollowForm from "./FollowForm";
import "./index.css";
import { useDispatch } from "react-redux"



function FollowingModal({Author, user}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="followers-total-btn" onClick={() => {if(user) {setShowModal(true)}}} >
        followers {Author?.num_follows}
      </button>
      {showModal && (
        <FollowModal onClose={() => setShowModal(false)}>
            <FollowForm
              closeModal={() => setShowModal(false)}
              Author={Author}
              user={user}
            />
        </FollowModal>
      )}
    </>
  );
}

export default FollowingModal;
