import React from 'react'
import './App.css';
import { Tabs, Grid, NavBar, Drawer, List } from 'dingtalk-design-mobile';
import exportComponent from './basicComponents'
import exportJsapiComponent from './jsapi'

const Item = List.Item;

const tabs = [
  { title: '基础组件', key: 'basicComponent' },
  { title: 'API', key: 'jsapi' },
];

const basicComponentGridData = [
  {
    icon: 'https://img.alicdn.com/imgextra/i1/O1CN01rGcU9X1by9xPcJjuK_!!6000000003533-2-tps-612-292.png',
    text: '按钮',
    id: 'button',
  },
  {
    icon: 'https://img.alicdn.com/imgextra/i4/O1CN01XC2tAb1CzesBoJrkg_!!6000000000152-2-tps-612-292.png',
    text: '动作面板',
    id: 'actionSheet',
  },
  {
    icon: 'https://img.alicdn.com/imgextra/i2/O1CN01RCiGmJ1luAfPGL35L_!!6000000004878-2-tps-612-292.png',
    text: '分段器',
    id: 'segmented',
  },
]

const jsapiListData = [
  {
    header: 'Auth',
    items: [{
      name: 'runtime.permission.requestAuthCode',
      key: 'runtime.permission.requestAuthCode',
      desc: '获取微应用免登授权码'
    }],
  },
  {
    header: 'Chat',
    items: [
      {
        name: 'biz.chat.pickConversation',
        key: 'biz.chat.pickConversation',
        desc: '获取会话信息'
      },
      {
        name: 'biz.chat.chooseConversationByCorpId',
        key: 'biz.chat.chooseConversationByCorpId',
        desc: '根据corpid选择会话'
      },
      {
        name: 'biz.chat.toConversation',
        key: 'biz.chat.toConversation',
        desc: '根据chatId跳转到对应会话'
      },
      {
        name: 'biz.chat.openSingleChat',
        key: 'biz.chat.openSingleChat',
        desc: '打开与某个用户的单聊会话'
      },
    ],
  },
  {
    header: 'Contact',
    items: [
      {
        name: 'biz.contact.chooseMobileContacts',
        key: 'biz.contact.chooseMobileContacts',
        desc: '选取手机通讯录'
      },
      {
        name: 'biz.customContact.multipleChoose',
        key: 'biz.customContact.multipleChoose',
        desc: '多选自定义联系人'
      },
      {
        name: 'biz.customContact.choose',
        key: 'biz.customContact.choose',
        desc: '单选自定义联系人'
      },
      {
        name: 'biz.contact.complexPicker',
        key: 'biz.contact.complexPicker',
        desc: '选择部门和人'
      },
      {
        name: 'biz.contact.departmentsPicker',
        key: 'biz.contact.departmentsPicker',
        desc: '选择部门信息'
      },
      {
        name: 'biz.contact.externalComplexPicker',
        key: 'biz.contact.externalComplexPicker',
        desc: '选择外部联系人'
      },
      {
        name: 'biz.contact.externalEditForm',
        key: 'biz.contact.externalEditForm',
        desc: '编辑外部联系人'
      },
      {
        name: 'biz.contact.createGroup',
        key: 'biz.contact.createGroup',
        desc: '创建企业群'
      },
    ],
  },
  {
    header: 'Device',
    items: [
      {
        name: 'device.connection.getNetworkType',
        key: 'device.connection.getNetworkType',
        desc: '获取网络类型'
      },
      {
        name: 'device.notification.vibrate',
        key: 'device.notification.vibrate',
        desc: 'device.notification.vibrate'
      },
      {
        name: 'biz.util.scan',
        key: 'biz.util.scan',
        desc: '扫条形码、二维码'
      },
      {
        name: 'device.base.getWifiStatus',
        key: 'device.base.getWifiStatus',
        desc: '获取wifi状态'
      },
      {
        name: 'device.base.getPhoneInfo',
        key: 'device.base.getPhoneInfo',
        desc: '获取手机基础信息'
      },
    ],
  },
  {
    header: 'Ding',
    items: [
      {
        name: 'biz.ding.create',
        key: 'biz.ding.create',
        desc: 'DING 2.0 发钉'
      },
    ],
  },
  {
    header: 'Drive',
    items: [
      {
        name: 'biz.cspace.saveFile',
        key: 'biz.cspace.saveFile',
        desc: '保存文件到钉盘'
      },
      {
        name: 'biz.cspace.chooseSpaceDir',
        key: 'biz.cspace.chooseSpaceDir',
        desc: '选取钉盘目录'
      },
    ],
  },
  {
    header: 'Extra',
    items: [
      {
        name: 'device.base.getUUID',
        key: 'device.base.getUUID',
        desc: '获取uuid'
      },
      {
        name: 'biz.util.previewImage',
        key: 'biz.util.previewImage',
        desc: '图片预览'
      },
    ],
  },
  {
    header: 'Location',
    items: [
      {
        name: 'device.geolocation.get',
        key: 'device.geolocation.get',
        desc: '获取当前地理位置信息（单次定位）'
      },
    ],
  },
  {
    header: 'OpenLink',
    items: [
      {
        name: 'biz.util.openLink',
        key: 'biz.util.openLink',
        desc: '打开目标页面'
      },
    ],
  },
  {
    header: 'Telephone',
    items: [
      {
        name: 'biz.telephone.showCallMenu',
        key: 'biz.telephone.showCallMenu',
        desc: '通用电话拨打'
      },
      {
        name: 'biz.telephone.checkBizCall',
        key: 'biz.telephone.checkBizCall',
        desc: '检查某企业的办公电话开通状态'
      },
    ],
  },
  {
    header: 'Util',
    items: [
      {
        name: 'biz.util.open',
        key: 'biz.util.open',
        desc: '打开应用内页面'
      },
    ],
  },
  {
    header: 'Navigation',
    items: [
      {
        name: 'biz.navigation.goBack',
        key: 'biz.navigation.goBack',
        desc: '返回上一级页面'
      },
    ],
  },
  {
    header: 'UI-dd',
    items: [
      {
        name: 'device.notification.toast',
        key: 'device.notification.toast',
        desc: 'toast'
      },
      {
        name: 'device.notification.alert',
        key: 'device.notification.alert',
        desc: 'alert'
      },
      {
        name: 'device.notification.confirm',
        key: 'device.notification.confirm',
        desc: 'confirm'
      },
      {
        name: 'device.notification.showPreloader',
        key: 'device.notification.showPreloader',
        desc: '显示加载'
      },
      {
        name: 'device.notification.actionSheet',
        key: 'device.notification.actionSheet',
        desc: 'actionsheet'
      },
      {
        name: 'biz.util.chosen',
        key: 'biz.util.chosen',
        desc: '下拉控件'
      },
      {
        name: 'biz.util.datepicker',
        key: 'biz.util.datepicker',
        desc: '日期选择器'
      },
      {
        name: 'biz.util.timepicker',
        key: 'biz.util.timepicker',
        desc: '时间选择器'
      },
      {
        name: 'biz.util.datetimepicker',
        key: 'biz.util.datetimepicker',
        desc: '日期及时间选择器'
      },
      {
        name: 'biz.calendar.chooseDateTime',
        key: 'biz.calendar.chooseDateTime',
        desc: '月历组件：选择某时间'
      },
      
    ],
  },
]

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerVisible: false,
      drawerTitle: '',
      drawerContent: null,
    }
  }
  onHandleBasicComponentGridClick = (item, index) => {
    const id = item.id;
    const Component = exportComponent[id];
    if (!Component) return;
    
    this.onHandleShowDrawer(item.text, (
      <Component></Component>
    ));
  }

  onHandleJsapiListItemClick = (item) => {
    const key = item.key;
    const Component = exportJsapiComponent[key];
    if (!Component) return;
    
    this.onHandleShowDrawer(item.name, (
      <Component></Component>
    ));
  }

  onHandleShowDrawer = (title, content) => {
    this.setState({
      drawerVisible: true,
      drawerTitle: title,
      drawerContent: content,
    });
  }

  render() {
    const {
      drawerContent,
      drawerTitle,
      drawerVisible,
    } = this.state;

    return (
      <div className="App">
        <Tabs tabs={tabs}>
          <div key="basicComponent">
            <Grid data={basicComponentGridData} columnNum={3} onClick={this.onHandleBasicComponentGridClick.bind(this)}/>
          </div>
          <div key="jsapi">
            {
              jsapiListData.map((listConfig, index) => {
                return (
                  <List key={listConfig.header} renderHeader={() => listConfig.header}>
                    {listConfig.items.map((item, idx) => {
                      return (
                        <Item
                          key={item.key}
                          arrow="horizontal"
                          brief={item.desc}
                          onClick={() => this.onHandleJsapiListItemClick(item)}
                        >
                          {item.name}
                        </Item>
                      )
                    })}
                  </List>
                )
              })
            }
          
          </div>
        </Tabs>
        <Drawer
          visible={drawerVisible}
          className="custom-drawer"
        >
          <NavBar rightContent={<div onClick={() =>this.setState({ drawerVisible: false,})}>关闭</div>}>
            <span className='drawer-title'>{drawerTitle}</span>
          </NavBar>
          {drawerContent}
      </Drawer>
    </div>
    )
  }
}

export default App;
