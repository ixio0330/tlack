const signRules = {
  email: (value: string) => {
    if (!value) return;
    if (!value.includes('@')) {
      return '이메일 형식이 올바르지 않습니다.';
    }
  },
  password: (value: string) => {
    if (!value) return;
    if (value.length < 8) {
      return '비밀번호는 8글자 이상이어야 합니다.';
    }
  },
  name: (value: string) => {
    if (!value) return;
    if (/[`~!@#$%^&*|\\\'\";:\/?]/gi.test(value)) {
      return '이름에 특수문자를 포함할 수 없습니다.';
    }
  },
};

export default signRules;