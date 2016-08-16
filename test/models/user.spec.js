import { expect } from 'chai'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { User } from '../../server/models'
chai.use(chaiAsPromised)
chai.should()

describe('/models: User', () => {

  // beforeEach(() => {
  //   User.reset()
  // })

  it('Up & Running', async () => {
    expect(User).to.be.ok
  })

  it("Saves as `users` key on `common.json` file", async () => {
    expect(User).to.be.ok
    expect(User.file).to.equal('common')
    expect(User.key).to.equal('users')
  })

  it('Can save a twitter profile using the username', async () => {
    const profile = {
      username: 'soyjavi',
      displayName: 'Javi',
      _json: {
        profile_image_url: 'http://',
        description: 'Lorem Ipsum',
        time_zone: 'Madrid',
        lang: 'en'
      }
    }
    const user = User.fromTwitter(profile)

    expect(user.id).to.be.ok
    expect(user.username).to.equal(profile.username)
    expect(user.displayName).to.equal(profile.displayName)
    expect(user.avatar).to.equal(profile._json.profile_image_url)
    expect(user.description).to.equal(profile._json.description)
    expect(user.language).to.equal(profile._json.lang)
    expect(user.timezone).to.equal(profile._json.time_zone)
  })

  it('Can save a facebook profile using the id', async () => {
    const profile = {
      id: '12345678',
      displayName: 'Javi Jimenez Villar',
      profileUrl: 'http://facebook.com',
      _json: {}
    }
    const user = User.fromFacebook(profile)

    expect(user.id).to.be.ok
    expect(user.providerId).to.equal(profile.id)
    expect(user.displayName).to.equal(profile.displayName)
    expect(user.url).to.equal(profile.profileUrl)
  })

})
