@echo off
chcp 65001 >nul
echo.
echo 若提示 "API key invalid"，说明当前 Key 无效，请重新设置：
echo   1. 打开 https://openrouter.ai/keys 登录
echo   2. 新建一个 Key 或复制现有有效 Key（确保没多余空格）
echo   3. 下面出现 "Enter a secret value:" 时粘贴 Key 并回车
echo.
cd /d "%~dp0"
npx wrangler secret put OPENROUTER_API_KEY
echo.
echo 设置完成。若刚换了新 Key，请刷新网页再试 AI 助手。
echo.
pause
