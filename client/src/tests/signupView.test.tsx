import { render, screen } from "../test-utils";
import userEvent from '@testing-library/user-event';
import SignupView from '../views/signup';

describe.skip("<SignupView />", () => {
  it('아이디, 닉네임, 비밀번호 입력창과 회원가입 버튼을 보여준다.', () => {
    render(<SignupView />);

    const idInput = screen.getByLabelText('아이디');
    const nicknameInput = screen.getByLabelText('닉네임');
    const pwInput = screen.getByLabelText('비밀번호');
    const signupButton = screen.getByRole('button', { name: '회원가입' });

    expect(idInput).toBeInTheDocument();
    expect(nicknameInput).toBeInTheDocument();
    expect(pwInput).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });

  it('올바른 값을 입력하면 회원가입 버튼을 활성화시킨다.', async () => {
    render(<SignupView />);

    const idInput = screen.getByLabelText('아이디');
    const nicknameInput = screen.getByLabelText('닉네임');
    const pwInput = screen.getByLabelText('비밀번호');
    const signupButton = screen.getByRole('button', { name: '회원가입' });
    expect(signupButton).toBeDisabled();

    await userEvent.type(idInput, 'test1');
    await userEvent.type(nicknameInput, '테스트1');
    await userEvent.type(pwInput, 'qwer');
    expect(signupButton).toBeDisabled();

    await userEvent.type(idInput, 'test1@example.com');
    expect(signupButton).toBeEnabled();
  });

  it('회원가입 성공시 MainView로 이동시킨다.', async () => {
    render(<SignupView />);

    const idInput = screen.getByLabelText('아이디');
    const nicknameInput = screen.getByLabelText('닉네임');
    const pwInput = screen.getByLabelText('비밀번호');
    const signupButton = screen.getByRole('button', { name: '회원가입' });

    await userEvent.type(idInput, 'test1@example.com');
    await userEvent.type(nicknameInput, '테스트1');
    await userEvent.type(pwInput, 'qwer');
    await userEvent.click(signupButton);

    const mainViewTitle = await screen.findByText('메인화면');
    expect(mainViewTitle).toBeInTheDocument();
  });

  it.skip('회원가입 실패시 snackbar로 실패 이유를 보여준다.', async () => {
    render(<SignupView />);

    const idInput = screen.getByLabelText('아이디');
    const nicknameInput = screen.getByLabelText('닉네임');
    const pwInput = screen.getByLabelText('비밀번호');
    const signupButton = screen.getByRole('button', { name: '회원가입' });

    await userEvent.type(idInput, 'test1@example.com');
    await userEvent.type(nicknameInput, '테스트1');
    await userEvent.type(pwInput, 'qwer');
    await userEvent.click(signupButton);

    const errorSnackbar = screen.getByText('이미 존재하는 사용자입니다.');
    expect(errorSnackbar).toBeInTheDocument();
  });
});