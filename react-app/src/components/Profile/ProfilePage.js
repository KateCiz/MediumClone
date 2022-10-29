import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../store/profiles";
import { useParams, Link } from "react-router-dom";
import EditProfileModal from "./editModal";

function UserProfile(){
     const dispatch = useDispatch();
     const currentUser = useSelector(state => state.session.user);
     const userProfile = useSelector(state => state.profileState);
     const {userId} = useParams();

     useEffect(() => {
        dispatch(getUserProfile(userId))
     });

    return (
        <div className="user-profile-page">
            <div className="user-details">
                {/* <img className="user-image" src={userProfile.image_profile_url}></img> */}
                <h1>{userProfile.first_name}</h1>
                <h3>Following: {userProfile.num_follows}</h3>
                <h3>Followers: {userProfile.num_followers}</h3>
            </div>
            <div className="container">
                <div className="row">
                    <div className="toggles">
                        <a>Stories</a>
                        <a>Comments</a>
                        <a>About</a>
                    </div>
                </div>
            </div>
                { currentUser?.id === userProfile.id &&
                <>
                <Link to="/stories">WRITE A STORY</Link>
                <EditProfileModal/>
                </>
                }
        </div>
    );
};
export default UserProfile;
