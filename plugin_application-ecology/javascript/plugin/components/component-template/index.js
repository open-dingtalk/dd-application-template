import { getSdk, getLifecycleSdk, } from '../../api/sdk';

const PROMOTION_STATE_TRYOUT = 'STANDARD_WORKTAB';

Component({
  data: {},
  props: {    
    componentName: '',
    componentProps: { // config.json文件中定义的props可以从componentProps中获取，这里可以设置默认值。如果有在设计器里修改，则会被新值覆盖。

    },
    config: {
      corpId:'', // 可以通过this.props.config.corpId 获取当前工作台用户的企业corpId
    }
  },
  async didMount() {
    getLifecycleSdk().didMount(this.props.componentName);
    // 这里读到的props，和config.json文件中定义的props相对应，详见config.json文件说明
    const props = this.props.componentProps;
    // 业务代码写到下方
    // 注意，这里的this，用的是箭头函数，所以内部的this就是指向didMount里的this
    // 如果不是箭头函数，需要主动bind(this)
    this.onShowListener = () => {
        console.log('监听到onShow');
        // 一般onShow里可以进行刷新接口数据等操作-注意后端别被打爆
    };
    getSdk().listenCustomEvent('onShow', this.onShowListener);

    // sdk请求时需要try catch
    try {
        /**
         * 请求数据源
         * 线上会通过网关请求config里绑定的真实数据源，如这里时gateWayApi会绑定成httpbin
         * ide里会直接请求（不通过网关）第三个参数里的数据
         */
        const data = await getSdk().request(this.props.componentProps.gateWayApi, '', {        
          url: 'http://httpbin.org/get',
          apiKey: 'httpbin',
          httpMethod: 'GET',       
          params: '',        
          apiSecret: '11',
          system: {
            userid: 'zhangdan',
            corpId: 'dingd07aef772fd2b897',
          },
        });
      this.setData({
        successsContent: `请求成功: ${JSON.stringify(data)}`
      });
      console.log('数据请求成功:', data);
  } catch (error) {
    this.setData({
        errorContent: `请求失败：${JSON.stringify(error)}`,
    });
    console.log('数据请求error:', error);
  }
  },
  didUpdate(prevProps) {
    getLifecycleSdk().didUpdate(this.props.componentName);
    // 业务代码写到下方
    // 营销态的数据是props.componentProps.promotionState，注意嵌套层级
    if (prevProps.componentProps.promotionState !== this.props.componentProps.promotionState) {
        // 营销态状态变更，一般变更后也可刷新插件数据
        // 变更频率不会很高，只会在营销态和非营销态切换时用到
        console.log('营销态状态变更，当前状态:', this.props.componentProps.promotionState);
    }
  },

  didUnmount() {
    getLifecycleSdk().didUnmount(this.props.componentName);
    // 业务代码写到下方
    getSdk().removeCustomEvent('onShow', this.onShowListener);
  },
  methods: {
    onContentClick() {
        // 营销态时，需要打开tryoutAddress，其余时候正常打开（一般与应用相关，插件自行处理）
        if (this.props.componentProps.promotionState === PROMOTION_STATE_TRYOUT) {
            console.log('打开营销态：', this.props.componentProps.tryoutAddress);
            getSdk().openApp({
                url: this.props.componentProps.tryoutAddress,
            });
            return;
        }
        // 插件自己正常情况下改打开的地址，这里仅模拟mock数据
        const appAddress = 'https://www.dingtalk.com';
        console.log('打开应用内地址：', appAddress);
        getSdk().openApp({
            url: appAddress,
        });
    }

  }
});
