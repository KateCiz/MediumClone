//constants
const GET_USER_PROFILE = 'GET_USER_PROFILE'

//actions
const userProfile = (user_profile) => {
    return {
      type: GET_USER_PROFILE,
      user_profile
    };
  };

//thunks
export const getUserProfile = (userId) => async(dispatch) => {
 const res = await fetch(`/api/users/profile/${userId}`);

    if(res.ok){
      const profile = await res.json();
      console.log('this is a test', profile.Author)
      dispatch(userProfile(profile.Author));
    }
};

const initialState = {};

export default function profilesReducer(state = initialState, action){
    let profile = {...state}
    switch(action.type){
        case GET_USER_PROFILE:
        profile = action.user_profile
        return profile
    default:
        return state
    };

};
