import HttpStatusCode from 'http-status-codes';
import {
  userModel
} from '../models/user.model';
import {
  ObjectID
} from 'mongodb';

import _ from 'lodash';
import {
  loginModel
} from '../models/login.model';
import {
  blogModel
} from '../models/blog.model';


/**
 * @desc Add the new blog with CreatorID
 * @body Accepts body data with satishfy the Custom Schema
 * @return status code with message
 */
const addBlog = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      let bodyDatas = req.body;
      let blogData = new blogModel({
        name: bodyDatas.name,
        description: bodyDatas.description,
        creatorId: req.user.id
      });
      // console.log(user);
      blogData.save().then((doc) => {
        return resolve({
          status: HttpStatusCode.OK,
          data: `Your blog has been successfully saved!`
        });
      }, (e) => {
        return reject({
          status: HttpStatusCode.INTERNAL_SERVER_ERROR,
          message: e.message
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
 * @desc Edit the blog by id
 * @query Accepts id by query string
 * @return status code with message
 */
const editBlog = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      let id = req.query.id;
      var body = _.pick(req.body, ['name', 'description']);
      blogModel.findByIdAndUpdate(id, {
        $set: body
      }, {
        new: false
      }).then((docs) => {
        if (!docs) {
          return reject({
            status: HttpStatusCode.NOT_FOUND,
            data: 'Not Found'
          });
        }
        return resolve({
          status: HttpStatusCode.OK,
          data: `Your blog has been successfully updated!`
        });

      }).catch((e) => {
        return reject({
          status: HttpStatusCode.INTERNAL_SERVER_ERROR,
          data: e.message
        });
      })
    } catch (e) {
      return reject({
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        data: e.message
      });
    }
  })
}

/**
 * @desc Delete the blog by id
 * @query Accepts id by query string
 * @return status code with message
 */

const deleteBlog = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      let id = req.query.id;
      if (!ObjectID.isValid(id)) {
        return resolve({
          status: HttpStatusCode.INTERNAL_SERVER_ERROR,
          data: 'Invalid Object Id'
        });
      }
      blogModel.findByIdAndRemove(id).then((response) => {
        console.log(response);
        return resolve({
          status: HttpStatusCode.OK,
          data: `Your blog has been removed!`
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
 * @desc Get all the blog
 * @return status code with message
 */

const getAllBlog = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      blogModel.find().then((doc) => {
        return resolve({
          status: HttpStatusCode.OK,
          data: doc
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

export {
  addBlog,
  editBlog,
  deleteBlog,
  getAllBlog
}
