'use strict';
import mongoose from 'mongoose';
import {Schema} from 'mongoose';

var  FeedbackSchema = new mongoose.Schema({
  
  userNotification:[{}],

  rateOrganization:{
    type:String
  },

  rateEvent:{
    type:String
  },

  positiveComments:{
    type:String
  },

  negativeComments:{
    type:String
  },

  objective:{
    type:String
  },

  experience:{
    type:String
  },

  partofNextSportival:{
    type:String
  },

  userID: {
    type: Schema.ObjectId,
    ref: 'User'
  },

  userInfo:[{}],

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date
  }
});

export default mongoose.model('Feedback',  FeedbackSchema);
