/**
 * 姓名：董琦媛 | 学号：24001010728 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash
 * 基础接口路由：服务健康检查
 */
const DongExpress = require('express');
const DongRouter = DongExpress.Router();

// GET /api/health 服务健康检查
DongRouter.get('/health', (DongReq, DongRes) => {
  DongRes.json({
    code: 0,
    msg: '服务运行正常',
    data: {
      service: 'DongXianyu',
      port: 8728,
      time: new Date().toISOString(),
    },
  });
});

module.exports = DongRouter;
