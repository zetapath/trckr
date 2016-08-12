import { expect } from 'chai'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Order } from '../../src/models'
chai.use(chaiAsPromised)
chai.should()

const mock = require('./mocks/cainiao.json')

describe('/models: Order', () => {

  let session
  beforeEach(() => {
    session = { id: '1' }
    Order.reset()
  })

  it('Up & Running', async () => {
    expect(Order).to.be.ok
  })

  it("Saves as `orders` key on `common.json` file", async () => {
    expect(Order).to.be.ok
    expect(Order.file).to.equal('common')
    expect(Order.key).to.equal('orders')
  })

  it('Parse tracking info from /provider/cainiao', async () => {
    expect(Order).to.be.ok
    let order = Order.saveCainiao(mock)

    expect(order.id).to.be.ok
    expect(order.createdAt).to.be.ok
    expect(order.updatedAt).not.to.be.ok
    expect(order.provider).to.equal('cainiao')
    expect(order.trackingNumber).to.equal(mock.mailNo)
    expect(order.description).to.equal(mock.statusDesc)
    expect(order.status).to.equal(mock.status)
    expect(order.origin).to.have.all.keys('id', 'value', 'url')
    expect(order.destination).to.have.all.keys('id', 'value', 'url')
    expect(order.checkpoints).to.be.ok

    order = Order.saveCainiao(mock)
    expect(order.id).to.be.ok
    expect(order.updatedAt).to.be.ok
  })
})
