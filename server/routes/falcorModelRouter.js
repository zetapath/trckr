import Router from 'falcor-router';
import { Order } from '../models';
import { cainiao } from '../providers';

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
      route: 'order.add',
      call: async (callPath, props, fields) => {
        const info = await cainiao(props[0]);
        const order = Order.cainiao(info, res.locals.session.id, props[1]);

        return fields.map(field => {
          return ({ path: ['order', field], value: order[field] });
        });
      },
    },

  ]);
};
