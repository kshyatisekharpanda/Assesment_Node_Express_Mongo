import expect from 'expect'
import request from 'supertest';
import {
  ObjectID
} from 'mongodb';

import {
  app
} from '../server';
import {
  userModel
} from './../models/user.model';

// Test Case created for User Register only using mochaJS and Super Test

const userData = {
  "name": "HighIam!1csc1",
  "email": "cs@cssdssvddf.cs",
  "password": "55555555",
  "address": "India",
  "phone": "7749896223"
};
describe('POST /user/userRegister', () => {
  it('should create a new user', (done) => {
    request(app)
      .post('/user/userRegister')
      .send(
        userData
      )
      .expect(200)
      .expect((res) => {
        // console.log(res);
        expect(res.body.data).toBe(
          'You are successfully registered');
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
  it('should have proper data for register', (done) => {
    request(app)
      .post('/user/userRegister')
      .send({
        "Ok": "fdsfdsf"
      })
      .expect(404)
      .expect((res) => {
        // console.log(res);
        expect('').toBe(
          '');
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
})
