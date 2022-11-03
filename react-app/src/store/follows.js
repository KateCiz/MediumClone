//FOLLOWS RESOURCE

//imports
import { csrfFetch } from "./csrf";

//Constants
const GET_FOLLOWS = 'GET_FOLLOWS'
const GET_FOLLOWERS = 'GET_FOLLOWERS'
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const GET_FOLLOWERS_CURRENTUSER = 'currentUser/GET_FOLLOWERS'
const GET_FOLLOWS_CURRENTUSER = 'currentUser/GET_FOLLOWS'

//Action Creators
const  curGetFollows = (follows) => {
    return {
    type: GET_FOLLOWS_CURRENTUSER,
    payload: follows
    }
}

const curGetFollowers = (follows) => {
    return {
      type: GET_FOLLOWERS_CURRENTUSER,
      payload: follows,
    };
}

const getFollows = (follows) => {
    return {
        type: GET_FOLLOWS,
        payload: follows

    }
};

const getFollowers = (follows)  => {
    return {
        type: GET_FOLLOWERS,
        payload: follows
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
//GET CUR FOLLOWS
export const getCurUserFollows = (userId) => async(dispatch) => {
    const res = await csrfFetch(`/api/profiles/${userId}/follows`);

    if(res.ok){
        const follows = await res.json();
        dispatch(curGetFollows(follows.Follows))
    }
};

//GET CUR FOLLOWERS
export const getCurUserFollowers = (userId) => async(dispatch) => {
    const res = await csrfFetch(`/api/profiles/${userId}/followers`);

    if(res.ok){
        const followers = await res.json();
        dispatch(curGetFollowers(followers.Followers))
    }
};




//GET FOLLOWS
export const getUserFollows = (userId) => async(dispatch) => {
    const res = await csrfFetch(`/api/profiles/${userId}/follows`);

    if(res.ok){
        const follows = await res.json();
        dispatch(getFollows(follows.Follows))
    }
};

//GET FOLLOWERS
export const getUserFollowers = (userId) => async(dispatch) => {
    const res = await csrfFetch(`/api/profiles/${userId}/followers`);

    if(res.ok){
        const followers = await res.json();
        dispatch(getFollowers(followers.Followers))
    }
};

//FOLLOW User
export const followAUser = (userId) => async(dispatch) => {
    const res  = await csrfFetch(`/api/profiles/${userId}/follows`, {
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
    const res  = await csrfFetch(`/api/profiles/${userId}/unfollows`, {
        method: 'DELETE'
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
            // action.follows.forEach((follow) => newState[follow.id] = follow);
            newState['followers'] = action.payload;
            return newState;
        case GET_FOLLOWERS:
            newState['follows'] = action.payload;
            return newState;
        case GET_FOLLOWERS_CURRENTUSER:
            newState['CurUserFollows'] = action.payload;
            return newState;
        case GET_FOLLOWS_CURRENTUSER:
            newState["CurUserFollowers"] = action.payload;
            return newState;
        case FOLLOW:
            return  newState;
        case UNFOLLOW:
            //add this
            return state;
        default:
            return state
        };
};
