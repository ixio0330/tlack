import { useState, useEffect } from "react";
import { useParams, Outlet } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

import './workspace.css';

// Components 
import Header from '../../components/workspace/header';
import Nav from '../../components/workspace/nav';

type Channel = {
  id: string;
  name: string;
  description: string | null;
}

export default function WorkspaceView() {
  const { workspace_id } = useParams();
  const [socket, setSocket] = useState(null as null | Socket);
  const [channels, setChannels] = useState([] as Channel[]);
  const [chat, setChat] = useState('');

  useEffect(() => {
    try {
      const socket = io(
        `http://127.0.0.1:9000/${workspace_id}`, 
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
        setChannels(channelList);
      });

      socket.on('join', (join) => {
        console.log(join);
      });

      socket.on('disconnect', (info) => {
        console.log(info);
      });

      socket.on('initChats', (chats) => {
        console.log(chats);
      });

      socket.on('chat', (chat) => {
        console.log(chat);
      });

      socket.on('chats', (chats) => {
        console.log(chats);
      });

      setSocket(socket);
    } catch (error) {
      console.log('Socket 연결 중 오류가 발생했습니다.');
    }

    return () => { 
      socket?.disconnect();
      setSocket(null);
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

  const channelEnterButtons = 0 < channels.length ?
    <div>
      {
        channels.map((channel) => <button key={channel.id} onClick={() => onEnterChannel(channel.id)}>{ channel.name }</button>)
      }
      <div>
        <input type="text" value={chat} onChange={(e) => setChat(e.target.value)} />
        <button onClick={onSendChat}>SEND</button>
        <button onClick={onGetChats}>Get Chats</button>
      </div>
    </div> :
    <div>
      <p>채널이 없네요 만들어보세요!</p>
    </div>;

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