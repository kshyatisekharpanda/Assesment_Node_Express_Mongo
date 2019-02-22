import expect from 'expect'
import request  from 'supertest';
import {ObjectID}  from 'mongodb';

import {app} from '../server';
import {userModel} from './../models/user.model';

// Test Case created for User Register only using mochaJS and Super Test

const userData = {
  "name": "HighIam!1csc1",
  "email": "cs@cs.cs",
  "password": "55555555",
  "address": "India",
  "phone": "7749896223"
};
describe('POST /User Data', () => {
  it('should create a new user', (done) => {
    let text = 'I am here';
    request(app)
      .post('/user/userRegister')
      .send({
        userData
      })
      .expect(200)
      .expect((res) => {
        // console.log(res);
        expect(res.body.data.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        userModel.find().then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });
})


