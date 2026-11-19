---
name: dong-github-push
description: 将本项目改动提交（commit）并推送（push）到 GitHub。适用于用户说“提交到 GitHub”“push 代码”“同步仓库”“提交本次改动”等场景。使用本机已配置的 SSH 公钥，无需输入密码或 Token。
description_zh: 将本项目改动提交并推送到 GitHub，使用已配置的 SSH 公钥自动完成 commit 与 push。
description_en: Commit and push project changes to GitHub using the configured SSH key.
version: "1.0.0"
---

<!-- 姓名：董琦媛 | 学号：24001010728 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash -->

# 提交到 GitHub

把当前项目的改动提交并推送到 GitHub 远程仓库。

## 目标仓库

- 远端地址：`https://github.com/7qiy/-.git`
- SSH 地址：`git@github.com:7qiy/-.git`
- 默认分支：`master`

## 前置检查

1. 确认工作目录是项目根目录（存在 `.git` 与 `AGENTS.md`）。
2. 确认 SSH 可用：

   ```powershell
   ssh -T git@github.com
   ```

   预期输出 `Hi 7qiy! You've successfully authenticated...`。
   若出现 `Connection refused`，说明 22 端口被封，依赖 `~/.ssh/config` 中的配置：

   ```
   Host github.com
     HostName ssh.github.com
     Port 443
     User git
     IdentityFile ~/.ssh/id_ed25519_neusoft
     IdentitiesOnly yes
   ```

   当前 GitHub 账号（7qiy）绑定的公钥是 `~/.ssh/id_ed25519_neusoft.pub`
   （`SHA256:0jzhWz086RAfWNZ45Epr5kpk2a58g7QSWCpZrRqroRI`）。

3. 若远程仓库不存在，`git push` 会报 `Repository not found`，此时停止并提示用户先在 GitHub 手动创建仓库（不要自动创建）。

## 执行步骤

```powershell
# 1. 查看改动
git status --short
git diff

# 2. 暂存并提交（提交信息按改动性质撰写）
git add -A
git commit -m "feat: 简要说明本次改动"

# 3. 配置远程（仅首次）
git remote add origin git@github.com:7qiy/-.git

# 4. 推送
git push -u origin master
```

## 规则

- 提交前必须确认 `backend/.env`、`node_modules/` 未被暂存（`.gitignore` 已排除）。
- 无改动时不要创建空提交。
- 推送前如需强制覆盖，必须先询问用户，不要直接 `--force`。
- 推送完成后用 `git log --oneline -1` 与 `git status` 确认结果。
- 不得修改 git 全局配置（user.name / user.email）。

## 常见问题

| 现象 | 原因 | 处理 |
| --- | --- | --- |
| `Connection refused` | 22 端口被封 | 使用 `~/.ssh/config` 的 443 转发 |
| `Permission denied (publickey)` | 公钥未加入 GitHub | 添加 `~/.ssh/id_ed25519.pub` 到 GitHub SSH keys |
| `Repository not found` | 仓库不存在或地址错误 | 让用户确认仓库地址 |
| `rejected (fetch first)` | 远端有新提交 | 先 `git pull --rebase origin master` 再推送 |
