import { Link } from "react-router-dom";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { enterChannel } from '../../../store/service';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';
import socketService from "../../../api/socket.service";

export default function Nav() {
  const workspace = useSelector((state: RootState) => state.socket.workspace);
  const channel = useSelector((state: RootState) => state.socket.channel);
  const [selectChannel, setSelectChannel] = useState(channel.id);
  const dispatch = useDispatch();

  const onClickChannel = (id: string, name: string) => {
    setSelectChannel(id);
    dispatch(enterChannel({ id, name}));
    onEnterChannel(id);
  };

  const onEnterChannel = (channel_id: string) => {
    if (channel_id !== channel.id) {
      if (socketService.socket) {
        socketService.socket.emit('join', channel_id);
      }
    }
  };

  return (
    <nav>
      <h2>{workspace.name}</h2>
      <hr />
      <ul>
        {
          channel.list.map((channel) => (
            <li 
              key={channel.id}
              onClick={() => onClickChannel(channel.id, channel.name)} 
              className={channel.id === selectChannel ? 'select_channel' : ''}
            >
              <Link to={`/${workspace.id}/${channel.id}`}>
                # {channel.name}
              </Link>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}