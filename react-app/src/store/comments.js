//all actions specific to COMMENTS Resource

//imports
import { csrfFetch } from "./csrf";

//constants
const GET_ALL_COMMENTS = 'GET_ALL_COMMENTS';
const GET_ALL_REPLIES = 'GET_ALL_REPLIES'
const SINGLE_COMMENT = 'GET_SINGLE_COMMENT'
const CREATE_COMMENT = 'CREATE_COMMENT';
const UPDATE_COMMENT = 'UPDATE_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';
const LIKE_COMMENT = 'LIKE_COMMENT';
const UNLIKE_COMMENT = 'UNLIKE_COMMENT';


//ACTION CREATORS
const getComments = (comments) => {
    return {
        type: GET_ALL_COMMENTS,
        comments
    }
};

const getReplies = (replies, parentId) => {
  return {
      type: GET_ALL_REPLIES,
      replies,
      parentId
  }
};

const getSingleComment = (comment) => {
    return {
        type: SINGLE_COMMENT,
        comment
    };
};

const addComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        comment,
    }
};

const updateComment =  (comment) => {
    return {
        type: UPDATE_COMMENT,
        comment
    }
};

const deleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
};

const LikeComment = (commentId) => {
    return {
        type: LIKE_COMMENT,
        commentId
    }
};

const UnLikeComment = (commentId) => {
    return {
        type: UNLIKE_COMMENT,
        commentId
    }
};

//Thunks

    //GET ALL Comments
export const getAllComments = (storyId) => async (dispatch) => {
    const res = await csrfFetch(`/api/stories/${storyId}/comments`);
    console.log('runnung1')
    if(res.ok){
        const comments = await res.json();
        console.log('runnung2', comments)
        dispatch(getComments(comments));
    }
    return res;
};

    //GET ALL Replies
    export const getAllReplies = (commentId) => async (dispatch) => {
      const res = await csrfFetch(`/api/comments/${commentId}/replies`);

      if(res.ok){
          const replies = await res.json();
          dispatch(getReplies(replies, commentId));
      }
      return res;
  };

//SINGLE COMMENT
export const getComment = (commentId) => async(dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}`)

    if(res.ok){
        const comment =  await res.json();
        dispatch(getSingleComment(comment))
    };
};

    //CREATE Comment
export const createComment = (comment, storyId) => async(dispatch) =>  {
    const {content} =  comment;

    const res = await csrfFetch(`/api/stories/${storyId}/comments`, {
        method: 'POST',
        body: JSON.stringify({
            content
        })
    });

    if(res.ok){
        const newComment = await res.json();
        dispatch(addComment(newComment));
        return res
    }
};

    //UPDATE Comment
export const editStory = (comment, commentId) => async(dispatch) =>  {
    const {content} = comment;

    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify(content),
    });

    if(res.ok){
        const updatedComment = await res.json();
        dispatch(updateComment(updatedComment));
        return res
    }
};

//LIKE Comment
export const likeComment = (commentId) => async(dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}/likes`, {
        method: 'POST',
    });

    if(res.ok){
        const data = await res.json();
        dispatch(LikeComment(data.comment_id))
        return data
    }
};

//UNLIKE COMMENT
export const unlikeStory = (commentId) => async(dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}/likes`, {
        method: 'DELETE',
    });

    if(res.ok){
        const data = await res.json();
        dispatch(UnLikeComment(data.comment_id))
        return data
    }

};

    //DELETE Comment
export const deleteAComment = (commentId) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    });
    const response = await res.json();
    if(res.status === 200){
        dispatch(deleteComment(commentId));
    }
    return response;
};

const initialState = {comments: {}, replies: {}};

//Comments REDUCER
export default function commentsReducer(state = initialState, action){
    let newState = {comments: {...state.comments}, replies: {...state.replies}}
    switch(action.type){
        case  GET_ALL_COMMENTS:
            newState.comments = {}
            action.comments.forEach((comment) => newState.comments[comment.id] = comment);
            return newState
        case  GET_ALL_REPLIES:
          // action.replies.forEach((reply) => newState.replies[action.parentId][reply.id] = reply);
          newState.replies[action.parentId] = action.replies
          return newState
        case SINGLE_COMMENT:
            return {
                ...state,
                [action.comment.id]: action.comment
            }
        case CREATE_COMMENT:
            newState[action.comment.id] = action.comment
            return newState;
        case UPDATE_COMMENT:
            newState[action.comment.id] = action.comment
            return  newState;
        case LIKE_COMMENT:
            //add this
        case UNLIKE_COMMENT:
            //add this
        case DELETE_COMMENT:
            delete newState[action.commentId];
            return newState;
        default:
            return state;
        };
};
