import mongoose from 'mongoose';
import validator from 'validator';
import  jwt  from 'jsonwebtoken';
import _  from 'lodash';

//Mongooes custom schema for User Register Model with validation using Validator
//collection - users

let UserSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    minlength: 1
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
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
  phone: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength:10
  }
});


let userModel = mongoose.model('users', UserSchema);

module.exports = {userModel}

