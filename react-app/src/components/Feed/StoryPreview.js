import React from "react";
// import { useSelector } from "react-redux";
// import EditStoryBtn from "../StoryComponent/EditStory/EditStoryBtn";
import { useHistory } from "react-router-dom";


function StoryPreview({ story }) {
  const history = useHistory();

//   let editStoryBtn;

//   if (user?.id === story.user_id) {
//     editStoryBtn = <EditStorytBtn story={story} />;
//   }

    let CreatedDate;

    if(story?.created_date){
        const date = new Date(story?.created_date);
        const createdDay = date.getDay();
        const createdMonth = date.toLocaleString('default', { month: 'short'});
        const createdYear = date.getFullYear();
        const createdStr = `${createdDay} ${createdMonth}, ${createdYear}`;
        CreatedDate = <p className="full-story-created">{createdStr}</p>;
      }

  return (
    <div className="story-preview-container">
        <div className="text-container">
            <div className="author-container">
                <div className="profile-image-container"
                    style={{ backgroundImage: `url('${story?.Author?.image_profile_url}')` }}>
                </div>
                <div className="author-name">
                    {`${story?.Author?.first_name} ${story?.Author?.last_name}`}
                </div>
                {/* {editStoryBtn} */}
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
                {CreatedDate}
            </div>
        </div>
        <div className="image-container"
             style={{ backgroundImage: `url('${story?.image_url}')` }}>
        </div>
    </div>
  );
}

export default StoryPreview;