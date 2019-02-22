import express from 'express';
import * as userControllerService from './../controllers/userController';

let router = express.Router();
router = express.Router({
  caseSensitive: false
});

//Users related route defination
//Define the http request's type and final end point mapping with imported methods

router.post('/userRegister', (req, res) => {
  return userControllerService.userRegister(req, res);
});

router.post('/userLogin', (req, res) => {
  return userControllerService.userLogin(req, res);
});

router.post('/userLogout', (req, res) => {
  return userControllerService.userLogout(req, res);
});


module.exports = router;
