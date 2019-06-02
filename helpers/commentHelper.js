import HttpStatusCode from 'http-status-codes';
import {
  ObjectID
} from 'mongodb';

import _  from 'lodash';

import {
  commentModel
} from '../models/comment.model';

import {
  likeDislikeModel
} from '../models/likeDislike.model';


/**
 * @desc Add the new comments on the individual bloggs
 * @body Accepts body data with satishfy the Custom Schema Model
 * @return status code with message
 */
const addComment = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      let bodyDatas = req.body;
      let commentData = new commentModel({
        description: bodyDatas.description,
        userId: req.user.id,
        blogId: bodyDatas.blogId,
        totalLikeCount: 0,
        totalDislikeCount:0
      });
      commentData.save().then((doc) => {
        return resolve({
          status: HttpStatusCode.OK,
          data: `Your comment has been successfully added!`
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
 * @desc Edit the comment by id
 * @query Accepts id by query string
 * @return status code with message
 */
const editComment = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      let id = req.query.id;
      var body = _.pick(req.body, ['description']);
      commentModel.findByIdAndUpdate(id, { $set: body}, { new: false }).then((docs) => {
        if (!docs) {
          return reject({
            status: HttpStatusCode.NOT_FOUND,
            data: 'Not Found'
          });
        }
        return resolve({
              status: HttpStatusCode.OK,
              data: `Your comment has been successfully updated!`
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
 * @desc delete the comment by id
 * @query Accepts id by query string
 * @return status code with message
 */
const deleteComment = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      let id = req.query.id;
      if (!ObjectID.isValid(id)) {
        return resolve({
          status: HttpStatusCode.INTERNAL_SERVER_ERROR,
          data: 'Invalid Object Id'
        });
      }
      commentModel.findByIdAndRemove(id).then((response) => {
        console.log(response);
        return resolve({
          status: HttpStatusCode.OK,
          data: `Your comment has been removed!`
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
 * @desc Update the like and dislike count for each comments by id
 * @query Accepts comment id by query string
 * @body Accepts the isLike property with boolean type
 * @return status code with message
 */
const addLikeDislike = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      let commentId = req.query.id;
      const { isLike, blogId, userId } = req.body;
      var body = _.pick(req.body, ['isLike', 'totalLikeCount', 'totalDislikeCount']);
      if (!ObjectID.isValid(commentId)) {
        return resolve({
          status: HttpStatusCode.INTERNAL_SERVER_ERROR,
          data: 'Invalid Object Id'
        });
      }
      console.log(isLike, blogId, userId, commentId);
      let likeDislikeData = new likeDislikeModel({
        commentId: commentId,
        blogId: blogId,
        userId: userId,
        isLike: isLike
      });
      likeDislikeModel.find({
        'commentId': commentId,
        'blogId': blogId,
        'userId': userId
      }, (err, docs) => {

        var isValid = docs;
        if (isValid.length === 0) {
          likeDislikeData.save().then((res) => {
            if (res.length === 1) {
              commentModel.findById(id).then((doc) => {
                if (doc) {
                  if (doc.isLike == true) {
                    doc.totalLikeCount = doc.totalLikeCount + 1;
                  }
                  else {
                    doc.totalLikeCount = (doc.totalLikeCount) - 1;
                  }
                  commentModel.findByIdAndUpdate(id, { $set: doc }, { new: false }).then((totalUpdated) => {
                    if (!totalUpdated) {
                      return reject({
                        status: HttpStatusCode.NOT_FOUND,
                        data: 'Not Found'
                      });
                    }
                    return resolve({
                      status: HttpStatusCode.OK,
                      data: `Your like/dislike has been updated!`
                    });

                  }).catch((e) => {
                    return reject({
                      status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                      data: e.message
                    });
                  })
                }
                else {
                  return resolve({
                    status: HttpStatusCode.OK,
                    data: 'Data is not available as expected!'
                  });
                }
              }, (e) => {
                return reject({
                  status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                  data: e.message
                });
              });

            }
            console.log(res);
          }).catch((e) => {
            return reject({
              status: HttpStatusCode.INTERNAL_SERVER_ERROR,
              data: e.message
            });
          })
        } else {
          if (isValid.length === 1) {
            console.log(JSON.stringify(isValid[0]._id));
            likeDislikeModel.findByIdAndUpdate(isValid[0]._id, { $set: { 'isLike': isLike } }, { new: false }).then((newTotalUpdated) => {
              console.log(newTotalUpdated);
              if (!newTotalUpdated) {
                return reject({
                  status: HttpStatusCode.NOT_FOUND,
                  data: 'Not Found'
                });
              }
              return resolve({
                status: HttpStatusCode.OK,
                data: 'Your like/dislike has been updated!'
              });
            })
          }

          // return resolve({
          //   status: HttpStatusCode.NOT_FOUND,
          //   data: 'Invalid Request'
          // });
        }
      })


    } catch (e) {
      return reject({
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        data: e.message
      });
    }
  })
}

export {
  addComment,
  editComment,
  deleteComment,
  addLikeDislike
}
