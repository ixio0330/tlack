import { configureStore } from '@reduxjs/toolkit';
import app from './app';
import socket from './service';

const RootReducer = configureStore({
  reducer: {
    app,
    socket,
  },
});

export default RootReducer;


export type RootState = ReturnType<typeof RootReducer.getState>;