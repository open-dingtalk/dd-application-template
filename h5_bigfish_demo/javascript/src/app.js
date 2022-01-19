import * as dd from 'dingtalk-jsapi';

window.dd = dd;

const init = oldRender => {
  oldRender();
};

export function render(oldRender) {
  init(oldRender);
}

export const dva = {
  config: {
    onError: () => {},
  },
};
