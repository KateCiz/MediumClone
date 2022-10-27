//FOLLOWS RESOURCE

//imports
import { csrfFetch } from "./csrf";

//Constants
const GET_FOLLOWS = 'GET_FOLLOWS'
const GET_FOLLOWERS = 'GET_FOLLOWERS'
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'

//Action Creators

const getFollows = (follows) => {
    return {
        type: GET_FOLLOWS,
        follows

    }
};

const getFollowers = (follows)  => {
    return {
        type: GET_FOLLOWERS,
        follows
    }
};

const followUser = (userId) => {
    return {
        type: FOLLOW,
        payload: userId
    }
};

const unFollowUser = (userId) => {
    return {
        type: UNFOLLOW,
        userId
    }

};
//Thunks
//GET FOLLOWS
export const getUserFollows = (userId) => async(dispatch) => {
    const res = await csrfFetch(`/profiles/${userId}/follows`);

    if(res.ok){
        const follows = await res.json();
        dispatch(getFollows(follows.Follows))
    }
};

//GET FOLLOWERS
export const getUserFollowers = (userId) => async(dispatch) => {
    const res = await csrfFetch(`/profiles/${userId}/followers`);

    if(res.ok){
        const followers = await res.json();
        dispatch(getFollowers(followers.Followers))
    }
};

//FOLLOW User
export const followAUser = (userId) => async(dispatch) => {
    const res  = await csrfFetch(`/profiles/${userId}/follows`, {
        method: 'POST'
    });
    if(res.ok){
        const data = await res.json();
        dispatch(followUser(userId))
        return data
    }
};

//UNFOLLOW user
export const unFollowAUser = (userId) => async(dispatch) => {
    const res  = await csrfFetch(`/profiles/${userId}/follows`, {
        method: 'PUT'
    });

    if(res.ok){
        const data = await res.json();
        dispatch(unFollowUser(userId))
        return data
    }
};


//Reducer
export default function followsReducer(state = {}, action){
    let newState = {...state}
    switch(action.type){
        case GET_FOLLOWS:
            action.follows.forEach((follow) => newState[follow.id] = follow);
            return newState;
        case GET_FOLLOWERS:
            newState[action.comment.id] = action.comment
            return newState;
        case FOLLOW:
            //add this
        case UNFOLLOW:
            //add this
            return state;
        default:
            return state
        };
};
