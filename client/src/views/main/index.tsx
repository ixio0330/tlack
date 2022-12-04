import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../api/auth.service';
import workspaceService, { WorkspaceDto } from '../../api/workspace.service';
import NewWorkspaceModal from '../../components/modal/newWorkspace';
import Button from '../../components/button/button';
import { FcTreeStructure } from 'react-icons/fc';
import { useDispatch } from "react-redux";
import { enterWorkspace } from '../../store/service';

import './main.css';

export default function MainView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState([] as WorkspaceDto);
  const [newWorkspace, setNewWrokspace] = useState(false);
  const checkToken = async () => {
    function replaceToSignin() {
      navigate('/signin', { replace: true });
    }
    if (!localStorage.getItem('ACCESS_TOKEN')) {
      replaceToSignin();
      return;
    }
    try {
      await authService.token();
    } catch (error) {
      replaceToSignin();
    }
  };

  const fetchWorkspaceList = async () => {
    const result = await workspaceService.getAllWorkspace();
    if (result?.type === 'success') {
      setWorkspaces(result.workspace_list);
    }
  };

  const onClickEnterWorkspace = ({id, name}: {id: string, name: string}) => {
    dispatch(enterWorkspace({id, name}));
  };

  useEffect(() => {
    checkToken();
    fetchWorkspaceList();
  }, []);

  const workspaceListEl = 0 < workspaces.length ?
    (
      <div className='main_content'>
        <p>워크스페이스에 접속해보세요!</p>
        <ul className='workspace_list'>
          {
            workspaces.map((workspace) => (
              <li 
                className='workspace_item' 
                key={workspace.id}
                onClick={() => onClickEnterWorkspace(workspace)}
              >
                <Link to={`/${workspace.id}`}>
                  <h4>{workspace.name}</h4>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    ) :
    <div className='main_content'>
      <h1>Tlack을 처음 사용하시는 것으로 보이네요.</h1>
      <p>초대 내역이나 Slack 계정이 없습니다. 팀이 아직 Slack을 사용하고 있지 않다면, 팀을 위한 워크스페이스를 만들 수 있습니다.</p>
    </div>;

  return (
    <section className='main_view'>
      <h2>
        <FcTreeStructure /> <span>Tlack</span>
      </h2>
      {workspaceListEl}
      <div className='main_actions'>
        <Button value='워크스페이스 생성' onClick={() => setNewWrokspace(true)} />
      </div>

      <NewWorkspaceModal
        show={newWorkspace}
        onClickOk={workspaceService.create}
        afterOk={fetchWorkspaceList}
        onClickCancle={() => setNewWrokspace(false)}
      />
    </section>
  )
}