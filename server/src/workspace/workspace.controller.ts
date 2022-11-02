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
  })
}));

export default router;