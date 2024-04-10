import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from 'redux-thunk'; // Import thunk correctly
import QuizSlice from "./slices/QuizSlice";

const reducer = combineReducers({
  quiz: QuizSlice
});

// const middleware = [thunk];

const initialState = {};

const store = createStore(
  reducer,
  initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
