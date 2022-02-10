import dva from 'dva';
import createLoading from 'dva-loading';
import './index.css';
import appState from './models/app';
import 'dingtalk-jsapi/entry/mobile';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(appState);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
