import { useEffect, useState } from 'react';
import useInput from '../../hooks/useInput';

import Modal from '.';
import InputField from '../form/inputField';
import Button from '../button/button';
import TagInputField from '../form/tagInputField';

import { CreateWorkspaceDto } from '../../api/workspace.service';

interface NewWorkspaceModalProps {
  show: boolean;
  onClickOk: (workspace: CreateWorkspaceDto) => Promise<boolean>;
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

  const onCreateWorkspace = async () => {
    if (!name) {
      return;
    }
    
    if (await onClickOk({ name, description, users })) {
      afterOk();
    };
    onClickCancle();
  };

  const onClickDeleteUser = (index: number) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  const onKeyupEnter = () => {
    if (!email) return;
    setUsers(users.concat(email));
    setValueEmail('');
  };

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
          </div>
          <TagInputField
            value={email} 
            list={users}
            onClickDelete={onClickDeleteUser}
            onEnter={onKeyupEnter}
            onChange={onChangeEmail} 
          />
        </>
      )}
      actions={(
        <div className='modal_actions'>
          <Button type='none' value='취소' onClick={onClickCancle} />
          <Button disabled={!name || 10 < users.length} value='확인' onClick={onCreateWorkspace} />
        </div>
      )}
    />
  )
}