import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import { initScript } from 'dingtalk-docs-cool-app';

function App() {
  useEffect(() => {
    initScript({ scriptUrl: new URL('/static/js/script.code.js', window.location.href) });
  }, []);
  return null;
}

const root = ReactDOM.createRoot(document.getElementById('root_script'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);