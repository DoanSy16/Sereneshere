import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk'; // Middleware cho các action bất đồng bộ
import rootReducer from './reducers/index'; // Import rootReducer đã tổng hợp các reducers

// Tạo store Redux
const store = createStore(rootReducer);

export default store;
