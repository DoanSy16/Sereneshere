const initialState = {
    posts: [],
    openPost:false,
    postImages:{status: false ,data:[]},
    loading: false,
    error: null,

  };
  
  const postReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOAD_POST_DATA_SUCCESS':
        return {
          ...state,
          posts: action.payload,
          loading: false,
          error: null,
        };
      case 'LOAD_POST_DATA_LOADING':
        return {
          ...state,
          loading: true,
        };
      case 'OPEN_STATE_POST_IMAGES':
        return {
          ...state,
          loading: false,
          error: null,
          postImages:action.payload
        };
        case 'OPEN_STATE_POST':
        return {
          ...state,
          loading: false,
          openPost: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default postReducer;
  