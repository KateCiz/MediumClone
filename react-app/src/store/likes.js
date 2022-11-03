//all actions specific to Stories Resource

//imports
import { csrfFetch } from "./csrf";

const CREATE_LIKE_COMMENT = 'like/create/likeComment';
const CREATE_LIKE_STORY = 'like/create/likeStory';
const DELETE_LIKE_STORY = 'like/delete/likeStory';
const DELETE_LIKE_COMMENT = 'like/delete/likeComment';
const GET_LIKES_STORY = "like/get/likeStory"

const createLikeStory = (res) => ({
  type: CREATE_LIKE_STORY,
  payload: res
})

const createLikeComment = (res) => ({
  type: CREATE_LIKE_COMMENT,
  payload: res
})

const deleteLikeStory = (id) => ({
  type: DELETE_LIKE_STORY,
  payload: id
})

const deleteLikeComment = (res) => ({
  type: DELETE_LIKE_COMMENT,
  payload: res
})

//Like A STORY
export const likeStory = (storyId) => async (dispatch) => {
  const res = await csrfFetch(`/api/stories/${storyId}/likes`, {
    method: "POST",
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(createLikeStory(data));
  }
};

//Unlike A STORY
export const unlikeStory = (storyId) => async (dispatch) => {
  const res = await csrfFetch(`/api/stories/${storyId}/likes`, {
    method: "DELETE",
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(deleteLikeStory(storyId));
  }
};


//LIKE Comment
export const likeComment = (commentId) => async(dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}/likes`, {
        method: 'POST',
    });

    if(res.ok){
        const data = await res.json();
        dispatch(createLikeComment(data))
        return data
    }
};


//UNLIKE COMMENT
export const unlikeComment = (commentId) => async(dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}/likes`, {
        method: 'DELETE',
    });
    if(res.ok){
        const data = await res.json();
        dispatch(deleteLikeComment(commentId))
        return data
    }

};


// export const getStoryLikes = (storyId) => async(dispatch) => {
//   const res =  await csrfFetch('/api/')
// }



const initialState = {};


export default function likesReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case CREATE_LIKE_COMMENT:
      newState["commentLikes"][action.payload.comment_id] = action.payload;
      return newState;
    case CREATE_LIKE_STORY:
      newState[action.payload.story_id] = action.payload;
      return newState;
    case DELETE_LIKE_STORY:
      delete newState[action.payload];
      return newState
    case DELETE_LIKE_COMMENT:
      delete newState["commentLikes"].action.payload;
      return newState
    default:
      return state;
  }
}
