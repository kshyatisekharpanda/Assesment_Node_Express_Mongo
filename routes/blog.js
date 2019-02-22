import express from 'express';
import * as blogControllerService from './../controllers/blogController';
import {
  authenticate
} from '../middlewares/authentication';

let router = express.Router();
router = express.Router({
  caseSensitive: false
});

//Blogs related route defination
//Define the http request's type and final end point mapping with imported methods

//'authenticate' helps to validate the access token and work as middleware.

router.post('/addBlog',authenticate, (req, res) => {
  return blogControllerService.addBlog(req, res);
});

router.put('/editBlog/:id?',authenticate, (req, res) => {
  return blogControllerService.editBlog(req, res);
});

router.delete('/deleteBlog/:id?',authenticate, (req, res) => {
  return blogControllerService.deleteBlog(req, res);
});

router.get('/getAllBlog',authenticate, (req, res) => {
  return blogControllerService.getAllBlog(req, res);
});

module.exports = router;
