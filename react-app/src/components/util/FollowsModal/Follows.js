import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFollowers } from "../../../store/follows";
import { NavLink } from "react-router-dom";
import FollowButton from "../FollowButton/index";
import "./Follows.css";
import { getCurUserFollowers } from "../../../store/follows";

const FollowsForm = ({ Author, user }) => {
  const dispatch = useDispatch();
  const follows = useSelector((state) => state.followsState.follows);
  useEffect(() => {
    dispatch(getUserFollowers(Author.id));
    dispatch(getCurUserFollowers(user.id));
  }, [dispatch, Author]);

  return (
    <div className="follows-modal-container">
      <span className="follows-header">Follows</span>
      <div className="list-follows-container">
        {follows &&
          Object.values(follows)?.map((follow, i) => {
            return (
              <div className="individual-follows-container" key={i}>
                <div className="profile-img">
                  <NavLink
                    key={`${follow?.user.id}`}
                    to={`/profiles/${follow?.user.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      //   src={follower?.user.image_profile_url}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU"
                      className="profile-img"
                    />
                  </NavLink>
                </div>
                <div className="name-info-card">
                  <span>{follow?.user.first_name}</span>
                  <span> </span>
                  <span>{follow?.user.last_name}</span>
                </div>
                <div className="follow-btn-card">
                  <FollowButton followerId={follow.user.id} />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FollowsForm;
