<!-- 姓名：董琦媛 | 学号：24001010728 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash -->

# 闲鱼二手交易平台

- 学号：24001010728
- 姓名：董琦媛
- 项目名称：闲鱼二手交易平台
- 项目类别：模仿（闲鱼）

## 技术栈

- 前端：原生 HTML、CSS、JavaScript（无第三方库、无框架、无 CDN）
- 后端：Node.js + Express（RESTful + MVC，端口 8728）
- 数据库：MySQL

## 目录结构

```
frontend/            前端页面（Express 静态托管）
  css/ js/ fonts/ images/
backend/             后端服务
  server.js          入口
  routes/ controllers/ models/
  .env               数据库凭据（不入库）
```

## 启动方式

```bash
cd backend
npm start
```

浏览器访问：http://localhost:8728
