

const initialState = {
  openStateMessages: {status:false,header:[],body:[]},
  countMessagesUnRead: 0,
  // friendsMessages:[],
  loading: false,
  error: null,

};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_STATE_MESSAGES':
      return {
        ...state,
        openStateMessages:action.payload,
        loading: false,
        error: null,
      };

      case 'COUNT_MESSAGES_UN_READ':
      return {
        ...state,
        countMessagesUnRead:action.payload,
        loading: false,
        error: null,
      };

      // case 'MESSAGES_SHOW_FRIENDS':
      // return {
      //   ...state,
      //   friendsMessages:action.payload,
      //   loading: false,
      //   error: null,
      // };

    default:
      return state;
  }
};

export default messagesReducer;
