import { SeeMoreFriends } from "../views/follow";

const initialState = {
    SeeMoreFriendsFollower:{status:false,countFollower:0,type:null,data:[]},
    loading: false,
    error: null,

  };
  
  const followReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'OPEN_STATE_FOLLOW_FRIENDS':
        return {
          ...state,
          SeeMoreFriendsFollower: action.payload,
          loading: false,
          error: null,
        };
      
      default:
        return state;
    }
  };
  
  export default followReducer;
  