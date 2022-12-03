import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import socketService from '../../api/socket.service';

import './channel.css';

export default function ChannelView() {
  const channel = useSelector((state: RootState) => state.socket.channel);
  
  useEffect(() => {
    try {
      socketService.socket?.on('join', (join) => {
        console.log(join);
      });
      socketService.socket?.on('disconnect', (info) => {
        console.log(info);
      });
      socketService.socket?.on('initChats', (chats) => {
        console.log(chats);
      });
      socketService.socket?.on('chat', (chat) => {
        console.log(chat);
      });
      socketService.socket?.on('chats', (chats) => {
        console.log(chats);
      });
    } catch (error) {

    }
  });

  // function onSendChat() {
  //   if (socket) {
  //     if (!chat) return;
  //     socket.emit('chat', chat);
  //     setChat('');
  //   }
  // }

  // function onGetChats() {
  //   if (socket) {
  //     socket.emit('chats', 10);
  //   }
  // }

  return (
    <div className="channel_view">
      <h2>{channel.name}</h2>
      <div className="channel_content">
        <div className="chat_view">
          <ul className="chat_list">
            {/* {
              [].map((chat, index) => (
                <li key={index} className='chat_item'>
                  <div className="user_profile">{chat.username.slice(0, 2)}</div>
                  <div className="chat_info">
                    <h4>{chat.username}</h4>
                    <p>{chat.content}</p>
                  </div>
                </li>
              ))
            } */}
          </ul>
        </div>
        <div className="editor">  
          text editor
        </div>
      </div>
    </div>
  )
}