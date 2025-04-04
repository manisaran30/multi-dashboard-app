import { createSlice } from '@reduxjs/toolkit';

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: {
    favoriteCities: [],
    favoriteCryptos: [],
  },
  reducers: {
    toggleFavoriteCity: (state, action) => {
      const city = action.payload;
      if (state.favoriteCities.includes(city)) {
        state.favoriteCities = state.favoriteCities.filter(c => c !== city);
      } else {
        state.favoriteCities.push(city);
      }
    },
    toggleFavoriteCrypto: (state, action) => {
      const crypto = action.payload;
      if (state.favoriteCryptos.includes(crypto)) {
        state.favoriteCryptos = state.favoriteCryptos.filter(c => c !== crypto);
      } else {
        state.favoriteCryptos.push(crypto);
      }
    },
  },
});

export const {
  toggleFavoriteCity,
  toggleFavoriteCrypto
} = preferencesSlice.actions;

export default preferencesSlice.reducer;
