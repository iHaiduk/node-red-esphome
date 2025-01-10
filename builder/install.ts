import { $ } from 'bun';
import { pathOr } from 'remeda';
import { join } from 'path';

import packageJson from '../package.json';

const nodes = Object.values(pathOr(packageJson as any, ['node-red'], {})) as string[];

export const installNode = async(node: string) => {
  const nodePath = join(__dirname, '..', node).split('/')
    .slice(0, -1)
    .join('/');

  console.log('install:', nodePath.replace(__dirname, ''));

  await $`cd ~/.node-red && npm i ${nodePath}`;

  console.log('installed:', nodePath.replace(__dirname, ''));
};

const allInstallNode = async(index = 0) => {
  const node = nodes[index];
  if (node !== undefined) {
    await installNode(node);

    allInstallNode(index + 1);
  }
};

if (process.env.NODE_ENV !== 'development') allInstallNode();
