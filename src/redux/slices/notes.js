import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";

//Получение всех заметок
export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const { data } = await axios.get("/notes");
  return data;
});

const initialState = {
  items: [],
  status: "loading",
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchNotes.pending]: (state) => {
      state.status = "loading";
    },
    [fetchNotes.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "loaded";
    },
    [fetchNotes.rejected]: (state) => {
      state.items = [];
      state.status = "error";
    },
  },
});

export const notesReducer = notesSlice.reducer;
