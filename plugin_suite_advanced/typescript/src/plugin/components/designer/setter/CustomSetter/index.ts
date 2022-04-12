import { getSetterSdk } from '../../../../api/sdk';

Component({
  data: {
    checked: false,
    label: false,
  },
  didMount() {
    const sdk = getSetterSdk();
    const props = sdk?.getFieldProps('leaveReason') ;
    this.setData({
      checked: props.hidden || false,
      label: props.label || '',
    })
  },
  methods: {
    switchChange(e:any) {
      const value = e.detail.value;
      const sdk = getSetterSdk();
      sdk?.setFieldProps('leaveReason', {
        hidden: value,
      });
      this.setData({
        checked: value,
      })
    },
  },
});
