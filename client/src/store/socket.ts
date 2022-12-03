import { createSlice } from '@reduxjs/toolkit';
import { io, Socket, ManagerOptions, SocketOptions } from 'socket.io-client';
import { ChannelDto } from '../api/channel.service';

const socketInitalState = {
  io: null as any,
};

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
    sokcet: { ...socketInitalState },
    workspace: { ...worspaceInitalState },
    channel: { ...channelInitalState },
  },
  reducers: {
    connectSokcet(state, action) {
      state.sokcet.io = io(action.payload.url, { 
        path: '/socket.io', 
        auth: 
          { 
            token: localStorage.getItem('ACCESS_TOKEN') 
          } 
      });
    },
    disconnectSocket(state) {
      state.sokcet.io?.disconnect();
      state.sokcet.io = null;
    },
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

export const { connectSokcet, disconnectSocket, enterChannel, enterWorkspace, setChannelList } = socketSlice.actions;

export default socketSlice.reducer;