'use strict';
import {registerEvents} from './referFriends.events';
import mongoose from 'mongoose';
import {Schema} from 'mongoose';
var ReferFriendSchema = new mongoose.Schema({

  name: {
    type: String
  },

  phone: {
    type: String
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

registerEvents(ReferFriendSchema);
export default mongoose.model('ReferFriend', ReferFriendSchema);
