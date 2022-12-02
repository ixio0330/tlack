import { configureStore } from '@reduxjs/toolkit';
import app from './app';

export default configureStore({
  reducer: {
    app,
  },
});