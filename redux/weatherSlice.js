import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const cities = ['New York', 'London', 'Tokyo'];

export const fetchWeather = createAsyncThunk('weather/fetch', async () => {
  const results = await Promise.all(
    cities.map((city) =>
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    )
  );
  return results.map((res) => res.data);
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
