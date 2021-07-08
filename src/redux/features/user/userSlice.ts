import { createSlice } from '@reduxjs/toolkit';
import User from '../../../models/UserModel';
import { toggleFollow } from './userAction';

type UserInitialState = {
  isLoading: boolean,
  currentUser: null | User,
  selectedUser: null | User,
}

const initialState: UserInitialState = {
  isLoading: false,
  currentUser: null,
  selectedUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getCurrentUser(state, { payload }) {
      state.currentUser = payload;
    },
    setIsLoading(state, { payload }) {
      state.isLoading = payload;
    },
    updateUserPicture(state, { payload }) {
      if (state.currentUser) {
        state.currentUser.profilePicture = payload
      }
    },
    setSelectedUser(state, { payload }) {
      state.selectedUser = payload;
    },
    setUserToken(state, { payload }) {
      if (state.currentUser) {
        state.currentUser.token = payload
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(toggleFollow.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    })
  },
});
const { actions, reducer } = userSlice;

export const {
  getCurrentUser,
  updateUserPicture,
  setUserToken,
  setIsLoading,
  setSelectedUser,
} = actions;
export default reducer;
