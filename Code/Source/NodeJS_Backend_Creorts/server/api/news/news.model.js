'use strict';
import mongoose from 'mongoose';
import {Schema} from 'mongoose';
var NewsSchema = new mongoose.Schema({

  title: {
  	type:String
  },

  description: {
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

export default mongoose.model('News', NewsSchema);
