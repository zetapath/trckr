import { expect } from 'chai'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import Base from '../../src/models/base'
chai.use(chaiAsPromised)
chai.should()


describe('/models: Base', () => {

  let Model
  beforeEach(() => {
    Model = new Base({ file: 'test', model: 'tests' })
    Model.reset()
  })

  it('Up & Running', async () => {
    expect(Model).to.be.ok

    expect(Model.insert).to.be.ok
    expect(Model.find).to.be.ok
    expect(Model.update).to.be.ok
    expect(Model.remove).to.be.ok
    expect(Model.reset).to.be.ok
  })

  it('Can save an item to a determinate db/model', async () => {
    const data = { username: '@soyjavi' }
    const model = Model.insert(data)

    expect(model.id).to.be.ok
    expect(model.username).to.be.equal(data.username)
    expect(model.createdAt).to.be.ok
    expect(Model.find().length).to.equal(1)
  })

  it('Can get all items in a determinate db/model', async () => {
    let i = 0
    for (i = 0; i < 10; i++) {
      Model.insert({ username: `Username ${i}` })
    }
    expect(Model.find().length).to.equal(10)
  })

  it('Can get a limit range of items in a determinate db/model', async () => {
    let i = 0
    for (i = 0; i < 10; i++) {
      Model.insert({ username: `Username ${i}` })
    }
    expect(Model.find({ limit: 5 }).length).to.equal(5)
  })

  it('Can filter items of a determinate db/model', async () => {
    let i = 0
    for (i = 0; i < 10; i++) {
      Model.insert({ username: `Username ${i}` })
    }
    const items = Model.find({ query: {username: 'Username 3'} })
    expect(items.length).to.equal(1)
    expect(items[0].username).to.equal('Username 3')
  })

  it('Can get a map of a determinate db/model', async () => {
    let i = 0
    for (i = 0; i < 10; i++) {
      Model.insert({ username: `Username ${i}` })
    }
    const items = Model.find({ field: 'username', limit: 1 })
    expect(items[0]).to.equal('Username 0')
  })

  it('Can sort items of a determinate db/model', async () => {
    let i = 0
    for (i = 0; i < 10; i++) {
      Model.insert({ username: `Username ${i}` })
    }
    const items = Model.find({ sortBy: 'id' })
    expect(items[0]).not.to.equal('Username 0')
  })

  it('Can update a item of a determinate db/model', async () => {
    const data = { username: '@soyjavi' }
    Model.insert(data)
    Model.insert({ username: 'yam' })

    const updated = Model.update({
      query: data,
      data: { displayName: 'Javi' }
    })
    const stored = Model.find({ query: data, limit: 1 })
    expect(stored[0].id).to.equal(updated.id)
    expect(stored[0].username).to.equal(updated.username)
    expect(stored[0].createdAt).to.equal(updated.createdAt)
    expect(stored[0].displayName).to.equal(updated.displayName)
    expect(stored[0].displayName).to.equal('Javi')
  })

  it('Can create an item if in on a update does not exist', async () => {
    expect(Model.find().length).to.equal(0)
    const updated = Model.update({
      query: { username: '@zetapath' },
      data: { displayName: 'Zetapath LTD' },
      upsert: true
    })

    const stored = Model.find()
    expect(stored.length).to.equal(1)
    expect(stored[0].id).to.equal(updated.id)
    expect(stored[0].displayName).to.equal(updated.displayName)
    expect(stored[0].createdAt).to.equal(updated.createdAt)
    expect(stored[0].username).not.to.be.ok
  })

  it('Can delete an item of a determinate db/model', async () => {
    let i = 0
    for (i = 0; i < 10; i++) {
      Model.insert({ username: `Username ${i}` })
    }

    const query = { username: 'Username 1' }
    Model.remove({ query })
    expect(Model.find().length).to.equal(9)
    expect(Model.find({ query }).length).to.equal(0)
  })

  it('Can reset a determinate db/model', async () => {
    let i = 0
    for (i = 0; i < 10; i++) {
      Model.insert({ username: `Username ${i}` })
    }

    Model.reset()
    expect(Model.find().length).to.equal(0)
  })
})
