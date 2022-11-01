import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../store/profiles";
import { useParams, Link } from "react-router-dom";
import EditProfileModal from "./editModal";
import "./profile.css"
function UserProfile(){
     const dispatch = useDispatch();
     const currentUser = useSelector(state => state.session.user);
     const userProfile = useSelector(state => state.profileState);
     const {userId} = useParams();

     useEffect(() => {
        dispatch(getUserProfile(userId))
     },[dispatch]);

    return (
        <div className="user-profile-page">
            <div className="user-details">
                <div className="image-container">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU"
                        className="user-pic-placeholder"
                    >
                    </img>
                    {/* <img className="user-image" src={userProfile.image_profile_url}></img> */}
                </div>
                <h1>{userProfile.first_name}</h1>
                <h3>Following: {userProfile.num_follows}</h3>
                <h3>Followers: {userProfile.num_followers}</h3>
            </div>
            <nav className="toggle-container">
                <div className="row">
                    <div className="toggles">
                        <a role="tab">Stories</a>
                        <a role="tab">Comments</a>
                        <a role="tab" rel="alternate" href="/">About</a>
                    </div>
                </div>
            </nav>
                { currentUser?.id === userProfile.id &&
                <div className="options-container">
                <Link to="/stories" className="write-link">WRITE</Link>
                <EditProfileModal/>
                </div>
                }
        </div>
    );
};
export default UserProfile;
