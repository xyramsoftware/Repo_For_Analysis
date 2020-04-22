'use strict';
import {registerEvents} from './category.events';
import mongoose from 'mongoose';
import {Schema} from 'mongoose';
var CategorySchema = new mongoose.Schema({

  categoryName: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date
  }

});

registerEvents(CategorySchema);
export default mongoose.model('Category', CategorySchema);
