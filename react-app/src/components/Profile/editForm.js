import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateUserProfile } from '../../store/profiles';
import "./editForm.css"

function EditProfileForm({closeModal}){
    const [bio, setBio] = useState('');
    const [image_profile_url, setImageProfileURL] = useState('');
    const [errors, setErrors] = useState([]);

    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();


    const onEdit = async(e) => {
        e.preventDefault();
        const data = await dispatch(updateUserProfile(user.id, bio, image_profile_url))
        .then(exitFromModal)
            if (data) {
                setErrors(data);
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

 return(
    <div className='edit-profile-container'>
            <button className="exit-icon" onClick={exitFromModal}>
                <i className="fa-solid fa-xmark"></i>
            </button>
            <span className="modal-heading">Profile Information</span>
            <form onSubmit={onEdit} className='edit-profile-form'>
                {/* <div>
                    {errors?.map((error, ind) => (
                    <div key={ind}>{error}</div>
                    ))}
                </div> */}
                <div>
                    <label htmlFor='bio' className='user-bio'>
                        About
                    </label>
                    <input
                        className='user-bio-input'
                        name='bio'
                        type='text'
                        value= {bio}
                        onChange={updateBio}
                    />
                </div>
                <div>
                    <label htmlFor='image' className='user-image'>
                        Photo
                    </label>
                    <input
                        className='user-image-input'
                        name='image_profile_url'
                        type='text'
                        value= {image_profile_url}
                        onChange={updateImage}
                    />
                </div>
                <button type='submit' className='update-profile-button'>
                    Save
                </button>
            </form>

        </div>
    );

};

export default EditProfileForm;
