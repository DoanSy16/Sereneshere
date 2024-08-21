import { SeeMoreFriends } from "../views/follow";

const initialState = {
    profile_id:0,
    loading: false,
    error: null,

  };
  
  const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'OPEN_STATE_PROFILE':
        return {
          ...state,
          profile_id: action.payload,
          loading: false,
          error: null,
        };
      
      default:
        return state;
    }
  };
  
  export default profileReducer;
  