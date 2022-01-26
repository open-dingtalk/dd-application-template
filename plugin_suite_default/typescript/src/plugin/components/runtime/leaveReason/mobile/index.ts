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
    this.setData({
      viewMode,
      val
    });
  },
  methods: {
    handleClick() {
      console.log('getSdk123');
      getSdk().jsapi.alert({
        message: '点击弹窗',
        title: 'title',
        buttonName: '知道了'
      });
    },
    handleInput(e: any) {
      const inputValue =  e.detail.value;
      getSdk().form.setFieldValue('leaveReason', inputValue, true);
    },
  },
});
