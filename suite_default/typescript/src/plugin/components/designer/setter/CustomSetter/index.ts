import { getSdk } from '../../../../api/sdk';

Component({
  props: {
    name: '',
    age: '',
  },
  data: {
    count: 2,
    leavename: '',
  },
  didMount() {
    // h5pro 已经做好了沙盒隔离
    // window.a = 1;
    // alert(1);
    // console.log('mini window', window);
  },
  methods: {
    onClick() {
      const { count } = this.data;
      this.setData({
        count: count + 1,
      });

      getSdk().form.setFieldValue('leavename', 'jamesxu' + Date.now());
      const val = 'common value' + Date.now();
      getSdk().form.setFieldValue('leaveReason', val, true);
      this.setData({
        leavename: val,
      });
    },
  },
});
