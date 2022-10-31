import "./index.css";
import React, { useState } from "react";
import { SmallModal } from "../../../context/smallModal";
import "./index.css"
import ConfirmForm from "./confirmpage"



function ConfirmModal({filledState, publish}){
    const [showModal, setShowModal] = useState(false);

    const handleModal = () => {
        if (filledState === true){
            setShowModal(true);
        }
    }


    return (
        <>
            <button className= {filledState ? "publish-btn" : "no-fill-btn" }
            onClick={() => handleModal()}
            >publish</button>

        {showModal && (
        <SmallModal onClose={() => setShowModal(false)}>
            <ConfirmForm
            closeModal={() => setShowModal(false)}
            publish={publish}/>
        </SmallModal>
      )}
    </>
    );
        }
    export default ConfirmModal
