import { useEffect } from "react";
import { Outlet } from 'react-router-dom';
import { ChannelDto } from "../../api/channel.service";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setChannelList } from '../../store/service';
import { RootState } from "../../store";
import './workspace.css';
import socketService from "../../api/socket.service";

// Components 
import Header from '../../components/workspace/header';
import Nav from '../../components/workspace/nav';

export default function WorkspaceView() {
  const workspace = useSelector((state: RootState) => state.socket.workspace);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      socketService.connectSokcet(workspace.id);

      socketService.socket?.on('error', (error: any) => {
        console.log(error);
      });

      socketService.socket?.on('channels', (channelList: ChannelDto[]) => {
        dispatch(setChannelList({ list: channelList }));
      });
    } catch (error) {
      console.log('Socket 연결 중 오류가 발생했습니다.');
    }
    return () => { 
    }
  }, []);

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