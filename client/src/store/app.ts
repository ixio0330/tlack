import { createSlice } from '@reduxjs/toolkit';
import { SnackbarType } from '../components/snackbar/snackbar';

const snackbarInitalState = {
  type: 'none' as SnackbarType,
  message: '',
  show: false,
  timeout: 3000,
};

const appSlice = createSlice({
  name: 'app',
  initialState: {
    snackbar: { ...snackbarInitalState }
  },
  reducers: {
    showSnackbar(state, { payload: { message, type = 'info' } }) {
      state.snackbar.show = true;
      state.snackbar.message = message;
      state.snackbar.type = type;
    },
    resetSnackbar(state) {
      state.snackbar.show = false;
      state.snackbar.message = '';
      state.snackbar.type = 'none';
    }
  },
});

export const { showSnackbar, resetSnackbar } = appSlice.actions;

export default appSlice.reducer;