import { $ } from 'bun';
import { join } from 'path';
import { watch } from 'node:fs';

const pluginPath = join(__dirname, '..');
const distPath = join(pluginPath, 'dist');

export const installNodes = async () => {
  const nodeRedPath = (await $`realpath ~/.node-red`).stdout.toString().replace('\n','');

  await $`rm -rf ${nodeRedPath}/package.json`;
  await $`rm -rf ${nodeRedPath}/node_modules/node-red-esphome`;

  const {stdout, stderr} = await $`cd ${nodeRedPath} && npm i ${pluginPath}`;

  if(stdout.length > 0) console.log('installed:', stdout.toString());

  if(stderr.length > 0) console.error('Error:', stderr.toString());
};

let waitUpdate: Timer;

if (process.env.NODE_ENV === 'development') {
  waitUpdate = setTimeout(installNodes, 1000);

  watch(distPath, { recursive: true }, () => {
    clearTimeout(waitUpdate);
    waitUpdate = setTimeout(installNodes, 1000);
  });
}
