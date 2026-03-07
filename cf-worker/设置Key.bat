@echo off
chcp 65001 >nul
echo.
echo 请到 https://openrouter.ai/keys 复制你的 API Key（没有就新建一个）
echo 下面会提示 "Enter a secret value:"，粘贴 Key 后回车即可。
echo.
cd /d "%~dp0"
npx wrangler secret put OPENROUTER_API_KEY
echo.
pause
