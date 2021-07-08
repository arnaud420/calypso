import { createSlice } from '@reduxjs/toolkit';
import User from '../../../models/UserModel';

export type AuthenticationInitialState = {
  isLoading: boolean,
  currentUser: null | User
}

const initialState: AuthenticationInitialState = {
  isLoading: true, // Fetching data ? To put somewhere else ?
  currentUser: null,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    authenticate(state, { payload }) {
      state.currentUser = payload
    },
    logout(state) {
      state.currentUser = null
    },
    dataLoaded(state) {
      state.isLoading = false
    },
  },
});
const { actions, reducer } = authenticationSlice;

export const { authenticate, logout, dataLoaded } = actions;
export default reducer;
