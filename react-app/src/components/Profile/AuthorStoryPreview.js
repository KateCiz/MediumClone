import React from "react";
// import { useSelector } from "react-redux";
// import EditStoryBtn from "../StoryComponent/EditStory/EditStoryBtn";
import { useHistory } from "react-router-dom";


function AuthorStoryPreview({story}) {
  const history = useHistory();
  return (
    <div className="story-preview-container">
        <div className="text-container">
            <div className="author-container">
            </div>
            <div className="story-text-preview-container">
                <div className="story-title-preview">
                    <p className="story-title-preview-text">{story?.title}</p>
                </div>
                <div className="story-content-preview">
                    <p className="story-content-preview-text">{story?.content}</p>
                </div>
            </div>
            <div className="created-date">
                {story?.created_date}
            </div>
        </div>
        <div className="image-container"
             style={{ backgroundImage: `url('${story?.image_url}')` }}>
        </div>
    </div>
  );
}

export default AuthorStoryPreview;
