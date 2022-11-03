import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { followAUser } from "../../store/follows"


function AuthorSideBar({ Author }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

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
      <NavLink key={Author?.id} to={`/profiles/${Author?.id}`} style={{ textDecoration: "none" }}>
        <div className="author-sidebar-profile-image-container"
             style={{ backgroundImage: `url('${Author?.image_profile_url}')` }}>
        </div>
        <div className="author-sidebar-name">
            {`${Author?.first_name} ${Author?.last_name}`}
        </div>
      </NavLink>
        <div className="followers-count-container">
            <p>{Author?.num_followers} Followers</p>
            {FollowBtn}
        </div>
        <div className="author-bio-container">
           About Me: {Author?.bio}
        </div>
    </div>
  );
}

export default AuthorSideBar;