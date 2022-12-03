import { createSlice } from '@reduxjs/toolkit';
import { ChannelDto } from '../api/channel.service';

const worspaceInitalState = {
  id: '',
  name: '',
};

const channelInitalState = {
  id: '',
  name: '',
  list: [] as ChannelDto[],
};

const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    workspace: { ...worspaceInitalState },
    channel: { ...channelInitalState },
  },
  reducers: {
    
    enterWorkspace(state, action) {
      state.workspace.id = action.payload.id;
      state.workspace.name = action.payload.name;
    },
    enterChannel(state, action) {
      state.channel.id = action.payload.id;
      state.channel.name = action.payload.name;
    },
    setChannelList(state, action) {
      state.channel.list = [...action.payload.list];
    }
  },
});

export const { enterChannel, enterWorkspace, setChannelList } = socketSlice.actions;

export default socketSlice.reducer;