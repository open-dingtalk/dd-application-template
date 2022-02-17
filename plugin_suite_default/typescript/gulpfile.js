/**
 * 使用gulp自动将src目录输出到发布目录
 * 也可避免devDependencies过多无法上传问题
 */
const fs = require('fs');
const fse = require('fs-extra');
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
 
const dingConfig = fse.readJsonSync(`${rootPath}/ding.config.json`);

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
  `!${srcPath}/**/config.json`,
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

// config优化
const configFiles = [
  `${srcPath}/plugin/components/config.json`,
];
async function copyConfigFiles(cb) {
  let config = await fse.readJson(configFiles[0]);
  const plugin = await fse.readJson(`${srcPath}/plugin/plugin.json`);

  // 生成规范的config；
  config = generateConfigContent(config);
  await fse.outputJson(`${distPath}/plugin/components/config.json`, config);
  await fse.outputJson(`${distPath}/plugin/components/pc.config.json`, config);

  await writeConfigFile(plugin, 'pc', config);
  await writeConfigFile(plugin, 'mobile', config);
  await writeConfigFile(plugin, 'setter', config);

  cb();
}

async function writeConfigFile(plugin, type, data) {
  let pt = plugin.publicComponents[type].slice(1, -6);
  data.pluginComponentName = type;
  await fse.outputJson(`${distPath}/plugin/${pt}/pc.config.json`, data); 
  return fse.outputJson(`${distPath}/plugin/${pt}/config.json`, data);
}

// componentName 转义
function getComponentName(name) {
  const cpnsMap = {
    SelectField: 'DDSelectField',
    DateField: 'DDDateField',
    MultiSelectField: 'DDMultiSelectField',
    DateRangeField: 'DDDateRangeField',
    PhotoField: 'DDPhotoField',
    Attachment: 'DDAttachment',
  };

  return cpnsMap[name];
}

function getChildren(children) {
  let transformChildren = [];
  if (children instanceof Array && children.length > 0) {
    transformChildren = (children || []).map(function(item) {
      // 自定义控件
      if (item.type === 'custom') {
        return {
          componentName: 'CommonField',
          props: {
            bizAlias: item.bizAlias,
            // 和罗戈确认，不必和 bizAlias保持一致
            commonBizType: item.componentName,
            ...item.props,
          },
        };
      }
      if (item.children) {
        return {
          componentName:
            getComponentName(item.componentName) || item.componentName,
          props: {
            bizAlias: item.bizAlias,
            ...item.props,
          },
          children: getChildren(item.children || []),
        };
      }

      return {
        componentName:
          getComponentName(item.componentName) || item.componentName,
        props: {
          bizAlias: item.bizAlias,
          ...item.props,
        },
      };

    });
  }

  return transformChildren;
}

/**
 * 生成 config.json
 * @returns
 */
function generateConfigContent(config) {
  try {
    const {
      name,
      description,
      icon,
      bizType,
      props,
      children,
      setters,
      category,
      appId,
    } = config;

    // 套件props
    const suiteProps = {
      bizType,
      bizAlias: bizType,
      extract: true,
      isThirdSuite: true,
      ...props,
    };

    const transformChildren = getChildren(children);
    let transformConfig = {
      'pluginComponentName': 'suite',
      'previewUrl': icon || 'https://static.dingtalk.com/media/lALOB0o7K8yQzJA_144_144.png',
      'previewHeight': 200,
      'quickSetting': {},
      isUnique: true,
      isSuite: true,
      componentName: 'DDBizSuite',
      category: category || 'suite_test',
      name,
      description,
      icon,
      appId,
      //TODO:xhf-ding lint需要移除校验props、setters
      props: suiteProps,
      dataSources: [],
      setters,
      children: transformChildren,
    };
    if (setters && (setters instanceof Array) && setters.length > 0) {
      const setterName = `Setter${('' + dingConfig.miniAppId).replace(/[^a-zA-Z0-9]/gi,'')}`;
      // 找出自定义setter
      const settersFilter = setters.map(item => {
        if(item?.type === 'custom'){
          item.setterName = setterName;
        }
        return item;
      });
      
      transformConfig.setters = settersFilter;
    }
    return transformConfig;
  } catch (error) {
    console.log(`parse config.json error: ${error}`);
    process.exit(1);
  }

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
  console.log('监听文件变动中...');
  watchWithEffect(tsFiles, compileTs);
  watchWithEffect(commonFiles, copyCommonFiles);
  watchWithEffect(configFiles, copyConfigFiles);
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
    copyCommonFiles,
    copyConfigFiles,
  ),
  installNodeModules,
);
 
exports.default = series(exports.dist, successTips, auto);
 