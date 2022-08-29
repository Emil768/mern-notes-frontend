import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";

//Авторизация
export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});

//Проверка на авторизацию
export const fethAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

//Регистрация
export const fethAuthRegister = createAsyncThunk(
  "auth/fetchAuthRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

//Регистрация
export const fethAuthUploadAvatar = createAsyncThunk(
  "auth/fethAuthUploadAvatar",
  async (params) => {
    const { data } = await axios.post("/uploads", params);
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchAuth.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    [fethAuthMe.pending]: (state) => {
      state.status = "loading";
    },
    [fethAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fethAuthMe.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    [fethAuthUploadAvatar.pending]: (state) => {
      state.status = "loading";
    },
    [fethAuthUploadAvatar.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fethAuthUploadAvatar.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    [fethAuthRegister.pending]: (state) => {
      state.status = "loading";
    },
    [fethAuthRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fethAuthRegister.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
  },
});

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
