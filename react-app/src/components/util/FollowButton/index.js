import React, {useEffect, useState} from "react";
import "./index.css";
import {useDispatch, useSelector} from "react-redux"
import {useParams} from "react-router-dom"
import {followAUser, unFollowAUser, getCurUserFollowers, getUserFollows} from "../../../store/follows"
import { getSingleStory } from "../../../store/stories";

const FollowButton = ({followerId}) => {
    const dispatch = useDispatch();
    const { storyId } = useParams();
    const [notFollowing, setNotFollowing] = useState(true);
    const [userFollowerSelf, setUserFollowerSelf] = useState(true)
    const loggedInUserFollows = useSelector(state => state.followsState.CurUserFollows)
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(()=>{
        if (sessionUser.id === followerId) {
            setUserFollowerSelf(false)
        }
        if(loggedInUserFollows){
            let vals = Object.values(loggedInUserFollows);
            vals = vals.map((val) => val.user.id)
            if (vals.includes(followerId)){
                setNotFollowing(false)
            } else {
                setNotFollowing(true)
            }
        }
    })

    const handleFollow = async () => {
        await dispatch(followAUser(followerId))
        setNotFollowing(false);
        dispatch(getCurUserFollowers(sessionUser.id));
        dispatch(getSingleStory(storyId))
    }

    const handleUnfollow = async () => {
        await dispatch(unFollowAUser(followerId));
        setNotFollowing(true);
        dispatch(getCurUserFollowers(sessionUser.id));
        dispatch(getSingleStory(storyId));
    }

    return (
      <>
        { userFollowerSelf && sessionUser && (
          notFollowing ? (
          <button className="follow-btn-modal-list" onClick={handleFollow}>+ follow</button> ) : (
          <button className="follow-btn-modal-list" onClick={handleUnfollow}>x unfollow</button>)

        )}
      </>
    );
}


export default FollowButton;
