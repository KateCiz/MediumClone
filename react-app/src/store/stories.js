//all actions specific to Stories Resource

//imports
import { csrfFetch } from "./csrf";

//constants
const GET_ALL_STORIES = "GET_ALL_STORIES";
const GET_USER_STORIES = "GET_USER_STORIES";
const GET_FEED = "GET_FEED";
const GET_STORY_DETAILS = "GET_STORY_DETAILS";
const CREATE_STORY = "CREATE_STORY";
const UPDATE_STORY = "UPDATE_STORY";
const DELETE_STORY = "DELETE_STORY";
const LIKE_STORY = "LIKE_STORY";
const UNLIKE_STORY = "UNLIKE_STORY";

//ACTION CREATORS
const getStories = (stories) => {
  return {
    type: GET_ALL_STORIES,
    stories,
  };
};

const getUserStories = (stories) => {
  return {
    type: GET_USER_STORIES,
    stories,
  };
};

const getMyFeed = (stories) => {
  return {
    type: GET_FEED,
    stories,
  };
};

const getStoryDetails = (story) => {
  return {
    type: GET_STORY_DETAILS,
    story,
  };
};

const addStory = (story) => {
  return {
    type: CREATE_STORY,
    story,
  };
};

const updateStory = (story) => {
  return {
    type: UPDATE_STORY,
    story,
  };
};

const deleteStory = (storyId) => {
  return {
    type: DELETE_STORY,
    storyId,
  };
};

const LikeStory = (storyId) => {
  return {
    type: LIKE_STORY,
    storyId,
  };
};

const UnLikeStory = (storyId) => {
  return {
    type: UNLIKE_STORY,
    storyId,
  };
};

//Thunks

//GET ALL STORIES
export const getAllStories = () => async (dispatch) => {
  const res = await csrfFetch("/api/stories/");

  if (res.ok) {
    const data = await res.json();
    dispatch(getStories(data.Stories));
  }
  return res;
};

//GET User Stories
export const userStories = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/profiles/${userId}/`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getUserStories(data.Stories));
  }
};

//GET FEED
export const getProfileFeed = () => async (dispatch) => {
  const res = await csrfFetch("/api/feed/myfollows");

  if (res.ok) {
    const data = await res.json();
    dispatch(getMyFeed(data.Stories));
  }
};

//Get SINGLE STORY
export const getSingleStory = (storyId) => async (dispatch) => {
  const res = await csrfFetch(`/api/stories/${storyId}`);

  if (res.ok) {
    const story = await res.json();
    dispatch(getStoryDetails(story));
    return res;
  }
};

//CREATE STORY
export const createNewStory = (story) => async (dispatch) => {
  const { title, content, image_url } = story;

  const res = await csrfFetch("/api/stories/", {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
      image_url,
    }),
  });

  if (res.ok) {
    const newStory = await res.json();
    dispatch(addStory(newStory));
    return res;
  }
};

//UPDATE STORY
export const editStory = (story, id) => async (dispatch) => {
  const res = await csrfFetch(`/api/stories/${id}`, {
    method: "PUT",
    body: JSON.stringify(story),
  });

  if (res.ok) {
    const updatedStory = await res.json();
    dispatch(updateStory(updatedStory));
    return res;
  }
};


//DELETE STORY
export const deleteAStory = (storyId) => async (dispatch) => {
  const res = await csrfFetch(`/api/stories/${storyId}`, {
    method: "DELETE",
  });
  const response = await res.json();
  if (res.status === 200) {
    dispatch(deleteStory(storyId));
  }
  return response;
};

const initialState = {};

//Stories REDUCER
export default function storyReducer(state = initialState, action) {
  let newState = {...state };
  switch (action.type) {
    case GET_ALL_STORIES:
      action.stories.forEach((story) => newState[story.id] = story);
      // newState = [...action.stories];
      return newState;
    case GET_USER_STORIES:
      let userStories = {};
      action.stories.forEach((story) => userStories[story.id] = story);
      // let userStories = [];
      // userStories = [...action.stories];
      return userStories;
    case GET_FEED:
      let feed = {};
      action.stories.forEach((story) => feed[story.id] = story);
      // let feed = [];
      // feed = [...action.stories];
      return feed;
    case GET_STORY_DETAILS:
      newState[action.story.id] = action.story;
      return newState;
    case CREATE_STORY:
      newState[action.story.id] = action.story;
      return newState;
    case UPDATE_STORY:
      newState[action.story.id] = action.story;
      return newState;
    case DELETE_STORY:
      delete newState[action.storyId];
      return newState;
    default:
      return state;
  }
}
