import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import LayoutHome from './components/layout/home';
import LayoutOrders from './components/layout/orders';
import LayoutError from './components/layout/404';
// import 'normalize';
import 'react-toolbox/lib/commons.css';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={LayoutHome}/>
    <Route path='orders' component={LayoutOrders} />
    <Route path='*' component={LayoutError}/>
  </Router>
), document.getElementById('react-app'))


// ReactDOM.render((
//   <Router history={browserHistory}>
//     <Route path='/' component={LayoutApp}>
//       <IndexRoute component={LayoutLanding} />
//       <Route path='signin' component={LayoutUnknown}/>
//       <Route path='orders' component={LayoutUnknown} />
//       <Route path='orders/:serie' component={LayoutUnknown} />
//       <Route path='order/:id' component={LayoutUnknown} />
//       <Route path='*' component={LayoutUnknown}/>
//     </Route>
//   </Router>
// ), document.getElementById('react-app'))
