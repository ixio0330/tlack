import express from 'express';
import withAsync from '../utils/withAsync';
import BadRequest from '../error/badRequest';
import userService from '../user/user.service';
import crypto from '../utils/crypto';
import jwt from '../utils/jwt';
import tokenMiddleware from '../middleware/token';

const router = express.Router();

router.post('/signup', withAsync(async (req, res) => {
  await userService.create(req.body);
  res.send({
    name: '회원가입 성공',
    type: 'success',
    message: '회원가입을 완료했습니다.'
  });
}));

router.post('/signin', withAsync(async (req, res) => {
  const user = await userService.getById(req.body.id);
  const isValid = await crypto.verifyPassword({
    hashPassword: user.password,
    password: req.body.password,
    salt: user.salt,
  });
  if (!isValid) {
    throw new BadRequest('비밀번호가 일치하지 않습니다.');
  }
  await userService.update({
    id: user.id,
    status: 'online'
  });
  res.send({
    name: '로그인 성공',
    type: 'success',
    message: '로그인 했습니다.',
    token: jwt.getToken(user.id, user.nickname),
  });
}));

router.get('/user', tokenMiddleware, withAsync(async (req, res) => {
  const user = await userService.getById(req.body.user_id);
  res.send({  
    id: user.id,
    nickname: user.nickname,
    status: user.status,
  });
}));

router.post('/singout', tokenMiddleware, withAsync(async (req, res) => {
  await userService.update({
    id: req.body.user_id,
    status: 'offline'
  });
  res.send({
    name: '로그아웃 성공',
    type: 'success',
    message: '로그아웃 했습니다.',
  });
}));

export default router;