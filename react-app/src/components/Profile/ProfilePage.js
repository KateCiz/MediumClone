import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../store/profiles";
import { useParams, Link, NavLink} from "react-router-dom";
import EditProfileModal from "./editModal";
import AuthorStoryPreview from "./AuthorStoryPreview";
import Comment from "../comments/Comment";

//styles
import "./profile.css"
import '../comments/Comment.css';

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
                    {userProfile?.image_profile_url ?
                    (<img className="user-image" src={userProfile.image_profile_url}></img>):
                    (<img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU"
                        className="user-pic-placeholder"
                    >
                    </img>)}
                </div>
                <h1 className="user-name">{userProfile.first_name}</h1>
                <h3>Following: {userProfile.num_follows}</h3>
                <h3>Followers: {userProfile.num_followers}</h3>
            </div>
            <nav className="toggle-container">
                <div className="row">
                    <div className="toggles">
                        <a role="tab" href="">Stories</a>
                        {currentUser?.id === userProfile.id &&
                        <a role="tab" href="">Comments</a>
                        }
                        <a role="tab" rel="alternate" href="">
                            <p>About</p>
                        </a>
                    </div>
                </div>
            </nav>
                { currentUser?.id === userProfile.id &&
                <div className="options-container">
                <Link to="/new-story" className="write-link">Write</Link>
                <EditProfileModal/>
                </div>
                }
            <div className="feed-div">
                <div className="feed-preview-stories">
                    {userProfile.Stories?.map((story, i) => {
                        return (
                            <NavLink key={i} to={`/stories/${story.id}`} style={{ textDecoration: "none" }}>
                                <AuthorStoryPreview story={story}/>
                            </NavLink>
                        );
                    })}
                </div>
            </div>
            <div className="comments-div">
                {userProfile.Comments?.map((comment,i) => {
                    return (
                        <div className="comment" key={i}>
                            {/* {comment.content}
                            <p>{comment.created_date}</p> */}
                            {/* <div className="comment-body edit area">
                                <button onClick={editComment}>Edit</button>
                                <button onClick={() => destroyComment(comment.id, comment.parent_id)}>Delete</button>
                            </div> */}
                            <Comment comment={comment} sessionUserId={currentUser.id}/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default UserProfile;
