import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";

const AddImage = ({ closeModal, handleImageUpdate}) => {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const [hasErrors, setHasErrors] = useState(false);
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const updateImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
       handleImageUpdate(file);
    }
    setHasSubmitted(true);
  };

  const handleSubmit = async (e) => {
    closeModal();
  };

  return (
    <div>
      <div className="title-prof-pic-container">
        <div>Add an image</div>
        <AiOutlineClose className="close-modal" onClick={closeModal} />
      </div>
      <label htmlFor="images" className="drop-container">
        <span className="drop-title">Drop files here</span>
        or
        <input
          type="file"
          name="file"
          onChange={e => updateImage(e)}
          required
        />
      </label>
      <div className="change-profile-container">
        <button className="save-img-story" onClick={(e) => handleSubmit(e)}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddImage;
