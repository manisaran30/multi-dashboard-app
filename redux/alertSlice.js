import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alerts',
  initialState: {
    items: [],
  },
  reducers: {
    addAlert: (state, action) => {
      state.items.push({
        id: Date.now(),
        type: action.payload.type,
        message: action.payload.message,
        timestamp: new Date().toISOString(),
      });
    },
    clearAlerts: (state) => {
      state.items = [];
    },
  },
});

export const { addAlert, clearAlerts } = alertSlice.actions;
export default alertSlice.reducer;
