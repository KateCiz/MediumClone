import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateUserProfile } from '../../store/profiles';
import { getUserProfile } from '../../store/profiles';
import "./editForm.css"

function EditProfileForm({closeModal}){
    const [bio, setBio] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [firstnamelength, setFirstNameLength] = useState(0);
    const [lastnamelength, setLastNameLength] = useState(0);
    const [biolength, setBioLength] = useState(0);
    const [message, setMessage] = useState("");
    const [hasChanges, setHasChanges] = useState(false);
    const [imageChanges, setImageChanges] = useState(false);
    const [image, setImage] = useState(null);
    const [profilePic, setProfilePic] = useState(null);

    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();


    const onEdit = async(e) => {
        e.preventDefault();
        if (hasChanges === false && imageChanges === false) {
            return;
        }
        else if(bio == null || bio?.length < 1 || bio?.replaceAll(" ","").length < 1){
            setMessage("Fill out 'About' section or exit modal")
        }
        else {
            let userId = user.id
            await dispatch(updateUserProfile(userId, firstname, lastname, bio, image))
            dispatch(getUserProfile(user.id))
            exitFromModal()
        }
    };

    useEffect (() => {
      setFirstNameLength(firstname?.length ? firstname?.length : 0);
      setLastNameLength(lastname?.length ? lastname?.length : 0);
      setBioLength(bio?.length ? bio?.length : 0)

      if (firstname !== user?.first_name || lastname !== user?.last_name || bio !== user?.bio) {
        setHasChanges(true)
      } else {
        setHasChanges(false)
      }

    },[firstname,lastname, bio])

    useEffect(() => {
      setFirstName(user.first_name)
      setLastName(user.last_name)
      setBio(user.bio)
    },[user])

    const updateBio = (e) => {
        setBio(e.target.value);
    };

    const  updateFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const updateLastName = (e) => {
          setLastName(e.target.value);
  };

  const updateImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
        setImage(file);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setProfilePic(reader.result);
        });
        reader.readAsDataURL(file);
    }
  }

  const removeImage = async (e) => {
    e.preventDefault();
    setImage(
      "https://riverlegacy.org/wp-content/uploads/2021/07/blank-profile-photo.jpeg"
    );
    setProfilePic(
      "https://riverlegacy.org/wp-content/uploads/2021/07/blank-profile-photo.jpeg"
    );
  }



  const exitFromModal = (e) => {
        closeModal();
  };

  useEffect(() => {
    if (profilePic !== user?.image_profile_url && profilePic !== "https://riverlegacy.org/wp-content/uploads/2021/07/blank-profile-photo.jpeg") {
      setImageChanges(true)
    } else {
      setImageChanges(false)
    }
  },[profilePic])


  useEffect(() => {
  if (!user?.image_profile_url) {
        setProfilePic("https://riverlegacy.org/wp-content/uploads/2021/07/blank-profile-photo.jpeg");
  } else {
        setProfilePic(user.image_profile_url);
  }
  },[])


 return (
   <div className="edit-profile-container">
     <button className="exit-icon" onClick={exitFromModal}>
       <i className="fa-solid fa-xmark"></i>
     </button>
     <div className="heading-container-edit-profile">
       <div className="modal-heading">Profile Information</div>
     </div>
     <div className="edit-photo-container">
       <div>
         <div className="photo-heading">Photo</div>
         <img
           className="user-pic-preview"
           src={profilePic}
           alt="profile photo"
         />
       </div>
       <div className="update-img-info-container">
         <div className="edit-profile-pic-btns">
           {/* <div className="update-btn-profile-pic">Update</div> */}
           <label htmlFor="files" className="btn-upload-profile">
             Update
           </label>
           <input
             id="files"
             type="file"
             name="image"
             style={{ visibility: "hidden" }}
             onChange={updateImage}
           />
           {profilePic !== "https://riverlegacy.org/wp-content/uploads/2021/07/blank-profile-photo.jpeg"
           ? (<div className="delete-profile-pic-btn" onClick={removeImage}>Remove</div>) : null
           }

         </div>
         <div className="recommended-txt">
           Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.
         </div>
       </div>
     </div>
     <form onSubmit={onEdit} className="edit-profile-form">
       <div>{message && <div>{message}</div>}</div>
       <div className="form-inputs-container">
         <div className="form-inputs-container">
           <div className="user-bio-container">
             <div className="user-bio">First Name*</div>
           </div>
           <input
             className="user-bio-input"
             name="bio"
             type="text"
             value={firstname}
             maxLength={40}
             onChange={updateFirstName}
           />
           <div className="input-info-container">
             <div className="info-text">
               Appears on your Profile page, as your byline, and in your
               responses
             </div>
             <div className="input-length">
               {firstnamelength}/<div className="max-length-number">40</div>
             </div>
           </div>
           <div className="user-bio-container">
             <div className="user-bio">Last Name*</div>
           </div>
           <input
             className="user-bio-input"
             name="bio"
             type="text"
             value={lastname}
             maxLength={40}
             onChange={updateLastName}
           />
           <div className="input-info-container">
             <div className="info-text">
               Appears on your Profile page, as your byline, and in your
               responses
             </div>
             <div className="input-length">
               {lastnamelength}/<div className="max-length-number">40</div>
             </div>
           </div>

           <div className="user-bio-container">
             <div className="user-bio">Bio</div>
           </div>
           <input
             className="user-bio-input"
             name="bio"
             type="text"
             value={bio}
             maxLength={160}
             onChange={updateBio}
           />
           <div className="input-info-container">
             <div className="info-text">
               Appears on your Profile and next to your stories
             </div>
             <div className="input-length">
               {biolength}/<div className="max-length-number">160</div>
             </div>
           </div>
         </div>
       </div>
       <div className="update-profile-btns">
         <button className="cancel-profile-button" onClick={exitFromModal}>
           Cancel
         </button>
         <button
           onClick={onEdit}
           type="submit"
           className={
             hasChanges || imageChanges? "updates-profile-button" : "update-profile-button"
           }
         >
           Save
         </button>
       </div>
     </form>
   </div>
 );

};

export default EditProfileForm;
