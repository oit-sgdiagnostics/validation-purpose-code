import { spawnSync, execSync } from 'node:child_process';

const cwd = process.cwd();

// Resolve docker's absolute path 
const lookupCmd = process.platform === 'win32' ? 'where docker' : 'which docker';
const dockerPath = execSync(lookupCmd)
  .toString()
  .split('\n')
  .map(line => line.trim())
  .find(Boolean);

if (!dockerPath) {
  console.error('Could not locate the docker executable.');
  process.exit(1);
}

const result = spawnSync(
  dockerPath,
  [
    'run', '--rm',
    '--env-file', '.env',
    '-v', `${cwd}:/usr/src`,
    'sonarsource/sonar-scanner-cli'
  ],
  { stdio: 'inherit', shell: false }
);

process.exit(result.status ?? 1);