//all actions specific to Stories Resource

//constants
const GET_ALL_STORIES = 'GET_ALL_STORIES';
const GET_USER_STORIES ='GET_USER_STORIES';
const GET_STORY_DETAILS = 'GET_STORY_DETAILS';
const CREATE_STORY = 'CREATE_STORY';
const UPDATE_STORY = 'UPDATE_STORY';
const DELETE_STORY = 'DELETE_STORY';

//ACTION CREATORS
const getStories = (stories) => {
    return {
        type: GET_ALL_STORIES,
        stories
    }
};

const getUserStories = (stories) => {
    return {
        type: GET_USER_STORIES,
        stories
    }
};

const getStoryDetails = (story) => {
    return {
        type: GET_STORY_DETAILS,
        story
    }
};

const addStory = (story) => {
    return {
        type: CREATE_STORY,
        story,
    }
};

const updateStory =  (story) => {
    return {
        type: UPDATE_STORY,
        story
    }
};

const deleteStory = (storyId) => {
    return {
        type: DELETE_STORY,
        storyId
    }
};

//Thunks

    //GET ALL STORIES
export const getAllStories = () => async (dispatch) => {
    const res = await fetch('/api/stories');

    if(res.ok){
        const data = await res.json();
        dispatch(getStories(data.Stories));
    }
    return res;
};

    //GET User Stories
export const getUserStories
