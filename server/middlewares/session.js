import { User } from '../models';

export default (req, res, next) => {
  const route = req.url.split('/')[1];
  if (route === 'static' || route === 'status') return next();

  let user;
  const id = req.session.uuid;
  if (id) {
    user = User.find({ query: { id }, limit: 1 });
    if (user) {
      res.locals.session = user;
      console.log(`👻 session ${user.username}`);
    } else {
      res.locals.session = undefined;
      req.session.uuid = undefined;
    }
  }

  if (!user && route !== '' && route !== 'login' && route !== 'auth') {
    return res.redirect('/login');
  }
  next();
};
