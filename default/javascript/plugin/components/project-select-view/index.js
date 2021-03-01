import { getSdk, getLifecycleSdk } from "../../api/sdk";

let i = 1;
Component({
  data: {
    arrIndex: 0,
    dataSource: [
      {
        name: "项目1",
        id: "p_1"
      },
      {
        name: "项目2",
        id: "p_2"
      }
    ]
  },
  props: {
    componentName: "",
    componentProps: {
      marginBottom: 100,
      gateWayApi: {}
    }
  },

  didMount() {
    getLifecycleSdk().didMount(this.props.componentName);
  },
  didUpdate() {
    getLifecycleSdk().didUpdate(this.props.componentName);
  },

  didUnmount() {
    getLifecycleSdk().didUnmount(this.props.componentName);
  },

  methods: {
    onPickerChange(e) {
      const arrIndex = e.detail.value;
      this.setData({
        arrIndex
      });
      const dataSource = this.data.dataSource;
      const selectedProject = dataSource[arrIndex];
      // // 选择项目，广播通知其他组件项目变更
      getSdk().triggerCustomEvent("dingtalk/changeProject", selectedProject);
    }
  }
});
