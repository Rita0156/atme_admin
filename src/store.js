import { configureStore } from '@reduxjs/toolkit';
import contestReducer from "./reducer/ContestSlice";

const store = configureStore({
  reducer: {
    contests: contestReducer,
  },
});

export default store;
