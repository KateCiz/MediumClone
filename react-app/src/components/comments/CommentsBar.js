import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Comment from "./Comment";
import { Link } from "react-router-dom";
import LoginPopUpModal from "../auth/LoginPopUp";


import { getAllComments, getAllReplies, createComment, createReply} from "../../store/comments";

import './CommentsBar.css'


function CommentsBar ({id, type, setDisplay}) {
  const dispatch = useDispatch();
  const commentState = useSelector(state => state.commentState);
  // const display = commentState.display
  let comments = {};


    if(type === 'story') {
      comments = commentState.comments;
    } else if(type === 'comment') {
      comments = commentState.replies[id]?.replies;
    }


  const sessionUser = useSelector(state => state.session.user)
  const [showEditButton, setShowEditButton] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [errors, setErrors] = useState([]);
  const [displayErrors, setDisplayErrors] = useState(false);



  useEffect(() => {
    if(id) {
      if(type === 'story') {
        dispatch(getAllComments(id))
      } else if(type === 'comment') {
        dispatch(getAllReplies(id))
      }
    }
  }, [id]);

  useEffect(() => {
    const tempArr = []
    if(newComment.length > 0) {
      if(newComment.split(' ').length === newComment.length+1) {
        tempArr.push('Must contain at least one character')
      }
    }
    setErrors(tempArr)
  }, [newComment]);

  const createNewComment = (e) => {
    e.preventDefault();

    const payload = {
      content: newComment
    }
    if(errors.length) {
      setDisplayErrors(true);
    } else {
      if(type === 'story') {
        dispatch(createComment(payload, id));
      } else if(type === 'comment') {
        dispatch(createReply(payload, id))
      }
      setNewComment('');
    }
  }
  const errorsBox = (
    <div className="comment-errors">
      <ul>
      {errors.map(err => (
        <li key={err}>{err}</li>
      ))}
      </ul>
    </div>
  )
  const createCommentBox = (
    <>
      <div className="create-comment">
            {displayErrors && errors.length > 0 ? errorsBox: null}
            {
              sessionUser ?<textarea maxLength='200' rows='5' cols='50' wrap="hard" placeholder={type === 'story'? 'What are your thoughts?': `Reply to ${commentState.replies[id]?.author.first_name} ${commentState.replies[id]?.author.last_name}`} className="comment-textarea" value={newComment} onChange={e => setNewComment(e.target.value)}></textarea>:
              <LoginPopUpModal location={'comment'} />
            }
            {newComment.length > 0 && <button onClick={createNewComment} className='publish-btn'>Create Comment</button>}

      </div>
    </>
  );

  const mainComment = (
    <div className="main-comment">
      <div className="comment-top">
      <Link to={`/profiles/${commentState.replies[id]?.author.id}`} className='comment-user-button'>
      <img
          src={commentState.replies[id]?.author.image_profile_url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU'}
          className="user-icon-img"
        ></img>
      <h5>{commentState.replies[id]?.author.first_name} {commentState.replies[id]?.author.last_name}</h5>
      </Link>
      </div>
      <div className="comment-body">{commentState.replies[id]?.content}</div>
      {commentState.replies[id]?.createdAt !== commentState.replies[id]?.updatedAt && <div className="edited-comment">Edited</div>}
    </div>
  );
  return (
    <div className="comment-box">
      <img
            className="exit-bar"
            src={"/svgs/x-btn.svg"}
            alt=""
            onClick={() => setDisplay(false)}
          />
          {/* <AiOutlineArrowRight size={28} className="exit-bar" onClick={() => setDisplay(false)} />
      <button onClick={() => setDisplay(false)}>Exit</button>
      <i className="fa-solid fa-xmark exit-bar" onClick={() => setDisplay(false)} ></i> */}
      {type === 'comment' && mainComment}
      {true && createCommentBox}
      {comments !== undefined && Object.values(comments).map(comment => <Comment key={comment.id} showEditButton={showEditButton} setShowEditButton={setShowEditButton} comment={comment} sessionUserId={sessionUser ? sessionUser.id : null} />)}
    </div>
  );
}

export default CommentsBar;
