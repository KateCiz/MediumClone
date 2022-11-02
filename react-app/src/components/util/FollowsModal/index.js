import React, { useEffect, useState } from "react";
import { FollowModal } from "../../../context/followModal";
import FollowsForm from "./Follows";
import "./index.css";
import { useDispatch } from "react-redux";

function FollowsModal({ Author, user }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="follows-total-btn"
        onClick={() => {
          if (user) {
            setShowModal(true);
          }
        }}
      >
        follows {Author?.num_followers}
      </button>
      {showModal && (
        <FollowModal onClose={() => setShowModal(false)}>
          <FollowsForm
            closeModal={() => setShowModal(false)}
            Author={Author}
            user={user}
          />
        </FollowModal>
      )}
    </>
  );
}

export default FollowsModal;
