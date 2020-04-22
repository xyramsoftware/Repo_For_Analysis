'use strict';
import mongoose from 'mongoose';
import {registerEvents} from './notification.events';
import {Schema} from 'mongoose';
var NotificationSchema = new mongoose.Schema({
 
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },

  UserID:{
  	type:Number
  },

  readNotification:{
    type:Boolean,
    default:false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

registerEvents(NotificationSchema);
export default mongoose.model('Notification', NotificationSchema);
