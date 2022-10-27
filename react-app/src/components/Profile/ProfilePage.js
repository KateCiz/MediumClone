import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {getUserStories} from "../../store/stories";

function userProfile(){
    const dispatch = useDispatch();
    const userStories = useSelector((state) => Object.values(state.storyState.stories));
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getUserStories())
    });

    return (
        <div className="user-profile-page">
            <div className="user-details">
                <img className="user-image"></img>
            </div>

        </div>
    );
};
export default userProfile;
