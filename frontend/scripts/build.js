import { accessSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const requiredFiles = ['index.html', 'src/main.js', 'src/styles.css', 'src/figmaScreens.js'];
for (const file of requiredFiles) {
  accessSync(file);
}

for (const file of ['src/main.js', 'src/figmaScreens.js', 'server.js']) {
  const result = spawnSync(process.execPath, ['--check', file], { stdio: 'inherit' });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log('Frontend static build check passed.');
