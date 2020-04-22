'use strict';

import {registerEvents} from './carousel.events';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
var CarouselSchema = new mongoose.Schema({
  carousel: {
    type: String
  },

  CarouselID: {
    type: Number
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date
  }
});


registerEvents(CarouselSchema);
export default mongoose.model('Carousel', CarouselSchema);
