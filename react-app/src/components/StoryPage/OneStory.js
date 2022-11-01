import React, { useState } from "react";
import { useSelector } from "react-redux";
// import EditStoryBtn from "../StoryComponent/EditStory/EditStoryBtn";
import { useHistory } from "react-router-dom";


function OneStory({ story }) {
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);

    let EditedDate;
    let CreatedDate;
    let StoryImg;
//   let editStoryBtn;

//   if (sessionUser.id === story.user_id) {
//     editStoryBtn = <EditStorytBtn story={story} />;
//   }

  if(story?.updated_date !== story?.created_date){
    const editedDate = new Date(story?.updated_date);
    const editedDay =  editedDate.getDay();
    const editedMonth =  editedDate.toLocaleString('default', { month: 'short'});
    const editedYear =  editedDate.getFullYear();
    const editedStr = `${editedDay} ${editedMonth}, ${editedYear}`;
    EditedDate = <p className="full-story-edited">{editedStr}</p>;
  }

  if(story?.created_date){
    const date = new Date(story?.created_date);
    const createdDay = date.getDay();
    const createdMonth = date.toLocaleString('default', { month: 'short'});
    const createdYear = date.getFullYear();
    const createdStr = `${createdDay} ${createdMonth}, ${createdYear}`;
    CreatedDate = <p className="full-story-created">{createdStr}</p>;
  }

  if(story?.image_url !== '' && story?.image_url !== null){
    StoryImg = <div className="full-story-image-container"
                    style={{ backgroundImage: `url('${story?.image_url}')` }}>
               </div>
  }

  return (
    <div className="full-story-container">
        <div className="full-story-heading-container">
            <div className="full-story-author-container">
                <div className="full-story-profile-image-container"
                     style={{ backgroundImage: `url('${story?.Author?.image_profile_url}')` }}>
                </div>
                <div className="full-story-next-to-profile-pic">
                    <div className="full-story-author-name">
                        {`${story?.Author?.first_name} ${story?.Author?.last_name}`}
                    </div>
                    <div className="full-story-dates">
                        {CreatedDate}
                        {EditedDate}
                    </div>
                </div>
                {/* {editStoryBtn} */}
            </div>
        </div>
        <div className="full-story-title">
            <p className="full-story-title-text">{story?.title}</p>
        </div>
        {StoryImg}
        <div className="full-story-text-container">
            <div className="full-story-content">
                <p className="full-story-content-text">{story?.content}</p>
            </div>
        </div>
        <div className="story-reactions-container">
            <div classname="likes-count">
                <i class="fa-solid fa-hands-clapping fa-lg"></i>
                <p class="reactions">{story?.num_likes}</p>
            </div>
            <div className="comment-count">
                <i class="fa-solid fa-comment fa-lg"></i>
                <p class="reactions">{story?.num_comments}</p>
            </div>
        </div>
    </div>
  );
}

export default OneStory;
