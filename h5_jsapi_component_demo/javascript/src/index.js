import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import Template from './pages/Template';
import reportWebVitals from './reportWebVitals';
import {
  Routes,
  Route,
  HashRouter,
  Link
} from "react-router-dom";
import { TabBar } from 'dingtalk-design-mobile';

const tabs = [
  {
    key: '',
    title: '首页',
    badge: '',
  },
  {
    key: 'template',
    title: '模版页',
    badge: '',
  },
];

ReactDOM.render(
  <React.StrictMode>
    {/* <Routes history={createHashHistory()}>
      <Route path="/" component={App}></Route>
      <Route path="/about" component={<h2>about</h2>}></Route>
  </Routes> */}
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/template" element={<Template />}></Route>
      </Routes>
      <div style={{
        width: '100%',
        position: 'fixed',
        bottom: 0
      }}>
      <TabBar 
        maxLineItems={tabs.length}
      >
        {
          tabs.map(item => (
            <TabBar.Item key={item.key} title={<Link to={item.key}>{item.title}</Link>} badge={item.badge}/>
          ))
        }
      </TabBar>
    </div>
    </HashRouter>,
    
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();