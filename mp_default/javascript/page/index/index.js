
const app = getApp();


// 内网穿透工具介绍:
// https://open-doc.dingtalk.com/microapp/debug/ucof2g
// 替换成开发者后台设置的安全域名
const domain = 'http://localhost:3000';
const url = `${domain }/login`;

Page({
  data: {
    corpId: '',
    authCode: '',
    userId: '',
    userName: '',
    hideList: true,
  },
  loginSystem() {
    dd.showLoading();
    dd.getAuthCode({
      success: (res) => {
        this.setData({
          authCode: res.authCode,
        });
        // dd.alert({content: "step1"});
        dd.httpRequest({
          url,
          method: 'POST',
          data: {
            authCode: res.authCode,
          },
          dataType: 'json',
          success: (successResult) => {
            // dd.alert({content: "step2"});
            const { userId } = successResult.data.result;
            const { userName } = successResult.data.result;
            this.setData({
              userId,
              userName,
              hideList: false,
            });
          },
          fail: (failResult) => {
            dd.alert({ content: JSON.stringify(failResult) });
          },
          complete: () => {
            dd.hideLoading();
          },

        });
      },
      fail: (err) => {
        // dd.alert({content: "step3"});
        dd.alert({
          content: JSON.stringify(err),
        });
      },
    });
  },
  onLoad() {
    this.setData({
      corpId: app.globalData.corpId,
    });

    // dd.alert({content: "step1"});
  },
});
