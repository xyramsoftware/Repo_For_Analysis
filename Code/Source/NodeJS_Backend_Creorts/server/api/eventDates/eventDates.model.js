'use strict';
import {registerEvents} from './eventDates.events';
import mongoose from 'mongoose';
import {Schema} from 'mongoose';
var EventDateSchema = new mongoose.Schema({
 
  EventDate: {
    type: Date
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date
  }

});

registerEvents(EventDateSchema);
export default mongoose.model('EventDate', EventDateSchema);
