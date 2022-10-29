import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';


function EditProfileForm({closeModal}){
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

    const onEdit = async(e) => {
        e.preventDefault();
        const data = await dispatch(/*dispatch thunk to edit user details */);
        if (data) {
          setErrors(data);
        }
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
            </form>

        </div>
    );

};

export default EditProfileForm;
