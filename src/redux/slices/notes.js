import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";

//Получение всех заметок
export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const { data } = await axios.get("/notes");
  return data;
});

//Поиск по категориям
export const fetchCategoryNotes = createAsyncThunk(
  "notes/fetchCategoryNotes",
  async (name) => {
    const { data } = await axios.get(`/category/${name}`);
    return data;
  }
);

//Удалить заметку
export const fetchRemoveNote = createAsyncThunk(
  "notes/fetchRemoveNote",
  async (id) => {
    axios.delete(`/notes/${id}`);
  }
);

const initialState = {
  items: [],
  status: "loading",
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: {
    //Получение заметок
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

    //Получение категорий

    [fetchCategoryNotes.pending]: (state) => {
      state.status = "loading";
    },
    [fetchCategoryNotes.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "loaded";
    },
    [fetchCategoryNotes.rejected]: (state) => {
      state.items = [];
      state.status = "error";
    },

    //Удаление заметок
    [fetchRemoveNote.pending]: (state) => {
      state.status = "loading";
    },
    [fetchRemoveNote.fulfilled]: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.meta.arg);
    },
  },
});

export const notesReducer = notesSlice.reducer;
