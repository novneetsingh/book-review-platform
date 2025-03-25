import { combineReducers } from "@reduxjs/toolkit";

// Import each slice reducer
import profileReducer from "../slices/profileSlice";
import bookReducer from "../slices/bookSlice";

// Combine all the slice reducers into a single root reducer
export const rootReducer = combineReducers({
  // Assign the profileReducer to manage the 'profile' slice of the state
  profile: profileReducer,
  books: bookReducer,
});
