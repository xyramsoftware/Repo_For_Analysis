'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';

var  EventsSchema = new mongoose.Schema({

  title: {
    type: String
  },

  description: {
    type: String
  },
 
  EventTimings: {
    type: String
  },
  location: {
    type: String
  },
  EventDate: {
    type: Date
  },

  clientID: {
    type: Schema.ObjectId,
    ref: 'Client'
  },
 
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

export default mongoose.model('Events',  EventsSchema);
