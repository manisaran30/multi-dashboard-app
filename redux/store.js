import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import cryptoReducer from './cryptoSlice';
import newsReducer from './newsSlice';
import alertReducer from './alertSlice';
import preferencesReducer from './preferenceSlice'; // ✅

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    news: newsReducer,
    alerts: alertReducer, 
    preferences: preferencesReducer,// ✅
  },
});

export default store;
