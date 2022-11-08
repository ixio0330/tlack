import { useEffect, useState } from 'react';
import Modal from '.';
import useInput from '../../hooks/useInput';
import InputField from '../form/inputField';
import { CreateWorkspaceDto } from '../../api/workspace.service';

interface NewWorkspaceModalProps {
  show: boolean;
  onClickOk: (workspace: CreateWorkspaceDto) => void;
  onClickCancle: () => void;
  afterOk: () => void;
}

export default function NewWorkspaceModal({ show, onClickOk, onClickCancle, afterOk }: NewWorkspaceModalProps) {
  const { value: name, onChange: onChangeName, setValue: setValueName } = useInput('');
  const { value: description, onChange: onChangeDescription, setValue: setValueDescription } = useInput('');
  const { value: email, onChange: onChangeEmail, setValue: setValueEmail } = useInput('');
  const [users, setUsers] = useState([] as string[]);

  useEffect(() => {
    if (name) {
      setValueName('');
    }
    if (description) {
      setValueDescription('');
    }
    if (email) {
      setValueEmail('');
    }
    if (users.length) {
      setUsers([]);
    }
  }, [show]);

  function onCreateWorkspace() {
    if (!name) {
      return;
    }
    
    onClickOk({ name, description, users });
    onClickCancle();
    afterOk();
  }

  function onClickAddInvite() {
    if (!email) return;
    setUsers(users.concat(email));
    setValueEmail('');
  }

  return (
    <Modal
      show={show}
      title={(
        <>
          <h3>새로운 워크스페이스</h3>
        </>
      )}
      content={(
        <>
          <InputField label='이름' value={name} onChange={onChangeName} />
          <InputField label='설명' value={description} onChange={onChangeDescription} />
          <div>
            <h4>워크스페이스에 초대하기</h4>
            <button onClick={onClickAddInvite}>추가</button>
          </div>
          <InputField label='이메일' type='email' value={email} onChange={onChangeEmail} />
          <ul>
            {
              users.map((user, index) => <li key={index}>{user}</li>)
            }
          </ul>
        </>
      )}
      actions={(
        <>
          <button onClick={onClickCancle}>취소</button>
          <button onClick={onCreateWorkspace}>확인</button>
        </>
      )}
    />
  )
}