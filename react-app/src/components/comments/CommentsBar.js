import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Comment from "./Comment";
import { Link } from "react-router-dom";


import { getAllComments, getAllReplies, createComment, createReply} from "../../store/comments";

import './CommentsBar.css'


function CommentsBar ({id, type, setDisplay}) {
  const dispatch = useDispatch();
  const commentState = useSelector(state => state.commentState);
  const display = commentState.display
  let comments = {};

  // useEffect(() => {
    if(type === 'story') {
      comments = commentState.comments;
    } else if(type === 'comment') {
      comments = commentState.replies[id]?.replies;
    }
  // }, [commentState])

  const sessionUser = useSelector(state => state.session.user)
  const [showEditButton, setShowEditButton] = useState(true);
  const [newComment, setNewComment] = useState('');


  // useEffect(() => {
  //   // dispatch(resetComments());
  // }, []);
  useEffect(() => {
    if(id) {
      if(type === 'story') {
        dispatch(getAllComments(id))
      } else if(type === 'comment') {
        dispatch(getAllReplies(id))
      }
      console.log('getting comments');
    }
  }, [id]);

  const createNewComment = (e) => {
    e.preventDefault();

    const payload = {
      content: newComment
    }
    if(type === 'story') {
      dispatch(createComment(payload, id));
    } else if(type === 'comment') {
      dispatch(createReply(payload, id))
    }
    setNewComment('');
  }

  const createCommentBox = (
    <>
      <div className="create-comment">
        Leave a comment:
          <div className="create-comment-2">
            <textarea className="comment-textarea" value={newComment} onChange={e => setNewComment(e.target.value)}></textarea>
            {newComment.length > 0 && <button onClick={createNewComment}>Create Comment</button>}
          </div>
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
      <button onClick={() => setDisplay(false)}>Exit</button>
      {type === 'comment' && mainComment}
      {sessionUser && createCommentBox}
      {console.log(comments)}
      {comments !== undefined && Object.values(comments).map(comment => <Comment key={comment.id} showEditButton={showEditButton} setShowEditButton={setShowEditButton} comment={comment} sessionUserId={sessionUser ? sessionUser.id : null} />)}
    </div>
  );
}

export default CommentsBar;
