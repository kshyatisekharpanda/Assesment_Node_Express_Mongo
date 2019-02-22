
import {loginModel} from '../models/login.model';


/**
 * @desc Middleware function which helps to validate the token.
 * @header Accepts JWT access token as x-auth
 * @return  promise and callback to the root function by next()
 */

const authenticate = (req, res, next) => {
  let token = req.header('x-auth');

  loginModel.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    console.log(req.token);
    next();
  }).catch((e) => {
    return Promise.reject();
  });
};

module.exports = {authenticate};
