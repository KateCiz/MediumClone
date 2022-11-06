import { useState} from "react";
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

    await dispatch(editComment(payload, comment.id, comment.parent_id));
    dispatch(getUserProfile(sessionUserId))
    setShowEdit(false);
  }

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
      <textarea value={newComment} onChange={e => setNewComment(e.target.value)}></textarea>
      <button onClick={saveComment}>Save</button>
      <button onClick={destroyComment}>Delete</button>
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
      {author.id === sessionUserId && <button onClick={e => {
        setShowEdit(true)
        }}>Edit</button>}
      </div>
      <div className="comment-body">{comment.content}</div>
      {comment.createdAt !== comment.updatedAt && <div className="edited-comment">Edited</div>}
    </div>
  );
};

export default CommentsPreview;
