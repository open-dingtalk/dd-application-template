const PROMOTION_STATE_TRYOUT = 'STANDARD_WORKTAB';

/**
 * 示例组件，模拟官方的标题实现方式
 */
Component({
    props: {
        className: '',
        config: {},
        titleBarModel: {},
    },
    data: {
        PROMOTION_STATE_TRYOUT,
    },
    didMount() {},
    didUpdate() {},
    methods: {
        onTitleClick() {
            const {
                titleBarModel,
                componentProps = {},
            } = this.props;
            const {
                link = '',
            } = titleBarModel || {};
            const {
                // 营销态标记
                promotionState,
                // 营销态地址
                tryoutAddress = '',
            } = componentProps;
            
            if (promotionState === PROMOTION_STATE_TRYOUT) {
                if (tryoutAddress) {
                    dd.alert({
                        content: `打开营销态地址：${tryoutAddress}`,
                    });
                }
                return;
            }
            dd.alert({
                content: `打开标题地址：${link}`,
            });
            console.log('点击标题：', link);
        },
        onManageClick() {
            const {
                titleBarModel = {},
            } = this.props;
            const {
                manage = {},
            } = titleBarModel;
            const {
                link = '',
            } = manage;

            dd.alert({
                content: `打开管理地址：${link}`,
            });
            console.log('点击管理：', link);
        },
    },
});