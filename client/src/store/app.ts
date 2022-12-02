import { createSlice } from '@reduxjs/toolkit';

type SnackbarType = 'info' | 'success' | 'warn' | 'error' | 'none';
const snackbarInitalState = {
  type: 'none' as SnackbarType,
  message: '',
  show: false,
  timeout: 2000,
};

const appSlice = createSlice({
  name: 'app',
  initialState: {
    snackbar: { ...snackbarInitalState }
  },
  reducers: {
    showSnackbar(state, { payload: { message, type = 'info' , show = true, timeout = 2000 } }) {
      state.snackbar.show = show;
      state.snackbar.message = message;
      state.snackbar.type = type;
      state.snackbar.timeout = timeout;
    }
  },
});

export const { showSnackbar } = appSlice.actions;

export default appSlice.reducer;