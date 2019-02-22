import mongoose from 'mongoose';

//Connection file for connecting mongoDB

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost:27017/BlogApp', { useMongoClient: true })

module.exports = { mongoose };
