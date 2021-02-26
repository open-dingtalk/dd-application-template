import { getSdk, getLifecycleSdk, } from '../../api/sdk';
import config from './config.json';

interface Props {
  componentName: string;
  componentProps: (typeof config)['props'];
  config: {
    corpId: string;
  }
}

interface Data {}

interface Methods {}

Component<Props, Data, Methods>({
  data: {},
  props: {    
    componentName: '',
    componentProps: { // config.json文件中定义的props可以从componentProps中获取，这里可以设置默认值。如果有在设计器里修改，则会被新值覆盖。
      marginBottom: 0,
      gateWayApi: {},
    },
    config: {
      corpId:'', // 可以通过this.props.config.corpId 获取当前工作台用户的企业corpId
    }
  },
  didMount() {
    getLifecycleSdk().didMount(this.props.componentName);
    // 这里读到的props，和config.json文件中定义的props相对应，详见config.json文件说明
    const props = this.props.componentProps;
    // 业务代码写到下方
  },
  didUpdate() {
    getLifecycleSdk().didUpdate(this.props.componentName);
    // 业务代码写到下方
  },

  didUnmount() {
    getLifecycleSdk().didUnmount(this.props.componentName);
    // 业务代码写到下方
  },
  methods: {
  }
});
