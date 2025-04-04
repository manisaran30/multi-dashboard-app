// pages/index.js
import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Dashboard from '../components/dashboard'; // <- Make sure this path is correct

export default function HomePage() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}
