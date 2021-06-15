/**
 * 使用gulp自动将src目录输出到发布目录
 * 也可避免devDependencies过多无法上传问题
 */
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const {
  // exec,
  execSync,
} = require('child_process');

const { src, dest, series, parallel, watch, } = require('gulp');
const del = require('del');
// const babel = require('gulp-babel');

const ts = require('gulp-typescript');

const rootPath = path.join(__dirname, './');
const srcPath = path.resolve(rootPath, yargs.argv.src);
const distPath = path.resolve(rootPath, yargs.argv.dist);

function clean() {
  return del(distPath, {
    force: true,
  });
}

// 公共排除的文件
const commonExcludedPattern = [
  // 排除掉 distPath 目录，避免 distPath 在 srcPath 下
  `!${distPath}/**`,
  `!${rootPath}/node_modules/**`,
  `!${srcPath}/__tests__/**`,
  `!${srcPath}/__unitests__/**`,
  `!${srcPath}/plugin/node_modules/**`
];

const tsProject = ts.createProject(path.join(rootPath, 'tsconfig.json'));
const tsFiles = [
  `${srcPath}/**/*.ts`,
  ...commonExcludedPattern,
];

function compileTs() {
  return src(tsFiles, {
    follow: true,
  })
    .pipe(tsProject())
    .pipe(
      dest(distPath)
    );
}

// const jsFiles = [
//     `${srcPath}/**/*.js`
// ];
// function compileJs() {
//     return src(jsFiles, {
//         follow: true,
//     }).pipe(
//         babel({
//             presets: ['@babel/preset-env'],
//         })
//     ).pipe(dest(distPath));
// }

const commonFiles = [
  `${srcPath}/**/*.axml`,
  `${srcPath}/**/*.acss`,
  `${srcPath}/**/*.css`,
  `${srcPath}/**/*.json`,
  // sjs，原封不动的挪过去
  `${srcPath}/**/*.sjs`,

  // js
  `${srcPath}/**/*.js`,

  // 图片
  `${srcPath}/**/*.bmp`,
  `${srcPath}/**/*.png`,
  `${srcPath}/**/*.jpg`,
  `${srcPath}/**/*.jpeg`,
  `${srcPath}/**/*.gif`,
  `${srcPath}/**/*.svg`,

  // 字体
  `${srcPath}/**/*.ttf`,
];
function copyCommonFiles() {
  return src(commonFiles).pipe(dest(distPath));
}

function installNodeModules(callback) {
  let error;

  try {
    execSync('yarn --prod', {
      cwd: `${distPath}/plugin`,
      stdio: 'inherit',
    });
  } catch (e) {
    error = e;
  }

  callback(error);
}

function watchWithEffect(globs, fn) {
  return watch(globs, (...args) => {
    return fn(...args);
  });
}

function auto() {
  watchWithEffect(tsFiles, compileTs);
  watchWithEffect(commonFiles, copyCommonFiles);
}

function successTips(callback) {
  callback();
}

exports.dist = series(
  clean,
  // source files
  parallel(
    // compileJs,
    compileTs,
    copyCommonFiles
  ),
  installNodeModules,
);

exports.default = series(exports.dist, successTips, auto);
