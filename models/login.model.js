const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

//Mongooes custom schema for User Login Model
//collection - loginlogs

let UserSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },

  tokens: [{

    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]

}, {
  usePushEach: true
});

UserSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

//Helps to generate jwt token

UserSchema.methods.generateAuthToken = function () {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({
    _id: user._id.toHexString(),
    access
  }, 'abc123').toString();
  user.tokens.push({
    access,
    token
  });
  return user.save().then(() => {
    return token;
  });
};

//Helps to find the token and verify it with sending user data in request

UserSchema.statics.findByToken = function (token) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

//Helps to find the token , verify it and remove it.

UserSchema.statics.findByTokenAndRemove = function (token) {
  try {
    let User = this;
    let decoded;
    let access = '';
    let token;
    decoded = jwt.verify(token, 'abc123');
    if (decoded._id) {
      token = '';
      User.findByIdAndUpdate(decoded._id, {
        $set: {
          "tokens": token
        }
      }, {
        new: false
      }).then((todo) => {
        if (!todo) {
          return '';
        }
        return todo;
      }).catch((e) => {
        return e;
      })
    }
  } catch (e) {
    return Promise.reject();
  }
};


let loginModel = mongoose.model('loginlogs', UserSchema);

module.exports = {
  loginModel
}
