import { getSdk, getLifecycleSdk, } from '../../api/sdk';

const dataMap = {
  'p_1': [{
    name: '项目1今日',
    value: 100
  }, {
    name: '项目1昨日',
    value: 95
  }],
  'p_2': [{
    name: '项目2今日',
    value: 200
  }, {
    name: '项目1昨日',
    value: 180
  }]
};

Component({
  data: {
    dataSource: dataMap['p_1'],
  },
  props: {
    componentName: '',
    componentProps: {
      marginBottom: 100,
      gateWayApi: {},
    },
  },
  didMount() {
    getLifecycleSdk().didMount(this.props.componentName);

    this.changeProject = (selectedProject) => {
      // 发送请求，根据项目获取指标数据
      this.setData({
        dataSource: dataMap[selectedProject.id],
      });
    };
    // 监听项目变更事件 来自 project-select-view
    getSdk().listenCustomEvent('dingtalk/changeProject', this.changeProject);
  },
  didUpdate(prevProps, prevData) {
    getLifecycleSdk().didUpdate(this.props.componentName);
  },
  didUnmount() {
    getLifecycleSdk().didUnmount(this.props.componentName);
    getSdk().removeCustomEvent('dingtalk/changeProject', this.changeProject);
  },
  methods: {}
});
