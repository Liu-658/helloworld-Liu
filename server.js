const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const HOST = '0.0.0.0'; // 监听所有网卡，允许局域网访问

const server = http.createServer((req, res) => {
  // 仅处理首页请求（/ 或 /index.html）
  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('服务器内部错误：无法读取 index.html 文件');
        return;
      }

      // 生成当前服务器时间
      const now = new Date();
      const serverTime = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      const serverTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // 将 HTML 中的占位符替换为真实服务器时间
      const html = data
        .replace('{{serverTime}}', serverTime)
        .replace('{{serverTimeZone}}', serverTimeZone);

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    });
    return;
  }

  // 其他路径返回 404
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('404 Not Found');
});

server.listen(PORT, HOST, () => {
  console.log('HelloWorld 网站已启动');
  console.log(`本机访问：http://localhost:${PORT}`);
  console.log(`局域网访问：http://<本机IP>:${PORT}`);
});
