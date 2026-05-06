import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const root = process.cwd();
const port = Number(process.env.PORT || 5173);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

function resolvePath(url) {
  const cleanPath = normalize(decodeURIComponent(url.split('?')[0])).replace(/^\.\.(\/|\\|$)/, '');
  const requested = cleanPath === '/' ? '/index.html' : cleanPath;
  return join(root, requested);
}

createServer((request, response) => {
  const filePath = resolvePath(request.url || '/');
  const target = existsSync(filePath) && statSync(filePath).isFile() ? filePath : join(root, 'index.html');
  response.writeHead(200, { 'Content-Type': types[extname(target)] || 'application/octet-stream' });
  createReadStream(target).pipe(response);
}).listen(port, () => {
  console.log(`Raritone frontend running at http://localhost:${port}`);
});
