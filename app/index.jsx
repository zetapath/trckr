import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import LayoutHome from './components/layout/home';
import LayoutApp from './components/layout/app';
import LayoutOrders from './components/layout/orders';
import LayoutOrder from './components/layout/order';
import LayoutError from './components/layout/404';
import session from './modules/session'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={LayoutApp} session={session}>
      <IndexRoute component={LayoutHome} />
      <Route path='orders' component={LayoutOrders} />
      <Route path='order/:id' component={LayoutOrder} />
      <Route path='*' component={LayoutError}/>
    </Route>
  </Router>
), document.getElementById('react-app'))
