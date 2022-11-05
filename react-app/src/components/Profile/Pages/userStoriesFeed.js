import AuthorStoryPreview from "../AuthorStoryPreview"
import {NavLink} from 'react-router-dom'

function UserStoriesFeed({stories}){
    return (
        <div className="feed-div">
                <div className="feed-preview-stories">
                    {stories?.map((story, i) => {
                        return (
                            <NavLink key={i} to={`/stories/${story.id}`} style={{ textDecoration: "none" }}>
                                <AuthorStoryPreview story={story}/>
                            </NavLink>
                        );
                    })}
                </div>
            </div>
    );
};

export default UserStoriesFeed;
