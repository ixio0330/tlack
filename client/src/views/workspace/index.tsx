import { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { ChannelDto } from '../../api/channel.service';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { connectSokcet, disconnectSocket, setChannelList } from '../../store/socket';
import { RootState } from "../../store";
import './workspace.css';

// Components 
import Header from '../../components/workspace/header';
import Nav from '../../components/workspace/nav';

export default function WorkspaceView() {
  const workspace = useSelector((state: RootState) => state.socket.workspace);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null as null | Socket);
  const [chat, setChat] = useState('');

  useEffect(() => {
    try {
      // dispatch(connectSokcet({ url: }))
      const socket = io(
        `http://127.0.0.1:9000/${workspace.id}`, 
        { 
          path: '/socket.io', 
          auth: 
            { 
              token: localStorage.getItem('ACCESS_TOKEN') 
            } 
        }
      );

      socket.on('error', (error) => {
        console.log(error);
      });

      socket.on('channels', (channelList) => {
        dispatch(setChannelList({ list: channelList }));
      });

      setSocket(socket);
    } catch (error) {
      console.log('Socket 연결 중 오류가 발생했습니다.');
    }

    return () => { 
      dispatch(disconnectSocket());
    }
  }, []);

  function onEnterChannel(channel_id: string) {
    if (socket) {
      socket.emit('join', channel_id);
    }
  }

  function onSendChat() {
    if (socket) {
      if (!chat) return;
      socket.emit('chat', chat);
      setChat('');
    }
  }

  function onGetChats() {
    if (socket) {
      socket.emit('chats', 10);
    }
  }

  return (
    <section className="workspace_view">
      <Header />
      <div className="workspace_content">
        <Nav />
        <Outlet />
      </div>
    </section>
  )
}