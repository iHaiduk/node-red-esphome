import { $ } from 'bun';
import { pathOr, isDeepEqual, isString } from 'remeda';
import { watch } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join, relative } from 'path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
// @ts-ignore
import victorica from 'victorica';

import mainPackage from '../package.json';
import { installNode } from './install.ts';

const IS_DEV = process.env.NODE_ENV === 'development';

const mainPackagePath = join(__dirname, '..', 'package.json');
const distPath = join(__dirname, '..', 'dist');
const distNodesPath = join(distPath, 'nodes');
const nodesDir = join(__dirname, '..', 'src/nodes');

const nodes = await readdir(nodesDir);

const prefixNodeRed = 'node-red';

await $`rm -rf ${distNodesPath}`;

const renderNode = async(node: string) => {
  const mainNodePath = join(distNodesPath, node);

  await $`rm -rf ${mainNodePath}`;

  // Render info packages
  const info = {
    name: [prefixNodeRed, node].join('-'),
    version: mainPackage.version,
    description: `ESPHome node of ${node}`,
    dependencies: mainPackage.dependencies,
    license: mainPackage.license,
    keywords: [prefixNodeRed, node],
    'node-red': { nodes: { [node]: `${node}.js` } },
  };

  await Bun.write(join(mainNodePath, 'package.json'), JSON.stringify(info, null, 2), { createPath: true });

  // Render templates
  const originTemplatePath = join(nodesDir, node, 'template', 'index.tsx');
  const originRegisterTypePath = join(nodesDir, node, 'register-type', 'index.ts');

  if (
    await Bun.file(originTemplatePath).exists()
    && await Bun.file(originRegisterTypePath).exists()
  ) {
    const { default: App } = require(originTemplatePath);
    const html = `\n${IS_DEV ? victorica(renderToStaticMarkup(createElement(App))) : renderToStaticMarkup(createElement(App))}\n`;
    const markup = renderToStaticMarkup(
      createElement('script', {
        dangerouslySetInnerHTML: { __html: html },
        'data-template-name': node,
        type: 'text/html',
      }),
    );

    const result = await Bun.build({
      entrypoints: [originRegisterTypePath],
      sourcemap: IS_DEV ? 'inline' : 'none',
      minify: !IS_DEV,
      experimentalCss: true,
      packages: 'bundle',
    });

    const script = renderToStaticMarkup(
      createElement('script', { type: 'text/javascript' }, await result.outputs.at(0)?.text()),
    );

    const templateMarkup = `${script}\n\n${markup}`.replaceAll('{{node_name}}', node);

    await Bun.write(join(mainNodePath, `${node}.html`), templateMarkup, { createPath: true });
  }

  const originRegisterNodePath = join(nodesDir, node, 'register-node', 'index.ts');

  if (await Bun.file(originRegisterNodePath).exists()) {
    const result = await Bun.build({
      entrypoints: [originRegisterNodePath],
      sourcemap: IS_DEV ? 'inline' : 'none',
      minify: !IS_DEV,
      experimentalCss: true,
      packages: 'bundle',
      target: 'node',
      // target: 'browser',
      format: 'cjs',
    });

    const script = (await result.outputs.at(0)?.text() ?? '').replaceAll('{{node_name}}', node);

    await Bun.write(join(mainNodePath, `${node}.js`), script, { createPath: true });
  }

  // Check if package.json has changed
  if (!isDeepEqual(Object.keys(pathOr(mainPackage as any, ['node-red'], {})), nodes)) {
    const relativePath = relative(join(__dirname, '..'), distNodesPath);
    await Bun.write(mainPackagePath, JSON.stringify({
      ...mainPackage,
      'node-red': { ...Object.fromEntries(nodes.map(node => [node, `./${relativePath}/${node}/${node}.js`])) },
    }, null, 2), { createPath: true });
  }

  console.clear();
  console.info('Build successful at:', new Date().toISOString());

  await installNode(node);
};

await Promise.all(nodes.map(renderNode));

watch(nodesDir, { recursive: true }, (event, filename) => {
  const nodePath = filename?.split('/').at(0);
  if (isString(nodePath)) renderNode(nodePath);
});
