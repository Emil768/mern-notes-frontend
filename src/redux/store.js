import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { notesReducer } from "./slices/notes";

const store = configureStore({
  reducer: {
    notes: notesReducer,
    auth: authReducer,
  },
});

export default store;
