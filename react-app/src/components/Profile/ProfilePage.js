// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import {getUserStories} from "../../store/stories";
import VerticalNavBar from "../navbar/VerticalNavBar/VerticalNavBar"

function UserProfile(){
    // const dispatch = useDispatch();
    // const userStories = useSelector((state) => Object.values(state.storyState.stories));
    // const user = useSelector(state => state.session.user)

    // useEffect(() => {
    //     dispatch(getUserStories())
    // });

    return (
        <div className="user-profile-page">
            <VerticalNavBar/>
            <div className="user-details">
                <img className="user-image"></img>
                <h1>Name Placeholder</h1>
            </div>
        </div>
    );
};
export default UserProfile;
