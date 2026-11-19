/**
 * 姓名：董琦媛 | 学号：24001010728 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash
 * 后端入口：Express 服务，固定端口 8728，托管 frontend 静态资源，支持跨域
 */
const DongPath = require('path');
require('dotenv').config({ path: DongPath.join(__dirname, '.env') });

const DongExpress = require('express');
const DongCors = require('cors');
const DongIndexRoute = require('./routes/DongIndexRoute');

const DongApp = DongExpress();
const DongPort = 8728;
const DongFrontendPath = DongPath.join(__dirname, '..', 'frontend');

// 支持所有跨域访问
DongApp.use(DongCors());
DongApp.use(DongExpress.json());
DongApp.use(DongExpress.urlencoded({ extended: true }));

// 托管前端静态资源
DongApp.use(DongExpress.static(DongFrontendPath));

// 所有接口统一以 /api/ 为前缀
DongApp.use('/api', DongIndexRoute);

// 未匹配的接口统一返回 JSON 错误
DongApp.use('/api', (DongReq, DongRes) => {
  DongRes.status(404).json({ code: 404, msg: '接口不存在', data: null });
});

DongApp.listen(DongPort, () => {
  console.log(`[DongServer] 服务已启动：http://localhost:${DongPort}`);
});
