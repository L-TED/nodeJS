// 서버

const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  res.end("서버 연결 성공");
});

server.listen(3000, () => {
  console.log("실행중");
});
