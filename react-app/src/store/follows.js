//FOLLOWS RESOURCE

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

const followUser = (follow, userId) => {
    return {
        type: FOLLOW,
        payload: follow, userId
    }
};

const unFollowUser = (follow, userId) => {
    return {
        type: UNFOLLOW,
        userId
    }

};
//Thunks

//Reducer
