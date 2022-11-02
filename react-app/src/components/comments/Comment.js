import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editComment } from "../../store/comments";
import CommentsBar from "./CommentsBar";
import { Link } from "react-router-dom";


import './Comment.css';

function Comment ({comment, sessionUserId, showEditButton, setShowEditButton}) {

  const dispatch = useDispatch();
  const {author} = comment;
  const [showEdit, setShowEdit] = useState(false);
  const [newComment, setNewComment] = useState(comment.body)
  const [showReplies, setShowReplies] = useState(false);

  // const destroyComment = async (e) => {
  //   e.preventDefault();

  //   const outerPayload = {
  //     commentId: comment.id,
  //     songId: comment.songId
  //   }

  //   await dispatch(deleteComment(outerPayload));
  //   setShowEdit(false);
  //   setShowEditButton(true);
  // }

  const saveComment = async (e) => {
    e.preventDefault();

    const payload = {
      payload: {
        content: newComment
      }
    }

    await dispatch(editComment(payload, comment.id));
    setShowEdit(false);
    setShowEditButton(true);
  }

  if(showEdit) {
    return(
      <div className="comment">
      <div className="comment-top">
      <Link to={`/users/${author.id}`} className='comment-user-button'>
      {( author.previewImage && author.previewImage.length > 1 && <img src={author.previewImage} className='user-icon-img' />) || <i className="fas fa-user-circle fa-2xl user-icon" />}
      <h5>{author.first_name} {author.last_name}</h5>
      </Link>
      </div>

      <div className="comment-body edit-area">
      <textarea value={newComment} onChange={e => setNewComment(e.target.value)}></textarea>
      <button onClick={saveComment}>Save</button>
      {/* <button onClick={destroyComment}>Delete</button> */}
      </div>

    </div>
    );
  }
  return (
    <div className="comment">
      <div className="comment-top">
      <Link to={`/users/${author.id}`} className='comment-user-button'>
      <img
          src={author.image_profile_url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU'}
          className="user-icon-img"
        ></img>
      <h5>{author.first_name} {author.last_name}</h5>
      </Link>
      {showEditButton && author.id === sessionUserId && <button onClick={e => {
        setShowEdit(true)
        setShowEditButton(false);
        }}>Edit</button>}
      </div>
      <div className="comment-body">{comment.content}</div>
      {comment.createdAt !== comment.updatedAt && <div className="edited-comment">Edited</div>}
      <button onClick={() => setShowReplies(true)}>Show replies</button>
      {showReplies && <div><div><CommentsBar id={comment.id} type={'comment'} setDisplay={setShowReplies} /></div></div>}
    </div>
  );
}

export default Comment;
