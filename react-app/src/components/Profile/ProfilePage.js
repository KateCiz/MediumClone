import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../store/profiles";
import { useParams, Link} from "react-router-dom";
import EditProfileModal from "./editModal";
import UserStoriesFeed from "./Pages/userStoriesFeed";

//styles
import "./profile.css"
import '../comments/Comment.css';
import UserComments from "./Pages/userComments";
import UserBio from "./Pages/userBio";


function UserProfile(){
     const dispatch = useDispatch();
     const currentUser = useSelector(state => state.session.user);
     const userProfile = useSelector(state => state.profileState);
     const {userId} = useParams();


     useEffect(() => {
        dispatch(getUserProfile(userId))
     },[dispatch, userId]);

    const [userStories, setUserStories] = useState(true);
    const [userComments, setUserComments] = useState(false);
    const [userBio, setUserBio] = useState(false);

    const handleStoriesPage = () => {
        setUserStories(true)
        setUserComments(false)
        setUserBio(false)
    };

    const handleCommentPage = () => {
        setUserComments(true)
        setUserBio(false)
        setUserStories(false)

    };

    const handleAboutPage = () => {
        setUserComments(false)
        setUserStories(false)
        setUserBio(true)
    };

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
                <div className="details-container">
                    <h1 className="user-name">{userProfile.first_name}</h1>
                    <h3>Following: {userProfile.num_follows}</h3>
                    <h3>Followers: {userProfile.num_followers}</h3>
                </div>
                { currentUser?.id === userProfile.id &&
                <div className="options-container">
                <Link to="/new-story" className="write-link">Write</Link>
                <EditProfileModal/>
                </div>
                }
            </div>
            <nav className="toggle-container">
                <div className="row">
                    <div className="toggles">
                        <button className={userStories? "toggle-button-selected": "toggle-button"} onClick={handleStoriesPage}>Stories</button>
                        {currentUser?.id === userProfile.id &&
                        <button className={userComments? "toggle-button-selected": "toggle-button"} onClick={handleCommentPage}>My Comments</button>
                        }
                       <button className={userBio? "toggle-button-selected": "toggle-button"} onClick={handleAboutPage}>About</button>
                    </div>
                </div>
            </nav>
            <div className="pages-container">
                {userStories? <UserStoriesFeed stories={userProfile.Stories}/> : null}
                {userComments ===  true ? <UserComments comments={userProfile.Comments} sessionUserId={currentUser.id}/>: null}
                {userBio? <UserBio bio={userProfile.bio}/> : null }
            </div>
        </div>
    );
};
export default UserProfile;
