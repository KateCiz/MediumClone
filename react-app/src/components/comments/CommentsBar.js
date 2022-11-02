import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Comment from "./Comment";

import { getAllComments, getAllReplies, createComment} from "../../store/comments";

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
    dispatch(createComment(payload, id));
    setNewComment('');
  }

  const createCommentBox = (
    <>
      <button onClick={() => setDisplay(false)}>Exit</button>
      <div className="create-comment">
        Leave a comment:
          <div className="create-comment-2">
            <textarea className="comment-textarea" value={newComment} onChange={e => setNewComment(e.target.value)}></textarea>
            {newComment.length > 0 && <button onClick={createNewComment}>Create Comment</button>}
          </div>
      </div>
    </>
  );
  return (
    <div className="comment-box">
      {sessionUser && createCommentBox}
      {console.log(comments)}
      {comments !== undefined && Object.values(comments).map(comment => <Comment key={comment.id} showEditButton={showEditButton} setShowEditButton={setShowEditButton} comment={comment} sessionUserId={sessionUser ? sessionUser.id : null} />)}
    </div>
  );
}

export default CommentsBar;
