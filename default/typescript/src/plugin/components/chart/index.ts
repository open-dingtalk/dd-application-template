import { getSdk, getLifecycleSdk } from "../../api/sdk";
import config from './config.json';

interface Props {
  componentName: string;
  componentProps: (typeof config)['props'];
  config: {
    corpId: string;
  }
}

interface Data {}

interface Methods {
  onInitChart: (f2: any, config: {
    context: any;
    width: number;
    height: number;
    pixelRatio: number;
  }, ref: any) => void;
}

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
  },
  didUpdate(prevProps, prevData) {
    getLifecycleSdk().didUpdate(this.props.componentName);
  },
  didUnmount() {
    getLifecycleSdk().didUnmount(this.props.componentName);
  },
  methods: {
    onInitChart(F2, config) {
      const chart = new F2.Chart(config);
      const data = [
        { value: 63.4, city: 'New York', date: '2011-10-01' },
        { value: 62.7, city: 'Alaska', date: '2011-10-01' },
        { value: 72.2, city: 'Austin', date: '2011-10-01' },
        { value: 58, city: 'New York', date: '2011-10-02' },
        { value: 59.9, city: 'Alaska', date: '2011-10-02' },
        { value: 67.7, city: 'Austin', date: '2011-10-02' },
        { value: 53.3, city: 'New York', date: '2011-10-03' },
        { value: 59.1, city: 'Alaska', date: '2011-10-03' },
        { value: 69.4, city: 'Austin', date: '2011-10-03' },
      ];
      chart.source(data, {
        date: {
          range: [0, 1],
          type: 'timeCat',
          mask: 'MM-DD'
        },
        value: {
          max: 300,
          tickCount: 4
        }
      });
      chart.area().position('date*value').color('city').adjust('stack');
      chart.line().position('date*value').color('city').adjust('stack');
      chart.render();
      // 注意：需要把chart return 出来
      return chart;
    }
  }
});
