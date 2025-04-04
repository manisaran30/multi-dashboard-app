import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCrypto = createAsyncThunk('crypto/fetch', async () => {
  const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 3,
      page: 1,
      sparkline: false,
    },
  });
  return res.data;
});

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrypto.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCrypto.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCrypto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cryptoSlice.reducer;
