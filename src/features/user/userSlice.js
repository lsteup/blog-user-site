import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeFilterFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import { fetchPosts } from "../posts/postsSlice";

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      user.image = `https://avatar.oxro.io/avatar.svg?name=${user.name}&length=2&caps=1`;
      const resp = await customFetch.post("/auth/register", user);
      return resp.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/login", user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.posts = null;
      removeUserFromLocalStorage();
      removeFilterFromLocalStorage();
    },
    updateUser: (state, { payload }) => {
      removeUserFromLocalStorage();
      console.log(payload);
      state.user = { ...state.user, ...payload };
      addUserToLocalStorage(state.user);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Welcome, ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        toast.error(error.response.data.msg);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Welcome back, ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error("Invalid Credentials");
      });
  },
});

export const { logoutUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
