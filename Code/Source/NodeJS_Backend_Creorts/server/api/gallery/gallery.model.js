'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';
var GallerySchema = new mongoose.Schema({

  images: {
  	type:String
  },

  title: {
  	type:String
  },

  URL: {
  	type:String
  },
 
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: { 
    type: Date 
  }
});

export default mongoose.model('Gallery', GallerySchema);
