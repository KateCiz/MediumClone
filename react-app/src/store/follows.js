//FOLLOWS RESOURCE

//imports
import { csrfFetch } from "./csrf";

//Constants
const GET_MY_FOLLOWING = 'GET_MY_FOLLOWING'
const GET_FOLLOWING = 'GET_FOLLOWING'
const GET_FOLLOWERS = 'GET_FOLLOWERS'
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'

//Action Creators
const getMyFollowing = (follows) => {
    return {
        type: GET_MY_FOLLOWING,
        follows
    }
};

const getFollowing = (follows) => {
    return {
        type: GET_FOLLOWING,
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
//Logged in User's follows

//FOLLOW User
export const followAUser = (userId) => async(dispatch) => {
    const res  = await csrfFetch(`/profiles/${userId}/follows`, {
        method: 'POST'
    });

    if(res.ok){
        dispatch(followUser(userId))
    }
};

//UNFOLLOW user
export const unFollowAUser = (userId) => async(dispatch) => {
    const res  = await csrfFetch(`/profiles/${userId}/follows`, {
        method: 'PUT'
    });

    if(res.ok){
        dispatch(unFollowUser(userId))
    }
};

//Reducer
