//all actions specific to COMMENTS Resource

//imports
import { csrfFetch } from "./csrf";

//constants
const GET_ALL_COMMENTS = 'GET_ALL_COMMENTS';
const SINGLE_COMMENT = 'GET_SINGLE_COMMENT'
const CREATE_COMMENT = 'CREATE_COMMENT';
const UPDATE_COMMENT = 'UPDATE_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';
const LIKE_COMMENT = 'LIKE_COMMENT';
const DISLIKE_COMMENT = 'DISLIKE_COMMENT';


//ACTION CREATORS
const getComments = (comments) => {
    return {
        type: GET_ALL_COMMENTS,
        comments
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

const DisLikeComment = (commentId) => {
    return {
        type: DISLIKE_COMMENT,
        commentId
    }
};

//Thunks

    //GET ALL Comments
export const getAllComments = (storyId) => async (dispatch) => {
    const res = await csrfFetch(`/api/stories/${storyId}/comments`);

    if(res.ok){
        const comments = await res.json();
        dispatch(getComments(comments));
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

const initialState = {};

//Comments REDUCER
export default function commentsReducer(state = initialState, action){
    let newState = {...state}
    switch(action.type){
        case  GET_ALL_COMMENTS:
            action.comments.forEach((comment) => newState[comment.id] = comment);
            return newState;
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
        case DELETE_COMMENT:
            delete newState[action.commentId];
            return newState;
        default:
            return state;
        };
};
