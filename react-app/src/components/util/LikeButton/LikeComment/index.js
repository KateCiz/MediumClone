import React, { useEffect, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { unlikeComment, likeComment } from "../../../../store/likes";
import { getComment } from "../../../../store/comments";
// import "./index.css";

const LikeComment = ({ comment, commentId, sessionUserId}) => {
  // const [isLiked, setIsLiked] = useState(comment.liked)
   let isLiked = comment.liked

  const dispatch = useDispatch();

  const handleLike = async () => {
    if (isLiked) {
      dispatch(unlikeComment(commentId));
      dispatch(getComment(commentId));
    } else {
      dispatch(likeComment(commentId));
      dispatch(getComment(commentId));
    }
    // setIsLiked(!isLiked)
  };

  return (
    <>
      { isLiked ? ( <AiFillLike className="like-comment-btn" onClick={handleLike} />):
       ( <AiOutlineLike className="like-comment-btn" onClick={handleLike} />
      )
     }
    </>
  );
};

export default LikeComment;
