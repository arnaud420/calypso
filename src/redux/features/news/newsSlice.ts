import { createSlice } from '@reduxjs/toolkit';
import { News } from '../../../models/NewsModel';

interface NewsInitialState {
  isLoading: boolean;
  news: News[];
  selectedNewsId: string|null;
}

const initialState: NewsInitialState = {
  isLoading: false,
  news: [],
  selectedNewsId: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews(state, { payload }) {
      state.news = payload;
    },
    setSelectedNewsId(state, { payload }) {
      state.selectedNewsId = payload;
    },
  },
});

const { actions, reducer } = newsSlice;

export const { setNews, setSelectedNewsId } = actions;
export default reducer;
