import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import Error404 from './components/404';
import App from './components/app';
import Home from './components/home';
import Order from './components/order';
import Orders from './components/orders';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='orders' component={Orders} />
      <Route path='order/:id' component={Order} />
      <Route path='*' component={Error404}/>
    </Route>
  </Router>
), document.getElementById('react-app'))
