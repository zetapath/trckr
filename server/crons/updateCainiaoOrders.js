import { CronJob } from 'cron';
import { Order } from '../models';
import { cainiao } from '../providers';

const limitPerRequest = 30;

const tick = async () => {
  let store = Order.find({
    query: { provider: 'cainiao' },
    field: 'trackingNumber',
  });
  store = Array.from(new Set(store));
  console.log(`⚙/cron/cainiao ${new Date()} store: ${store.length}`);

  const requests = [];
  for (let i = 0; i < store.length; i += limitPerRequest) {
    requests.push(store.slice(i, i + limitPerRequest));
  }

  const responses = await Promise.all(requests.map((numbers) => cainiao(numbers)));
  responses.forEach((response) => response.forEach((order) => Order.cainiao(order)));
  console.log(`✅/cron/cainiao ${new Date()}`);
};

const job = new CronJob({
  cronTime: '0 */2 * * *', /* Every 2 hours */
  onTick: tick,
  onComplete: () => {
    console.log('onComplete')
  },
  runOnInit: true,
  start: true,
  timeZone: 'America/Los_Angeles',
});
