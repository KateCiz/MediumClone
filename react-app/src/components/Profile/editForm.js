import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateUserProfile } from '../../store/profiles';
import { getUserProfile } from '../../store/profiles';
import "./editForm.css"

function EditProfileForm({closeModal}){
    const [bio, setBio] = useState('');
    const [image_profile_url, setImageProfileURL] = useState('');
    const [message, setMessage] = useState("");

    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();


    const onEdit = async(e) => {
        e.preventDefault();
        if(bio.length < 1 || bio.replaceAll(" ","").length < 1){
            setMessage("Fill out 'About' section or exit modal")
        }
        else {
            await dispatch(updateUserProfile(user.id, bio, image_profile_url))
            dispatch(getUserProfile(user.id))
            exitFromModal()
        }
    };

    const updateBio = (e) => {
        setBio(e.target.value);
    };

    const updateImage = (e) => {
        setImageProfileURL(e.target.value);
    };

    const exitFromModal = (e) => {
        closeModal();
    };

      let profilePic;

      if (!user?.image_profile_url) {
        profilePic =
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU";
      } else {
        profilePic = user?.image_profile_url;
      }

 return (
   <div className="edit-profile-container">
     <button className="exit-icon" onClick={exitFromModal}>
       <i className="fa-solid fa-xmark"></i>
     </button>
     <span className="modal-heading">Profile Information</span>
     <div className="edit-photo-container">
       <div>
         <div>Photo</div>
         <img className="user-pic" src={profilePic} alt="profile photo" />
       </div>
       <div>
         <div className="edit-profile-pic-btns">
           <button className="update-btn-profile-pic">Update</button>
           <button className="delete-profile-pic-btn">Delete</button>
         </div>
         <div>
           Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.
         </div>
       </div>
     </div>
     <form onSubmit={onEdit} className="edit-profile-form">
       <div>{message && <div>{message}</div>}</div>
       <div className="form-inputs-container">
         <div className="form-inputs-container">
           <label htmlFor="bio" className="user-bio">
             Name*
           </label>
           <input
             className="user-bio-input"
             name="bio"
             type="text"
             value={bio}
           />
           <div>Appears on your Profile page, as your byline, and in your responses</div>
         </div>
         <label htmlFor="bio" className="user-bio">
           Bio
         </label>
         <input
           className="user-bio-input"
           name="bio"
           type="text"
           value={bio}
           onChange={updateBio}
         />
         <div>Appears on your Profile and next to yuor stories</div>
       </div>
       <button className="cancel-profile-button">Cancel</button>
       <button type="submit" className="update-profile-button">
         Save
       </button>
     </form>
   </div>
 );

};

export default EditProfileForm;
