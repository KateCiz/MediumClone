import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { followAUser } from "../../store/follows";
import  FollowingModal from "../util/FollowModal/index.js";
import  FollowButton from "../util/FollowButton/index"
import { getCurUserFollowers } from "../../store/follows";
import FollowsModal from "../util/FollowsModal/index"

function AuthorSideBar({ Author }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(()=>{
    dispatch(getCurUserFollowers(sessionUser.id))
  })

  let FollowBtn;

  if (sessionUser?.id !== Author?.id) {
    FollowBtn = <button
                    className="follow-btn"
                    onClick={(e) => {
                        e.preventDefault()
                        dispatch(followAUser(Author?.id))
                  }}>Follow</button>;
  }

  return (
    <div className="author-side-bar-container">
      <div
        className="author-sidebar-profile-image-container"
        style={{ backgroundImage: `url('${Author?.image_profile_url}')` }}
      ></div>
      <div className="author-sidebar-name">
        {`${Author?.first_name} ${Author?.last_name}`}
      </div>
      <div className="followers-count-container">
        {/* <p>{Author?.num_followers} Followers</p> */}
        <FollowingModal user={sessionUser} Author={Author} />
        <FollowsModal user={sessionUser} Author={Author} />
        {/* {FollowBtn} */}
        <FollowButton followerId={Author?.id}/>
      </div>
      <div className="author-bio-container">About Me: {Author?.bio}</div>
    </div>
  );
}

export default AuthorSideBar;
