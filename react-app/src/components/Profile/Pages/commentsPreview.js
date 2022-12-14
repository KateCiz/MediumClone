import { useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { editComment, deleteAComment } from "../../../store/comments";
import { getUserProfile } from "../../../store/profiles";
import { Link } from "react-router-dom";

//styles
import '../../comments/Comment.css';

function CommentsPreview ({comment, sessionUserId}) {

  const dispatch = useDispatch();
  const {author} = comment;
  const [showEdit, setShowEdit] = useState(false);
  const [newComment, setNewComment] = useState(comment.content)
  const [errors, setErrors] = useState([]);
  const [displayErrors, setDisplayErrors] = useState(false);

  useEffect(() => {
    const tempArr = []
      if(newComment.split(' ').length === newComment.length+1 || newComment.length < 0) {
        tempArr.push('Must contain at least one character')
      }
    setErrors(tempArr)
  }, [newComment]);

  useEffect(() => {
    setNewComment(comment.content)
  }, [comment])

  const destroyComment = async (e) => {
    e.preventDefault();

    await dispatch(deleteAComment(comment.id, comment.parent_id));
    dispatch(getUserProfile(sessionUserId))
    setShowEdit(false);
  }

  const saveComment = async (e) => {
    e.preventDefault();
    const payload = {
      content: newComment
    }

    if(errors.length) {
      setDisplayErrors(true);
    } else {
      await dispatch(editComment(payload, comment.id, comment.parent_id));
      dispatch(getUserProfile(sessionUserId))
      setShowEdit(false);
      setDisplayErrors(false);
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

  if(showEdit) {
    return(
      <div className="comment">
      <div className="comment-top">
      <Link to={`/profiles/${author.id}`} className='comment-user-button'>
      <img
          src={author.image_profile_url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU'}
          className="user-icon-img"
        ></img>
      <h5>{author.first_name} {author.last_name}</h5>
      </Link>
      </div>

      <div className="comment-body edit-area">
      {displayErrors && errors.length > 0 ? errorsBox: null}
      <textarea maxLength='200' rows='5' cols='40' wrap="hard" value={newComment} onChange={e => setNewComment(e.target.value)} className='edit-comment-textarea'></textarea>
      <button onClick={saveComment} className='publish-btn'>Save</button>
      <button onClick={destroyComment} className='cancel-btn-updatepage'>Delete</button>
      </div>

    </div>
    );
  }

  return (
    <div className="comment">
      <div className="comment-top">
      <Link to={`/profiles/${author.id}`} className='comment-user-button'>
      <img
          src={author.image_profile_url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU'}
          className="user-icon-img"
        ></img>
      <h5>{author.first_name} {author.last_name}</h5>
      </Link>
      {author.id === sessionUserId && <div className="edit-comment-button" onClick={e => {
        setShowEdit(true)
        }}>Edit</div>}
      </div>
      <div className="comment-body">{comment.content}</div>
    </div>
  );
};

export default CommentsPreview;
