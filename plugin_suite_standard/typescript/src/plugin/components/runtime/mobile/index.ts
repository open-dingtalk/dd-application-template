import { getSdk } from '../../../api/sdk';
import find from 'lodash/find';
import get from 'lodash/get';

Component({
  didMount() {
    const form = getSdk().form;
    const field = form.getFieldByBizAlias('leaveReason');

    // example for “使用套件的属性设置项功能”
    // 获取套件hiddenReason设置项
    const hiddenReason = form.getSuiteProp('hiddenReason');
    // 根据设置项设置请假理由控件是否展示
    if (hiddenReason) {
      field?.hide(true);
    }
    this.formDataLinkagehandler();
  },
  methods: {
    // 关联选项
    formDataLinkagehandler() {
      const form = getSdk().form;
      const leaveTypeField = form.getFieldByBizAlias('leaveType');
      const leaveReasonField = form.getFieldByBizAlias('leaveReason');

      leaveTypeField?.onExtendValueChange(option => {
        if (option.key === 'option_2') {
          console.log('option', option, leaveReasonField);
          leaveReasonField?.show(true);
        } else {
          leaveReasonField?.hide(true);
        }
      });
    },
  }
});
