import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../api/auth.service';
import workspaceService, { WorkspaceList } from '../../api/workspace.service';
import NewWorkspaceModal from '../../components/modal/newWorkspace';

export default function MainView() {
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState([] as WorkspaceList);
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
    try {
      const result = await workspaceService.getAllWorkspace();
      setWorkspaces(result.workspace_list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkToken();
    fetchWorkspaceList();
  }, []);

  const workspaceListEl = 0 < workspaces.length ?
    <ul>
      {
        workspaces.map((workspace, index) => <li key={index}>{ workspace.name }</li>)
      }
    </ul> :
    <p>워크스페이스가 없네요. 워크스페이스를 만들어보세요!</p>;

  return (
    <div>
      <div>
        <p>메인화면</p>
        <button onClick={() => setNewWrokspace(true)}>워크스페이스 생성</button>
      </div>
      {workspaceListEl}

      <NewWorkspaceModal
        show={newWorkspace}
        onClickOk={workspaceService.create}
        afterOk={fetchWorkspaceList}
        onClickCancle={() => setNewWrokspace(false)}
      />
    </div>
  )
}