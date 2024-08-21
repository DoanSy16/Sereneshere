const initialState = {
    comments: [],
    openComment:{
      status:false,
      user_id:null,
      post_id:null,
      emojis:[],
      isInterested:0,
      countInterested:0
    },
    loading: false,
    error: null,

  };
  
  const commentReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOAD_COMMENT_DATA_SUCCESS':
        return {
          ...state,
          posts: action.payload,
          loading: false,
          error: null,
        };
      case 'LOAD_COMMENT_DATA_LOADING':
        return {
          ...state,
          loading: true,
        };
      case 'LOAD_COMMENT_DATA_ERROR':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case 'OPEN_STATE_COMMENT':
        return {
          ...state,
          loading: false,
          openComment: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default commentReducer;
  