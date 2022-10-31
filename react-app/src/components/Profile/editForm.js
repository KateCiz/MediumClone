import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';


function EditProfileForm({closeModal}){
    const [bio, setBio] = useState('');
    const [userImage, setUserImage] = useState('');
    const [errors, setErrors] = useState([]);

    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onEdit = async(e) => {
        e.preventDefault();
        const data = await dispatch(/*dispatch thunk to edit user details */)
                    .then(<Redirect to={`/user/profile/${user.id}`}/>);
        if (data) {
          setErrors(data);
        }
      };

    const updateBio = (e) => {
        setBio(e.target.value);
    };

    const updateImage = (e) => {
        setUserImage(e.target.value);
    };

    const exitFromModal = (e) => {
        closeModal();
    };

 return(
    <div>
            <button className="exit-icon" onClick={exitFromModal}>
                <i className="fa-solid fa-xmark"></i>
            </button>
            <span className="modal-heading">Profile Information</span>
            <form onSubmit={onEdit} className='edit-profile-form'>
                <div>
                    {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                    ))}
                </div>
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
                        type='string'
                        value= {userImage}
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
