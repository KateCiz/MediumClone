import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {getProfileFeed} from "../../store/stories";

function userProfile(){
    const dispatch = useDispatch();
    const userFeed = useSelector((state) => Object.values(state.storyState.feed));

    useEffect()
    return (
        <div className="user-profile-page">

        </div>
    );
};
export default userProfile;
