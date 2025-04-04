import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const newsKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export const fetchNews = createAsyncThunk('news/fetch', async () => {
  const res = await axios.get(
    `https://newsdata.io/api/1/news?apikey=${newsKey}&language=en&q=crypto`
  );

  // Return only top 5 news items that contain "crypto" in title (optional extra filter)
  return res.data.results
    .filter(article => article.title && article.title.toLowerCase().includes('crypto'))
    .slice(0, 6);
});

const newsSlice = createSlice({
  name: 'news',
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;
