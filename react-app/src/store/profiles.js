//constants
const GET_USER_PROFILE = 'GET_USER_PROFILE';
const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';

//actions
const userProfile = (user_profile) => {
    return {
      type: GET_USER_PROFILE,
      user_profile
    };
  };

// const updateProfile = (user_profile) => {
//   return {
//     type: GET_USER_PROFILE,
//     user_profile
//   }
// };

//thunks
export const getUserProfile = (userId) => async(dispatch) => {
 const res = await fetch(`/api/users/profile/${userId}`);

    if(res.ok){
      const profile = await res.json();
      dispatch(userProfile(profile.Author));
    }
};

export const updateUserProfile = (userId, bio, image_profile_url) => async(dispatch) => {
  const res = await fetch(`api/users/profile/${userId}/edit/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      bio,
      image_profile_url
    }),
  });
  if(res.ok){
    const data =await res.json();
    return data
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
