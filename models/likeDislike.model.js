import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

//Mongooes custom schema for Like-Dislike Log Model with validation using Validator
//collection - likedislike

let LikeDislikeSchema = new mongoose.Schema({
    commentId: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    blogId: {
        type: String,
        require: true
    },
    isLike: {
        type: Boolean,
        require: true
    },
});


let likeDislikeModel = mongoose.model('likedislike', LikeDislikeSchema);

module.exports = { likeDislikeModel }

