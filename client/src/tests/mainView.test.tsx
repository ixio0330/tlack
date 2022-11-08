import { render, screen } from "../test-utils";
import userEvent from '@testing-library/user-event';
import MainView from '../views/main';

describe.skip('<MainView />', () => {
  // MainView 접속
  describe('MainView 접속', () => {
    it('워크스페이스 목록과 추가하기 버튼을 보여준다.', async () => {
      render(<MainView />);
  
      const addWorkspaceButton = screen.getByRole('button', { name: '워크스페이스 추가하기' });
      expect(addWorkspaceButton).toBeInTheDocument();
      const workspaceList = await screen.findAllByRole('listitem');
      expect(workspaceList.length).toBe(1);
    });
  
    it.skip("워크스페이스가 없을 경우 '워크스페이스가 없네요. 워크스페이스를 만들어보세요!' 문구와 추가하기 버튼을 보여준다.", async () => {
      render(<MainView />);
  
      const addWorkspaceButton = screen.getByRole('button', { name: '워크스페이스 추가하기' });
      expect(addWorkspaceButton).toBeInTheDocument();
      const workspaceList = await screen.findAllByRole('listitem');
      expect(workspaceList.length).toBe(0);
      const noWorkspace = screen.getByText('워크스페이스가 없네요. 워크스페이스를 만들어보세요!');
      expect(noWorkspace).toBeInTheDocument();
    });
  });

  describe('워크스페이스 접속', () => {
    it('한 개의 워크스페이스를 클릭하면 해당 워크스페이스로 이동시켜 채널 목록과 추가하기 버튼을 보여준다.', async () => {
      render(<MainView />);
  
      const workspaceList = await screen.findAllByRole('listitem');
      expect(workspaceList.length).toBe(1);
      await userEvent.click(workspaceList[0]);
  
      const addChannel = await screen.findByRole('button', { name: '채널 추가하기' });
      expect(addChannel).toBeInTheDocument();
      const channelList = await screen.findAllByRole('listitem');
      expect(channelList.length).toBe(1);
    });
  
    it.skip("채널이 없을 경우 '채널이 없네요. 채널을 만들어보세요!' 문구와 추가하기 버튼을 보여준다.", async () => {
      render(<MainView />);
  
      const workspaceList = await screen.findAllByRole('listitem');
      await userEvent.click(workspaceList[0]);
  
      const addChannel = await screen.findByRole('button', { name: '채널 추가하기' });
      expect(addChannel).toBeInTheDocument();
      const channelList = await screen.findAllByRole('listitem');
      expect(channelList.length).toBe(0);
      const noChannel = screen.getByText('채널이 없네요. 채널을 만들어보세요!');
      expect(noChannel).toBeInTheDocument();
    });
  });

  describe('채널 접속', () => {
    it('한 개의 채널을 클릭하면 해당 이전 채팅 목록과 form과 보내기 버튼을 보여준다.', async () => {
      render(<MainView />);
  
      const workspaceList = await screen.findAllByRole('listitem');
      await userEvent.click(workspaceList[0]);

      const channelList = await screen.findAllByRole('listitem');
      await userEvent.click(channelList[0]);

      const chantList = await screen.findAllByRole('listitem');
      expect(chantList.length).toBe(2);
      const inputForm = screen.getByRole('textbox');
      const sendButton = screen.getByRole('button', { name: '보내기' });
      expect(inputForm).toBeInTheDocument();
      expect(sendButton).toBeInTheDocument();
    });
  
    it.skip("이전 채팅이 없을 경우 '채팅 내역이 없네요. 채팅을 보내보세요!'문구를 보여준다.", () => {
  
    });
  
    it('채팅을 입력하고 보내기 버튼을 누르거나 엔터를 누르면 Form은 빈 값이 되고 화면에 보낸 채팅을 보여준다.', async () => {
      render(<MainView />);
  
      const workspaceList = await screen.findAllByRole('listitem');
      await userEvent.click(workspaceList[0]);

      const channelList = await screen.findAllByRole('listitem');
      await userEvent.click(channelList[0]);
      
      const inputForm = screen.getByRole('textbox');
      const sendButton = screen.getByRole('button', { name: '보내기' });

      await userEvent.type(inputForm, '내가 보낸 채팅');
      await userEvent.click(sendButton);

      const chatEl = await screen.findByText('내가 보낸 채팅');
      expect(chatEl).toBeInTheDocument();
    });
  });
});