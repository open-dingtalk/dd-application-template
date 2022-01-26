// 这个会报错，提示window不存在
// import 'dingtalk-jsapi/entry/union';
// import alert from 'dingtalk-jsapi/api/device/notification/alert';
import { getSdk } from '../../../../api/sdk';

Component({
  data: {
    viewMode: false,
    val: '',
  },
  didMount() {
    const form = getSdk().form;
    const field = form.getFieldByBizAlias('leaveReason');
    const viewMode = field?.getProp('viewMode') || false;
    const val =  field?.getValue();
    console.log('getSdk()',getSdk());
    this.setData({
      viewMode,
      val
    });
  },
  methods: {
    // handleClick() {
    //   alert({
    //     message: '点击弹窗',
    //     title: 'title',
    //     buttonName: '知道了'
    //   });
    // },
    handleClick() {
      console.log('getSdk123');
      // 
      getSdk().jsapi.alert({
        message: '点击弹窗',
        title: 'title',
        buttonName: '知道了'
      });
    },
    handleInput(e: any) {
      console.log('getSdk()',getSdk());
      const inputValue =  e.detail.value;
      getSdk().form.setFieldValue('leaveReason', inputValue, true);
    },
  },
});
