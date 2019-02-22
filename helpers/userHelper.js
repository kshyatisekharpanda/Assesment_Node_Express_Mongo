import HttpStatusCode from 'http-status-codes';
import {
  userModel
} from '../models/user.model';
import {
  ObjectID
} from 'mongodb';


import {
  loginModel
} from '../models/login.model';

/**
 * @desc Add the new User Data
 * @body Accepts body data with satishfy the Custom Schema
 * @return status code with message
 */
const userRegister = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      let bodyDatas = req.body;
      let user = new userModel({
        name: bodyDatas.name,
        email: bodyDatas.email,
        password: bodyDatas.password,
        address: 'India',
        phone: bodyDatas.phone
      });
      // console.log(user);
      user.save().then((doc) => {
        return resolve({
          status: HttpStatusCode.OK,
          data: `You are successfully registered`
        });
      }, (e) => {
        return reject({
          status: HttpStatusCode.INTERNAL_SERVER_ERROR,
          data: e.message
        });
      });
    } catch (e) {
      return reject({
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        data: e.message
      });
    }
  })
}


/**
 * @desc Check the user email and password and save in the separate log with token for each time.
 * @body Accepts body data with satishfy the Custom Schema
 * @return status code with message
 */
const userLogin = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      let isValid;
      let bodyDatas = req.body;
      let loginData = new loginModel({
        email: bodyDatas.email,
        password: bodyDatas.password
      });
      // console.log(user);
      userModel.find({
        'email': loginData.email,
        'password': loginData.password
      }, (err, docs) => {
        console.log(docs.name);
        isValid = docs;
        if (isValid.length == 1) {
          loginData.save().then(() => {
            // console.log(user);
            return loginData.generateAuthToken();
          }).then((token) => {
            return resolve({
              status: HttpStatusCode.OK,
              data: token
            });
          }).catch((e) => {
            return reject({
              status: HttpStatusCode.INTERNAL_SERVER_ERROR,
              data: e.message
            });
          })
        } else {
          return resolve({
            status: HttpStatusCode.NOT_FOUND,
            data: 'Invalid Username or Password'
          });
        }
      })
    } catch (e) {
      return resolve({
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        data: e
      });
    }
  })
}


/**
 * @desc Logout the logged in user with removing the token
 * @body Accepts body data with satishfy the Custom Schema
 * @return status code with message
 */
const userLogout = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let token = req.header('x-auth');
      loginModel.find({
        'tokens.token': token
      }, (err, docs) => {
        if (docs.length == 1) {
          loginModel.findByIdAndUpdate(docs[0].id, {
            $set: {
              "tokens": null
            }
          }, {
            new: false
          }, (err, doc) => {
            if (err) {
              return resolve({
                status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                data: err.message
              });
            }
            return resolve({
              status: HttpStatusCode.OK,
              data: 'You are successfully logout!'
            });
          });
        } else {
          return resolve({
            status: HttpStatusCode.NOT_FOUND,
            data: 'Please set valid token!'
          });
        }
      })
    } catch (e) {
      return reject({
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        data: e
      });
    }
  })
}

export {
  userRegister,
  userLogin,
  userLogout
}
