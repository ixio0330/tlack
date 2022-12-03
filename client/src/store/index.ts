import { configureStore } from '@reduxjs/toolkit';
import app from './app';
import socket from './socket';

const RootReducer = configureStore({
  reducer: {
    app,
    socket,
  },
});

export default RootReducer;


export type RootState = ReturnType<typeof RootReducer.getState>;