import express from 'express';
import withAsync from '../utils/withAsync';
import workspaceService from './workspace.service';
import tokenMiddleware from '../middleware/token';

const router = express.Router();

router.post('/', tokenMiddleware, withAsync(async (req, res) => {
  const workspace_id = await workspaceService.create({ ...req.body });

  res.send({
    name: '워크스페이스 생성 완료',
    type: 'success',
    message: '워크스페이스를 생성했습니다.',
    workspace_id
  });
}));

router.get('/', tokenMiddleware, withAsync(async (req, res) => {
  const workspace_list = await workspaceService.getAllByUserId(req.body.user_id);

  res.send({
    name: '워크스페이스 조회 성공',
    type: 'success',
    message: '워크스페이스를 조회했습니다.',
    workspace_list
  });
}));

export default router;