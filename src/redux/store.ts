import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './features/authentication/authenticationSlice';
import newsSlice from './features/news/newsSlice';
import userSlice from './features/user/userSlice';
import postSlice from './features/post/postSlice';
import activitiesSlice from './features/activities/activitiesSlice';

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    newsReducer: newsSlice,
    user: userSlice,
    postReducer: postSlice,
    activities: activitiesSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
