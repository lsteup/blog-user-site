import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const fetchPosts = createAsyncThunk(
  "/posts/fetchPosts",
  async (token, thunkAPI) => {
    try {
      const resp = await customFetch("/drafts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return resp.data.posts;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const initialState = {
  isLoading: true,
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updatePost: (state, { payload }) => {
      const updatedPost = payload;
      const index = state.posts.findIndex(
        (post) => post._id === updatedPost._id
      );
      if (index !== -1) {
        state.posts[index] = updatedPost;
      }
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.posts = payload;
      })
      .addCase(fetchPosts.rejected, (state, { error }) => {
        state.isLoading = false;
        toast.error("problem fetching posts:", error.message);
      });
  },
});

export const { updatePost } = postsSlice.actions;

export default postsSlice.reducer;
