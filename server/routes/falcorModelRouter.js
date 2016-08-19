import Router from 'falcor-router';
import { Order } from '../models';

export default (req, res) => {
  return new Router([
    // -- Static
    {
      route: 'greeting',
      get: () => ({ path: ['greeting'], value: 'Hello World' })
    },

    // -- Basic
    {
      route: 'orders',
      get: () => {
        const orders = Order.find({ query: { user: res.locals.session.id } });
        return [
          {
            path: ['orders'],
            value: orders,
          },
          {
            path: ['orders', 'length'],
            value: orders.length,
          },
        ];
      },
    },

    // -- Non existent properties
    {
      route: 'orders.length',
      get: () => ({ path: ['orders', 'length'], value: Order.find().length })
    },

    // -- Multiple paths
    {
      route: "orders.['provider', 'createdAt']",
      // route: "orders[{keys}]",
      get: (pathSet) => {
        return pathSet[1].map((key) => {
          return {
            path: ['orders', key],
            value: Order.find({ query: { user: res.locals.session.id } })[0][key],
          };
        });
      },
    },

    // -- By Id
    {
      route: 'order[{keys:ids}]',
      get: (pathSet) => {
        return pathSet.ids.map((id) => {
          return {
            path: ['order', id],
            value: Order.find({ query: { id }, limit: 1 })
          };
        });
      },
    },

    // -- Add
    {
      route: 'orders.add',
      call: (callPath, args) => {
        const newName = args[0];
        const orders = [];
        orders.push({ name: newName });
        return [
          {
            path: ['orders', orders.length - 1, 'name'],
            value: newName,
          },
          {
            path: ['orders', 'length'],
            value: orders.length,
          },
        ];
      },
    },
  ]);
};
