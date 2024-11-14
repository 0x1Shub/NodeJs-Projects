// Create a Server using HTTP

const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-type": "text/plain" });
  res.end("Hello World");
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
