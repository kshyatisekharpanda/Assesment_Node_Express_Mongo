import mongoose from 'mongoose';
import _  from 'lodash';

//Mongooes custom schema for Comment Model
//collection - blogdetails

let blogSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    unique:true,
    minlength: 1
  },
  description: {
    type: String,
    require: true,
    minlength: 1,
    maxlength:500
  },
  creatorId: {
    type: String,
    require: true
  }
});


let blogModel = mongoose.model('blogdetails', blogSchema);

module.exports = {blogModel}


