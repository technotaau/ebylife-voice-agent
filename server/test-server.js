const http = require('http');

const server = http.createServer((req, res) => {
  console.log('Request received:', req.url);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'OK' }));
});

const PORT = 3002;
server.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
});

// Keep the process alive
process.on('SIGINT', () => {
  console.log('Server shutting down...');
  server.close();
  process.exit(0);
});