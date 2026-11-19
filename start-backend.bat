@echo off
REM 姓名：董琦媛 | 学号：24001010728 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash
REM 一键启动后端服务（端口 8728），启动后浏览器访问 http://localhost:8728
title DongXianyu Backend 8728

cd /d "%~dp0backend"

if not exist "node_modules" call npm install
if not exist ".env" goto :DongNoEnv

echo [启动] 后端服务：http://localhost:8728
node server.js
echo [提示] 服务已停止。
pause
exit /b 0

:DongNoEnv
echo [错误] 缺少 backend\.env 文件，请先配置数据库凭据。
pause
exit /b 1
