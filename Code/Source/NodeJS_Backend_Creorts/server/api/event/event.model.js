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
 
  startTime: {
    type: String
  },

  endTime: {
    type: String
  },

  sponsors: {
    type: String
  },

  speakers: {
    type: String
  },

  exhibitors: {
    type: String
  },

  location: {
    type: String
  },

  locationX: {
    type: String
  },

  locationY: {
    type: String
  },
  eventspdf: {
    type: String
  },


  EventDate: {
    type: Date
  },
  

  EventDateID: {
    type: Schema.ObjectId,
    ref: 'EventDate'
  },

  
  CategoryID: {
    type: Schema.ObjectId,
    ref: 'Category'
  },

  categoryName: {
    type: String
  },

  EventTypeID: {
    type: Schema.ObjectId,
    ref: 'EventType'
  },

  QRScanEvent: {
    type: Boolean,
    default:false
  },

  userCount: {
    type: Number,
    default:0
  },

  teamMemberCount: {
    type: Number,
    default:0
  },
  
  accompanyCount: {
    type: Number,
    default:0
  },

  ticketsCount: {
    type: Number,
    default:0
  },

  visitorsCount: {
    type: Number,
    default:0
  },
  
  EventTypeName: {
    type: String
  },

  paymentGateway: {
    type: Boolean
  },

  price: {
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

export default mongoose.model('Events',  EventsSchema);
