import { createSlice } from '@reduxjs/toolkit';
import Activity from '../../../models/ActivityModel';
import { getActivities } from './activitiesAction';

type UserInitialState = {
  isLoading: boolean,
  activities: Activity[]
}

const initialState: UserInitialState = {
  isLoading: true,
  activities: [],
};

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getActivities.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getActivities.fulfilled, (state, action) => {
      state.activities = action.payload
      state.isLoading = false
    })
    builder.addCase(getActivities.rejected, (state) => {
      state.isLoading = false
    })
  },
});
const { reducer } = activitiesSlice;

export default reducer;
