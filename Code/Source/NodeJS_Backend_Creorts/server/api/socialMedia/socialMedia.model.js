'use strict';
import {registerEvents} from './socialMedia.events';
import mongoose from 'mongoose';
var SocialMediaSchema = new mongoose.Schema({
  
  facebook: {
    type: Number,
    default: 0
  },

  instagram: {
    type: Number,
    default: 0
  },

  twitter: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date
  }

});

registerEvents(SocialMediaSchema);
export default mongoose.model('SocialMedia', SocialMediaSchema);
