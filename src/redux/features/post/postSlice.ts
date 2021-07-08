import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../../models/PostModel';
import { createPostComment, fetchPosts, handlePostReaction } from './postAction';

export interface PostInitialState {
  isLoading: boolean;
  posts: Post[];
  allowScroll: boolean;
}

const initialState: PostInitialState = {
  isLoading: false,
  posts: [],
  allowScroll: true,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, { payload }) {
      state.posts = payload;
    },
    setIsLoading(state, { payload }) {
      state.isLoading = payload;
    },
    setAllowScroll(state, { payload }) {
      state.allowScroll = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false;
      // TODO: Handle error.
    })

    builder.addCase(createPostComment.fulfilled, (state, action) => {
      state.posts = action.payload;
    })

    builder.addCase(handlePostReaction.fulfilled, (state, action) => {
      state.posts = action.payload;
    })
  },
});

const { actions, reducer } = postSlice;

export const { setPosts, setAllowScroll } = actions;
export default reducer;
