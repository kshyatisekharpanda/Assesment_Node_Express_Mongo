import express from 'express';
import * as commentControllerService from './../controllers/commentController';
import {
  authenticate
} from '../middlewares/authentication';

let router = express.Router();
router = express.Router({
  caseSensitive: false
});

//Comments related route defination
//Define the http request's type and final end point mapping with imported methods

//'authenticate' helps to validate the access token and work as middleware.

router.post('/addComment',authenticate, (req, res) => {
  return commentControllerService.addComment(req, res);
});

router.put('/editComment/:id?',authenticate, (req, res) => {
  return commentControllerService.editComment(req, res);
});

router.delete('/deleteComment/:id?',authenticate, (req, res) => {
  return commentControllerService.deleteComment(req, res);
});

router.post('/addLikeDislike',authenticate, (req, res) => {
  return commentControllerService.addLikeDislike(req, res);
});

module.exports = router;
