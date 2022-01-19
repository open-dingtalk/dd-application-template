import routes from './router.config';

export default {
  singular: true,
  deployMode: 'assets',
  appType: 'site',
  runtimePublicPath: true,
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },

  // 接口代理配置
  proxy: {
    '/mock': {
      target: '',
      changeOrigin: true,
    },
  },

  dynamicImport: {
    loading: '@/component/Loading',
  },

  routes,
  favicon: 'https://i.alipayobjects.com/common/favicon/favicon.ico',
  ctoken: true,
  locale: {},

  dva: {},
};
