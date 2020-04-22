'use strict';
import {registerEvents} from './eventType.events';
import mongoose from 'mongoose';
import {Schema} from 'mongoose';
var EventTypeSchema = new mongoose.Schema({
 
  eventTypeName: {
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

registerEvents(EventTypeSchema);
export default mongoose.model('EventType', EventTypeSchema);
