import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import useInput from '../../hooks/useInput';

import Modal from '.';
import InputField from '../form/inputField';
import Button from '../button/button';
import TagInputField from '../form/tagInputField';

import { CreateChannelDto } from '../../api/channel.service';

interface NewChannelModalProps {
  show: boolean;
  onClickOk: (channel: CreateChannelDto) => Promise<boolean>;
  onClickCancle: () => void;
  afterOk: any;
}

export default function NewChannelModal({ show, onClickOk, onClickCancle, afterOk }: NewChannelModalProps) {
  const workspace = useSelector((state: RootState) => state.socket.workspace);
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

  const onCreateChannel = async () => {
    if (!name) {
      return;
    }
    
    if (await onClickOk({ name, description, users, workspace_id: workspace.id })) {
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
          <h3>새로운 채널</h3>
        </>
      )}
      content={(
        <>
          <InputField label='이름' value={name} onChange={onChangeName} />
          <InputField label='설명' value={description} onChange={onChangeDescription} />
          <div>
            <h4>채널에 초대하기</h4>
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
          <Button disabled={!name || 10 < users.length} value='확인' onClick={onCreateChannel} />
        </div>
      )}
    />
  )
}