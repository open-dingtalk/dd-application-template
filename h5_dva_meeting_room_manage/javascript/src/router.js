import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import MeetingOrdersPage from './routes/MeetingOrdersPage';
import MeetingOrderPage from './routes/MeetingOrderPage';
import MyOrderPage from './routes/MyOrderPage';
import ManagePage from './routes/ManagePage';
import meetingDetailPage from './routes/MeetingDetailPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/meetingOrders" exact component={MeetingOrdersPage} />
        <Route path="/meetingOrder/:itemId" component={MeetingOrderPage} />
        <Route path="/myOrder" exact component={MyOrderPage} />
        <Route path="/manage" exact component={ManagePage} />
        <Route path="/manage/new" exact component={meetingDetailPage} />
        <Route path="/manage/:id" exact component={meetingDetailPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
