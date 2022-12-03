import { configureStore } from '@reduxjs/toolkit';
import app from './app';

const RootReducer = configureStore({
  reducer: {
    app,
  },
});

export default RootReducer;


export type RootState = ReturnType<typeof RootReducer.getState>;