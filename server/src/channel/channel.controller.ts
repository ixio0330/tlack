import express from 'express';
import withAsync from '../utils/withAsync';
import channelService from './channel.service';
import tokenMiddleware from '../middleware/token';


const router = express.Router();

router.post('/', tokenMiddleware, withAsync(async (req, res) => {
  const channel_id = await channelService.create(req.body);

  res.send({
    name: '채널 생성 완료',
    type: 'success',
    message: '채널을 생성했습니다.',
    channel_id
  });
}));

export default router;