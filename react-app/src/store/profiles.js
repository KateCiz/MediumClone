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

// const updateProfile = (message) => {
//   return {
//     type: GET_USER_PROFILE,
//     message
//   }
// };

//thunks
export const getUserProfile = (userId) => async(dispatch) => {
 const res = await fetch(`/api/profiles/${userId}`);

    if(res.ok){
      const profile = await res.json();
      dispatch(userProfile(profile.Author));
    }
};

export const updateUserProfile = (userId,firstname, lastname, bio, image) => async(dispatch) => {

  const formData = new FormData();
  formData.append("first_name", firstname);
  formData.append("last_name", lastname);
  formData.append("bio", bio);
  formData.append("image", image);


  const res = await fetch(`/api/users/profile/${userId}/edit`, {
    method: 'PUT',
    body: formData,
  });
  if(res.ok){
    const data = await res.json();
    // dispatch(updateProfile(data))
    return data
  }else if(res.status < 500){
    const data = await res.json();
    if(data.errors){
      return data.errors;
    };
  };

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
