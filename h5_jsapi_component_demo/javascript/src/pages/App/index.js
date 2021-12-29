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
      desc: '123'
    }],
  },
  {
    header: 'Chat',
    items: [
      {
        name: 'biz.chat.pickConversation',
        key: 'biz.chat.pickConversation',
        desc: '123'
      },
      {
        name: 'biz.chat.chooseConversationByCorpId',
        key: 'biz.chat.chooseConversationByCorpId',
        desc: '123'
      },
      {
        name: 'biz.chat.toConversation',
        key: 'biz.chat.toConversation',
        desc: '123'
      },
      {
        name: 'biz.chat.openSingleChat',
        key: 'biz.chat.openSingleChat',
        desc: '123'
      },
    ],
  },
  {
    header: 'Contact',
    items: [
      {
        name: 'biz.contact.chooseMobileContacts',
        key: 'biz.contact.chooseMobileContacts',
        desc: '123'
      },
      {
        name: 'biz.customContact.multipleChoose',
        key: 'biz.customContact.multipleChoose',
        desc: '123'
      },
      {
        name: 'biz.customContact.choose',
        key: 'biz.customContact.choose',
        desc: '123'
      },
      {
        name: 'biz.contact.complexPicker',
        key: 'biz.contact.complexPicker',
        desc: '123'
      },
      {
        name: 'biz.contact.departmentsPicker',
        key: 'biz.contact.departmentsPicker',
        desc: '123'
      },
      {
        name: 'biz.contact.externalComplexPicker',
        key: 'biz.contact.externalComplexPicker',
        desc: '123'
      },
      {
        name: 'biz.contact.externalEditForm',
        key: 'biz.contact.externalEditForm',
        desc: '123'
      },
      {
        name: 'biz.contact.createGroup',
        key: 'biz.contact.createGroup',
        desc: '123'
      },
    ],
  },
  {
    header: 'Device',
    items: [
      {
        name: 'device.connection.getNetworkType',
        key: 'device.connection.getNetworkType',
        desc: '123'
      },
      {
        name: 'device.notification.vibrate',
        key: 'device.notification.vibrate',
        desc: '123'
      },
      {
        name: 'biz.util.scan',
        key: 'biz.util.scan',
        desc: '123'
      },
      {
        name: 'device.base.getWifiStatus',
        key: 'device.base.getWifiStatus',
        desc: '123'
      },
      {
        name: 'device.base.getPhoneInfo',
        key: 'device.base.getPhoneInfo',
        desc: '123'
      },
    ],
  },
  {
    header: 'Ding',
    items: [
      {
        name: 'biz.ding.create',
        key: 'biz.ding.create',
        desc: '123'
      },
    ],
  },
  {
    header: 'Drive',
    items: [
      {
        name: 'biz.cspace.saveFile',
        key: 'biz.cspace.saveFile',
        desc: '123'
      },
      {
        name: 'biz.cspace.chooseSpaceDir',
        key: 'biz.cspace.chooseSpaceDir',
        desc: '123'
      },
    ],
  },
  {
    header: 'Extra',
    items: [
      {
        name: 'device.base.getUUID',
        key: 'device.base.getUUID',
        desc: '123'
      },
      {
        name: 'biz.util.previewImage',
        key: 'biz.util.previewImage',
        desc: '123'
      },
    ],
  },
  {
    header: 'Location',
    items: [
      {
        name: 'device.geolocation.get',
        key: 'device.geolocation.get',
        desc: '123'
      },
    ],
  },
  {
    header: 'OpenLink',
    items: [
      {
        name: 'biz.util.openLink',
        key: 'biz.util.openLink',
        desc: '123'
      },
    ],
  },
  {
    header: 'Telephone',
    items: [
      {
        name: 'biz.telephone.showCallMenu',
        key: 'biz.telephone.showCallMenu',
        desc: '123'
      },
      {
        name: 'biz.telephone.checkBizCall',
        key: 'biz.telephone.checkBizCall',
        desc: '123'
      },
    ],
  },
  {
    header: 'Util',
    items: [
      {
        name: 'biz.util.open',
        key: 'biz.util.open',
        desc: '123'
      },
    ],
  },
  {
    header: 'Navigation',
    items: [
      {
        name: 'biz.navigation.goBack',
        key: 'biz.navigation.goBack',
        desc: '123'
      },
    ],
  },
  {
    header: 'UI-dd',
    items: [
      {
        name: 'device.notification.toast',
        key: 'device.notification.toast',
        desc: '123'
      },
      {
        name: 'device.notification.alert',
        key: 'device.notification.alert',
        desc: '123'
      },
      {
        name: 'device.notification.confirm',
        key: 'device.notification.confirm',
        desc: '123'
      },
      {
        name: 'device.notification.showPreloader',
        key: 'device.notification.showPreloader',
        desc: '123'
      },
      {
        name: 'device.notification.actionSheet',
        key: 'device.notification.actionSheet',
        desc: '123'
      },
      {
        name: 'biz.util.chosen',
        key: 'biz.util.chosen',
        desc: '123'
      },
      {
        name: 'biz.util.datepicker',
        key: 'biz.util.datepicker',
        desc: '123'
      },
      {
        name: 'biz.util.timepicker',
        key: 'biz.util.timepicker',
        desc: '123'
      },
      {
        name: 'biz.util.datetimepicker',
        key: 'biz.util.datetimepicker',
        desc: '123'
      },
      {
        name: 'biz.calendar.chooseDateTime',
        key: 'biz.calendar.chooseDateTime',
        desc: '123'
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
    console.log(props);
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
                  <List renderHeader={() => listConfig.header}>
                    {listConfig.items.map((item, idx) => {
                      return (
                        <Item
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
