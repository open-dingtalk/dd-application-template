/**
 * 组件数据mock示例
 * 新加一个组件也这样去先读取config，然后自己用mock数据模拟
 * 记得配合xml里也加上
 */
import configChart from '../../plugin/components/chart/config.json';
import configComponentTemplate from '../../plugin/components/component-template/config.json';
import configProjectSelectView from '../../plugin/components/project-select-view/config.json';
import configStatisticalIndicatorView from '../../plugin/components/statistical-indicator-view/config.json';


/**
 * 模拟官方标准工作台的注入情况-仅模拟，非真实情况
 * @param {*} originProps 
 * @returns 
 */
const generateStandardProps = (config) => {
    const {
        props: originProps,
    } = config || {};
    const {
        useContainerStyleInStandardWorktab,
        useComponentHeadInStandardWorktab,
    } = originProps || {};

    let newProps = {};

    if (useContainerStyleInStandardWorktab) {
        newProps = {
            ...newProps,
            // 使用卡片样式时，props里会注入有viewContainerStyle样式
            viewContainerStyle: {},
        }
    }
    if (useComponentHeadInStandardWorktab) {
        newProps = {
            ...newProps,
            // 通用头部时，props里会注入ddWorkspaceComponentHead
            // 这里mock时取本地的配置，实际读的是线上配置，非本地代码，请在线上预览时测试、验证效果
            ddWorkspaceComponentHead: {
                "icon": config.icon,
                "title": config.name,
                "link": "https://www.dingtalk.com/",
                "showArrow": true,
                "manage": {
                "leftIcon": "https://gw.alicdn.com/tfs/TB1Ur0md1T2gK0jSZFvXXXnFXXa-66-66.png",
                'link': 'dingtalk://dingtalkclient/page/orginfo?orgId=xxx',
                'text': '管理',
                'rightIcon': '',
                }
            },
        }
    }

    return newProps;
};

/**
 * 开发者在这里可以修改模拟的props数据
 * 可以自行加营销态字段，塞入新的返回props等
 * 新增组件时请依葫芦画瓢
 */
export const componentsData = {
    'project-select-view': {
        componentName: configProjectSelectView.componentName, // 系统自动生成
        props: {
            ...configProjectSelectView.props,
            ...generateStandardProps(configProjectSelectView),
        }
    },

    'statistical-indicator-view': {
        pluginComponentName: 'statistical-indicator-view',
        componentName: 'statistical-indicator-view',
        props: {
            ...configStatisticalIndicatorView.props,
            ...generateStandardProps(configStatisticalIndicatorView),
            // 额外的mock数据-开发者可自行添加
            source: 1,
        }
    },
    'component-template': {
        pluginComponentName: 'component-template',
        componentName: 'component-template',
        props: {
            ...configComponentTemplate.props,
            ...generateStandardProps(configComponentTemplate),
            // mock营销态数据-可自行修改
            promotionState: 'STANDARD_WORKTAB',
            tryoutAddress: 'https://www.dingtalk.com#tryout',
        }
    },
    'chart': {
        pluginComponentName: 'chart',
        componentName: 'chart',
        props: {
            ...configChart.props,
            ...generateStandardProps(configChart),
            // mock营销态数据-可自行修改
            promotionState: 'STANDARD_WORKTAB',
            tryoutAddress: 'https://www.dingtalk.com',
        }
    }
};
