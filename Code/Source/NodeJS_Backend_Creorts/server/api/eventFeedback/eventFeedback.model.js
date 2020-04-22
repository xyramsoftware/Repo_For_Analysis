'use strict';
import mongoose from 'mongoose';
import {Schema} from 'mongoose';

var  EventFeedbackSchema = new mongoose.Schema({
  
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

  userID: {
    type: Schema.ObjectId,
    ref: 'User'
  },

  EventID: {
    type: Schema.ObjectId,
    ref: 'Events'
  },

  EventName: {
    type:String
  },

  userInfo:[{
    name:{
      type:String
    },
    phone:{
      type:Number
    }
  }],

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

export default mongoose.model('EventFeedback',  EventFeedbackSchema);
