import mongoose from 'mongoose';
import _  from 'lodash';


//Mongooes custom schema for Comment Model
//collection - commentdetails

let commentSchema = new mongoose.Schema({
    description: {
    type: String,
    required: true,
    unique:true,
    minlength: 1,
    maxlength:500
  },
  userId: {
    type: String,
    require: true
  },
  blogId: {
    type: String,
    require: true
  },
  totalLikeCount: {
    type: Number
  },
  totalDislikeCount: {
    type: Number
  }
});

let commentModel = mongoose.model('commentdetails', commentSchema);

module.exports = {commentModel}


