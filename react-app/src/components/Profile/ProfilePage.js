import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../store/session";
import { useParams } from "react-router-dom";

function UserProfile(){
     const dispatch = useDispatch();
     const currentUser = useSelector(state => state.session.user);
     const userProfile = useSelector(state => state.session.profile);
     const {userId} = useParams();

     useEffect(() => {
        dispatch(getUserProfile(userId))
     });

    return (
        <div className="user-profile-page">
            {/* <div className="user-details">
                <img className="user-image" src={userProfile.image_profile_url}></img>
                <h1>{userProfile.first_name}</h1>
                <h3>Following: {userProfile.num_follows}</h3>
                <h3>Followers: {userProfile.num_followers}</h3>
            </div> */}
            <div></div>
        </div>
    );
};
export default UserProfile;
