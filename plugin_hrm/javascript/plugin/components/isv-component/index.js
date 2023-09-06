import { getSdk, getLifecycleSdk } from "../../api/sdk";

Component({
  data: {},
  props: {
    componentName: '',
    componentProps: { 
      // config.json文件中定义的props可以从componentProps中获取，这里可以设置默认值。如果外层传递的参数，可以在这里接收到
    },
  },
  didMount() {
    getLifecycleSdk().didMount(this.props.componentName);
    // 这里读到的props，和config.json文件中定义的props相对应，详见config.json文件说明
    const props = this.props.componentProps;
    // 业务代码写到下方

    // 加载数据源
    getSdk().request('getCorpIntroduce', {
      apiVersion: 1, 
      apiCorpId: 'xxx', // 数据源所在企业的corpId，一般就是开发者企业的corId
    }).then((data) => {
      console.log('=====getCorpIntroduce success', data);
    }).catch((err) => {
      console.log('=====getCorpIntroduce err', err)
    });
  },
  didUpdate(prevProps, prevData) {
    getLifecycleSdk().didUpdate(this.props.componentName);
    // 业务代码写到下方
  },
  didUnmount() {
    getLifecycleSdk().didUnmount(this.props.componentName);
    // 业务代码写到下方
  },
  methods: {}
});
