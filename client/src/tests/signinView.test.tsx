import { render, screen } from "../test-utils";
import userEvent from '@testing-library/user-event';
import SigninView from '../views/signin';

describe("<SigninView />", () => {
  it('아이디, 비밀번호 입력창과 로그인 버튼을 보여준다.', () => {
    render(<SigninView />);

    const idInput = screen.getByLabelText('아이디');
    const pwInput = screen.getByLabelText('비밀번호');
    const signinButton = screen.getByRole('button', { name: '로그인' });

    expect(idInput).toBeInTheDocument();
    expect(pwInput).toBeInTheDocument();
    expect(signinButton).toBeInTheDocument();
  });

  it('올바른 값을 입력하면 로그인 버튼을 활성화시킨다.', async () => {
    render(<SigninView />);

    const idInput = screen.getByLabelText('아이디');
    const pwInput = screen.getByLabelText('비밀번호');
    const signinButton = screen.getByRole('button', { name: '로그인' });
    expect(signinButton).toBeDisabled();

    await userEvent.type(idInput, 'test1');
    await userEvent.type(pwInput, 'qwer');
    expect(signinButton).toBeDisabled();

    await userEvent.type(idInput, 'test1@example.com');
    expect(signinButton).toBeEnabled();
  });

  it('로그인 성공시 MainView로 이동시킨다.', async () => {
    render(<SigninView />);

    const idInput = screen.getByLabelText('아이디');
    const pwInput = screen.getByLabelText('비밀번호');
    const signinButton = screen.getByRole('button', { name: '로그인' });

    await userEvent.type(idInput, 'test1@example.com');
    await userEvent.type(pwInput, 'qwer');
    await userEvent.click(signinButton);

    const mainViewTitle = await screen.findByText('메인화면');
    expect(mainViewTitle).toBeInTheDocument();
  });

  it('로그인 실패시 snackbar로 실패 이유를 보여준다.', async () => {
    render(<SigninView />);

    const idInput = screen.getByLabelText('아이디');
    const pwInput = screen.getByLabelText('비밀번호');
    const signinButton = screen.getByRole('button', { name: '로그인' });

    await userEvent.type(idInput, 'test10@example.com');
    await userEvent.type(pwInput, 'qwer');
    await userEvent.click(signinButton);

    const errorSnackbar = screen.getByText('존재하지 않는 사용자입니다.');
    expect(errorSnackbar).toBeInTheDocument();
  });
});