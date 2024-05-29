import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";

export const fetchPosts = createAsyncThunk("/posts/fetchPosts", async () => {
  try {
    const token = useSelector((store) => store.user.user.token);
    const resp = await customFetch("/drafts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

const initialState = {
  isLoading: false,
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
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoading = false;
        toast.error("problem fetching posts");
      });
  },
});

export const { updatePost } = postsSlice.actions;

export default postsSlice.reducer;
