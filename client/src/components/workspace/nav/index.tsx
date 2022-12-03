import { Link } from "react-router-dom";
import { useState } from 'react';

const channels = ['channel1', 'channel2'];

export default function Nav() {
  const [selectChannel, setSelectChannel] = useState(0);

  const onClickChannel = (index: number) => {
    setSelectChannel(index);
  };

  return (
    <nav>
      <h2>Workspace Name</h2>
      <hr />
      <ul>
        {
          channels.map((channel, index) => (
            <li 
              key={channel}
              onClick={() => onClickChannel(index)} 
              className={index === selectChannel ? 'select_channel' : ''}
            >
              <Link to={`/:workspace_id/${channel}`}>
                # {channel}
              </Link>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}