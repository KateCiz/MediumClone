import React, { useEffect, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { likeStory, unlikeStory } from "../../../../store/likes";
import { getSingleStory } from "../../../../store/stories";
import LoginPopUpModal from "../../../auth/LoginPopUp";
import "./index.css";

const LikeStory = ({ story, storyId }) => {
  const [likedItem, setLikedItem] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const storylikesUserIds = story?.like_accounts?.map((like) => like.user_id);
  const isLiked = storylikesUserIds?.includes(sessionUser?.id);

  const dispatch = useDispatch();

  const handleLike = async () => {
    if (isLiked) {
      dispatch(unlikeStory(storyId));
      dispatch(getSingleStory(storyId));
    } else {
      dispatch(likeStory(storyId));
      dispatch(getSingleStory(storyId));
    }
  };

  let Like;

  if(isLiked && sessionUser){
    Like = <AiFillLike className="like-story-btn" onClick={handleLike} />
  } else if(!isLiked && sessionUser){
    Like = <AiOutlineLike className="like-story-btn" onClick={handleLike} />
  } else if(!isLiked && !sessionUser){
    Like = <LoginPopUpModal location='like' />
  }


  return (
    <>
      {/* { isLiked ? ( <AiFillLike className="like-story-btn" onClick={handleLike} />):
       ( <AiOutlineLike className="like-story-btn" onClick={handleLike} />
      )
     } */}
     { Like }
    </>
  );
};

export default LikeStory;
