

const initialState = {
    data_search:null,
    loading: false,
    error: null,

  };
  
  const searchReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'load_data_search':
        return {
          ...state,
          data_search: action.payload,
          loading: false,
          error: null,
        };
      
      default:
        return state;
    }
  };
  
  export default searchReducer;
  