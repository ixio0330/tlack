import { rest } from 'msw';

const handlers = [
  rest.post('/auth/signin', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({
      token: 'token',
    }));
  }),
];

export default handlers;