'use strict';
import mongoose from 'mongoose';
import {Schema} from 'mongoose';

var AccompanyPersonSchema = new mongoose.Schema({
  userNotification: [{}],
  name: {
    type: String
  },

  relationship: {
    type: String
  },

  gender: {
    type: String
  },

  DOB: {
    type: Date
  },

  emailCheck: {
    type: Boolean
  },

  email: {
    type: String
  },

  phone: {
    type: Number
  },

  age: {
    type: Number
  },

  place: {
    type: String
  },

  occupation: {
    type: String
  },

  organisation: {
    type: String
  },

  schoolName: {
    type: String
  },


  RegisterId: {
    type: String
  },

  QRImg: {
    type: String
  },

  URL: {
    type: String
  },

  QRScanCheck: {
    type: Boolean,
    default: false
  },

  AccompanyEventList: [{
    EventId: {
      type: String
    },
    EventName: {
      type: String
    },

    QRScanCheck: {
      type: Boolean,
      default: false
    }
    
  }],

  role: {
    type: String,
    default: 'accompany'
  },
 
  userID: {
    type: Schema.ObjectId,
    ref: 'User'
  },


  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

export default mongoose.model('AccompanyPerson', AccompanyPersonSchema);
