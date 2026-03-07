# AI Assistant API Key 说明

**已改为后端方案：** Key 放在 Cloudflare Worker 里，前端不再带 Key。部署与配置见 **cf-worker/README.md**。

---

## 为什么 Key 会被“自动关”？（仅当 Key 写在前端时）

当前 Key 是写在**前端代码**里的（`index.html`、`ai-assistant.js`）。任何人打开你的网站都可以：

- 在浏览器里“查看网页源代码”或“检查 / 网络”里看到或抓到你的 API Key  
- 用这个 Key 去调 OpenRouter，消耗你的额度  

很多 API 服务（包括 OpenRouter）会通过自动检测发现 Key 出现在：

- 公开的网页/前端代码里  
- 公开的 GitHub 等仓库里  

一旦检测到，平台可能会**自动禁用或限制**这个 Key，防止继续被滥用。所以不是你手动关的，多半是 **OpenRouter 的自动安全策略** 把暴露的 Key 关掉了。

## 想避免再次被关，该怎么做？

**根本办法：不要把 API Key 放在前端，改用“后端转发”。**

1. **用你自己的后端服务器**  
   - 在你的服务器上写一个接口（例如 `/api/chat`）。  
   - 把 OpenRouter 的 API Key 只存在**服务器环境变量**里，不要写进前端。  
   - 前端只请求你的接口（例如 `POST /api/chat`），由后端用 Key 去请求 OpenRouter，再把结果返回给前端。  
   - 这样 Key 从未出现在浏览器里，OpenRouter 也扫不到，就不会因为“暴露在前端”而被自动关掉。

2. **没有自己的服务器时**  
   - 可以用 **Vercel / Netlify / Cloudflare Workers** 等，写一个简单的 serverless 函数做同样的事：  
     函数里从环境变量读 Key，收到前端请求后去调 OpenRouter，再返回结果。  
   - Key 只存在这些平台的环境变量里，不写进前端代码。

3. **如果暂时只能把 Key 写在前端**  
   - 只能定期去 OpenRouter 后台**新建 Key**，替换代码里的旧 Key。  
   - 不要把项目（带 Key 的代码）推到公开的 GitHub 等地方，否则很容易再次被检测并禁用。  
   - 这样无法“保证”不被自动关，只能减少被扫到的概率。

## 总结

- **谁关的？** 多半是 OpenRouter 的**自动安全机制**在检测到 Key 暴露后关的。  
- **能不能避免自动关？** 可以：把 Key 只放在**后端或 serverless 环境变量**里，用后端转发请求，前端不再出现 Key，就不会再因为“暴露在前端”而被自动关闭。
