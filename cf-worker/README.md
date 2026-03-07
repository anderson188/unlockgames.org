# AI Assistant 代理（Cloudflare Worker）

已部署到：**https://unlockgames-ai-proxy.2420133012.workers.dev**  
前端（index.html、ai-assistant.js）已指向该地址。

## 你只需做一步：设置 API Key

1. 打开 **https://openrouter.ai/keys**，登录后复制你的 API Key（没有就新建一个）。
2. 双击运行本目录下的 **`设置Key.bat`**。
3. 看到 `Enter a secret value:` 后，**粘贴 Key，回车**。
4. 完成。刷新网站即可使用 AI 助手。

Key 只存在 Cloudflare 上，前端和代码里都没有，不会被自动关掉。

---

## 以后若改代码需重新部署

在 **cf-worker** 目录下执行：

```bash
npx wrangler deploy
```

## 本地调试（可选）

在 cf-worker 目录下新建 `.dev.vars`（不要提交到 git），内容：

```
OPENROUTER_API_KEY=你的Key
```

然后执行：`npx wrangler dev`
