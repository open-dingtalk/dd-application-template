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

    // example for “实现套件内组件之间的数据联动”
    // 处理请假时长的联动计算逻辑
    this.handleLeaveHowLong();

    // example for “实现套件内获取业务数据”
    // 根据不同的请假类型获取假期余额
    this.handleLeaveLeft();
  },
  methods: {
    // 监听请假起止时间的变化，动态计算请假时长
    handleLeaveHowLong() {
      const form = getSdk().form;
      const leaveStartTimeField = form.getFieldByBizAlias('leaveStartTime');
      const leaveEndTimeField = form.getFieldByBizAlias('leaveEndTime');
      // 初始进来需要计算一次
      this.calculateLeaveHowLong();

      // 监听起止时间变化触发重新计算
      leaveStartTimeField?.onValueChange(() => {
        this.calculateLeaveHowLong();
      });
      leaveEndTimeField?.onValueChange(() => {
        this.calculateLeaveHowLong();
      });
    },

    // 计算请假时长
    calculateLeaveHowLong() {
      const form = getSdk().form;
      const leaveHowLongField = form.getFieldByBizAlias('leaveHowLong');
      const startTime = form.getFieldValue('leaveStartTime');
      const endTime = form.getFieldValue('leaveEndTime');

      if (startTime && endTime) {
        const startStamp = new Date(startTime).getTime();
        const endStamp = new Date(endTime).getTime();
        const deltaTime = endStamp - startStamp;
        if (deltaTime > 0) {
          leaveHowLongField?.show(true);
          form.setFieldValue('leaveHowLong', this.formatHowLong(deltaTime));
        } else {
          leaveHowLongField?.hide(true);
        }
      } else {
        leaveHowLongField?.hide(true);
      }
    },

    // 格式化请假时长，小于24小时的用小时显示，大于24小时的用天显示
    formatHowLong(deltaTime: number) {
      const hours = deltaTime / 1000 / 3600;
      if (hours >= 24) {
        return `${Math.ceil(hours / 24)}天`;
      }
      return `${Math.ceil(hours)}小时`;
    },

    // 根据不同的请假类型获取假期余额
    handleLeaveLeft() {
      const form = getSdk().form;
      const leaveTypeField = form.getFieldByBizAlias('leaveType');
      // 初始化时先同步一次
      this.refreshLeaveLeft();
      // 监听请假类型变化后再刷新
      leaveTypeField?.onExtendValueChange(() => {
        this.refreshLeaveLeft();
      });
    },

    refreshLeaveLeft() {
      const form = getSdk().form;
      const spi = getSdk().spi;
      const leaveTypeField = form.getFieldByBizAlias('leaveType');
      const leaveLeftField = form.getFieldByBizAlias('leaveLeft');
      const value = leaveTypeField?.getValue();
      const extendValue = leaveTypeField?.getExtendValue();
      const key = leaveTypeField?.getProp('id');
      const bizAsyncData = [
        {
          key,
          bizAlias: 'leaveType',
          extendValue,
          value,
        },
      ];
      // 请假类型没有选择时，隐藏请假余额字段
      if (!extendValue) {
        leaveLeftField?.hide(true);
        return;
      }
      leaveLeftField?.show(true);
      // 通过数据刷新spi接口，获取不同假期类型的假期余额
      spi
        .refreshData({
          bizAsyncData,
          modifiedBizAlias: ['leaveLeft'], //要更新的是请假余额字段
        })
        .then((res:any) => {
          const leaveLeftData = find(
            res.dataList,
            item => item.bizAlias === 'leaveLeft',
          );
          const value = get(leaveLeftData, 'value');
          form.setFieldProp('leaveLeft', 'content', '假期余额：' + value);
        });
    },
  }
});
