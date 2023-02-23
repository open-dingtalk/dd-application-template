'use strict';

const path = require('path');
const fs = require('fs');
const glob = require('glob');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
);

const buildPath = process.env.BUILD_PATH || 'build';

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

const appPages = [];
const jsExt = {
  '.js': 1,
  '.jsx': 1,
  '.ts': 1,
  '.tsx': 1,
};
const entriesDir = resolveApp('src/entries');
if (fs.existsSync(entriesDir)) {
  const es = fs.readdirSync(entriesDir);
  for (const e of es) {
    if (fs.statSync(path.join(entriesDir, e)).isFile()) {
      const extname = path.extname(e).toLowerCase();
      if (!jsExt[extname]) {
        continue;
      }
      const name = path.basename(e, extname);
      appPages.push({
        name,
        appIndexJs: resolveApp(`src/entries/${e}`),
      });
    }
  }
}

const appTemplates = [];
const publicDir = resolveApp('public');
if (fs.existsSync(publicDir)) {
  const es = fs.readdirSync(publicDir);
  for (const e of es) {
    if (fs.statSync(path.join(publicDir, e)).isFile()) {
      const extname = path.extname(e).toLowerCase();
      if (extname !== '.html') {
        continue;
      }
      const name = path.basename(e, extname);
      appTemplates.push({
        name,
        filename: e,
        template: resolveApp(`public/${e}`),
      });
    }
  }
}

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp(buildPath),
  appPublic: resolveApp('public'),
  appHtml: appTemplates,
  appIndexJs: appPages,
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  appWebpackCache: resolveApp('node_modules/.cache'),
  appTsBuildInfoFile: resolveApp('node_modules/.cache/tsconfig.tsbuildinfo'),
  swSrc: resolveModule(resolveApp, 'src/service-worker'),
  publicUrlOrPath,
  appTemplates,
  scriptEntry: resolveApp('src/script/index.js'),
  devManifest: resolveApp('devManifest.json'),
  
};



module.exports.moduleFileExtensions = moduleFileExtensions;
