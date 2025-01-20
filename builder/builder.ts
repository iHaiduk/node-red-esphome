import { $ } from 'bun';
import { addProp, setPath, keys, prop, pathOr, unique } from 'remeda';
import { watch } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { basename, join } from 'path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
// @ts-ignore
import victorica from 'victorica';
import { installNodes } from './install.ts';

const nodeNameRegex = '{{node_name}}'
const esphomeVariableRegex = '{{esphome_type}}'
const esphomeVariableTypeName = 'esphome-variable';

const IS_DEV = process.env.NODE_ENV === 'development';
const distFolder = 'dist';

const rootPath = join(__dirname, '..');
const distPath = join(rootPath, distFolder);
const nodesDir = join(rootPath, 'src/nodes');
const localeDir = join(rootPath, 'src/locales');

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

const renderNode = async(node: string) => {
  const mainNodePath = join(distPath, node);

  // Render templates
  const originTemplatePath = join(nodesDir, node, 'template', 'index.tsx');
  const originRegisterTypePath = join(nodesDir, node, 'register-type', 'index.ts');

  if (
    await Bun.file(originTemplatePath).exists()
    && await Bun.file(originRegisterTypePath).exists()
  ) {
    const { default: App } = await import(originTemplatePath);
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
      target: 'browser',
      format: 'esm',
    });

    const script = renderToStaticMarkup(
      createElement('script', { type: 'text/javascript' }, await result.outputs.at(0)?.text()),
    );

    const templateMarkup = `${script}\n\n${markup}`
      .replaceAll(nodeNameRegex, node)
      .replaceAll(esphomeVariableRegex, esphomeVariableTypeName);

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
    });

    const script = (await result.outputs.at(0)?.text() ?? '')
      .replaceAll(nodeNameRegex, node)
      .replace('var nodeInit = ', 'module.exports=')
      .replace('var register_node_default = nodeInit;\n' +
        'export {\n' +
        '  register_node_default as default\n' +
        '};', '');

    await Bun.write(join(mainNodePath, `${node}.js`), script, { createPath: true });
  }
};

const rerender = async () => {
  const nodes = await readdir(nodesDir);

  console.clear();

  await $`rm -rf ${distPath}`;

  await buildLocale();

  await Promise.all(nodes.map(renderNode));

  console.info('Node build successful at:', new Date().toISOString());

  const mainPackage = require('../package.json');

  const existKeys = Object.keys(mainPackage['node-red'].nodes);

  if(unique([...existKeys, ...nodes]).length !== nodes.length) {
    const info = {
      ...mainPackage,

      'node-red': { nodes: nodes.reduce((acc, node) => ({ ...acc, [node]: `./${IS_DEV ? distFolder + '/' : ''}${node}/${node}.js` }), {}) },
    };

    await Bun.write(join(rootPath, 'package.json'), JSON.stringify(info, null, 2), { createPath: true });
  }

  if(IS_DEV)
    setTimeout(installNodes, 1000);
}

const buildLocale = async () => {
  const nodes = await readdir(nodesDir);
  const fileLocales = await readdir(join(localeDir, 'list'));

  const langLocales = await Promise.all(fileLocales.map(file => import(join(localeDir, 'list', file)).then(res => ({
    data: res.default,
    lang: basename(file, '.lang.ts'),
  }))));

  let langData: Record<string, string | {}> = {}

  for (const {lang, data} of langLocales) {
    langData = addProp(langData, lang, {});
    for( const [key, value] of Object.entries(data as Record<string, string>)) {
      const path = key.split('.');
      const lastKey = path.at(-1);
      let prevPath: string[] = [lang];

      for(const currentPath of path) {
        prevPath = [...prevPath, currentPath];

        if(pathOr(langData, prevPath, undefined) === undefined) {
          langData = setPath(langData, prevPath, currentPath === lastKey ? value : {});
        }
      }
    }
  }

  for(const node of nodes) {
    for(const lang of keys(langData)) {
      const data = prop(langData, lang);

      await Bun.write(join(distPath, node, 'locales', lang, `${node}.json`), JSON.stringify(data, null, 2), { createPath: true });
    }
  }

  console.info('Locale build successful at:', new Date().toISOString());
}

rerender();

let waitBuild: Timer;

if(IS_DEV)
  watch(join(rootPath, 'src'), { recursive: true }, () => {
    clearTimeout(waitBuild);
    waitBuild = setTimeout(rerender,1000);
  });
