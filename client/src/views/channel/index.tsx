import { useEffect, useState, ChangeEvent } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import socketService from '../../api/socket.service';
import Editor from '../../components/editor';
import './channel.css';

type Chat = {
  id: string;
  nickname: string;
  senttime: string;
  content: string;
};


export default function ChannelView() {
  const channel = useSelector((state: RootState) => state.socket.channel);
  const [chat, setChat] = useState('');
  const [chats, setChats] = useState([] as Chat[]);
  
  useEffect(() => {
    try {
      socketService.socket?.on('disconnect', (info) => {
        console.log(info);
      });
      socketService.socket?.on('initChats', (chats) => {
        setChats(chats);
      });
      socketService.socket?.on('chat', (chat) => {
        setChats([...chats, chat]);
      });
      // socketService.socket?.on('chats', (chats) => {
      //   console.log(chats);
      // });
    } catch (error) {
      console.log(error);
    }
  });

  function onSendChat() {
    if (socketService.socket) {
      if (!chat) return;
      socketService.socket.emit('chat', chat);
      setChat('');
    }
  }

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
            {
              chats.map((chat, index) => (
                <li key={index} className='chat_item'>
                  <div className="user_profile">{chat.nickname.slice(0, 2)}</div>
                  <div className="chat_info">
                    <h4>{chat.nickname}</h4>
                    <p>{chat.content}</p>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
        <Editor 
          value={chat} 
          onChange={(e) => setChat(e.target.value)}
          onClick={onSendChat}
          onEnter={onSendChat} 
        />
      </div>
    </div>
  )
}