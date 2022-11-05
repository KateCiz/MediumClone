import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../store/profiles";
import { useParams, Link, NavLink} from "react-router-dom";
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
     },[dispatch]);

    const [userStories, setUserStories] = useState(true);
    const [userComments, setUserComments] = useState(false);
    const [userBio, setUserBio] = useState(false);

    const handleStoriesPage = () => {
        setUserStories(true)
        setUserComments(false)
        setUserBio(false)
    };

    const handleCommentPage = () => {
        setUserStories(false)
        setUserComments(true)
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
                <h1 className="user-name">{userProfile.first_name}</h1>
                <h3>Following: {userProfile.num_follows}</h3>
                <h3>Followers: {userProfile.num_followers}</h3>
            </div>
            <nav className="toggle-container">
                <div className="row">
                    <div className="toggles">
                        <button onClick={handleStoriesPage}>Stories</button>
                        {currentUser?.id === userProfile.id &&
                        <button onClick={handleCommentPage}>My Comments</button>
                        }
                       <button onClick={handleAboutPage}>About</button>
                    </div>
                </div>
            </nav>
                { currentUser?.id === userProfile.id &&
                <div className="options-container">
                <Link to="/new-story" className="write-link">Write</Link>
                <EditProfileModal/>
                </div>
                }
            <div className="pages-container">
                {/* <UserStoriesFeed stories={userProfile.Stories}/> */}
                {userComments ===  true ? <UserComments comments={userProfile.Comments} sessionUserId={currentUser.id}/>: <UserStoriesFeed stories={userProfile.Stories}/>}
                {userBio === true ?<UserBio bio={userProfile.bio}/> : <UserStoriesFeed stories={userProfile.Stories}/>}
            </div>
        </div>
    );
};
export default UserProfile;
