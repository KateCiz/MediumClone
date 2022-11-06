import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import { getUserFollows} from "../../../store/follows";
import {NavLink} from "react-router-dom";
import FollowButton from "../FollowButton/index"
import "./FollowForm.css"
import { getCurUserFollowers } from "../../../store/follows";

const FollowForm = ({Author, user}) => {

    const dispatch = useDispatch();
    const followers = useSelector( state => state.followsState.followers)
    useEffect(()=>{
        dispatch(getUserFollows(Author.id))
        dispatch(getCurUserFollowers(user.id))
    },[dispatch, Author])




    return (
    <div className="followers-modal-container">
        <span className="followers-header">Followers</span>
        <div className="list-followers-container">
            {followers && (
                Object.values(followers)?.map((follower,i) =>{
                    return (
                      <div className="individual-follower-container" key={i}>
                        <div className="profile-img">
                          <NavLink
                            key={`${follower?.user.id}`}
                            to={`/profiles/${follower?.user.id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <img
                              src={ follower.user.image_profile_url ? follower.user.image_profile_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU" }
                              className="profile-img"
                            />
                          </NavLink>
                        </div>
                        <div className="name-info-card">
                          <span>{follower?.user.first_name}</span>
                          <span> </span>
                          <span>{follower?.user.last_name}</span>
                        </div>
                        <div className="follow-btn-card">
                          <FollowButton followerId={follower.user.id} />
                        </div>
                      </div>
                    );
                })
            )}
        </div>

    </div>
    )
}


export default FollowForm;
