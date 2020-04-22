'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './wishlist.events';
import {Schema} from 'mongoose';
var WishlistSchema = new mongoose.Schema({
 userId:{
  	type:Schema.ObjectId,
  	ref:'User'
  },	
  eventId:{
  	type:Schema.ObjectId,
  	ref:'Events'
  },
  clientID: {
    type: Schema.ObjectId,
    ref: 'Client'
  },
  createdAt:{
  	type:Date,
  	default:Date.now
  }
});

registerEvents(WishlistSchema);
export default mongoose.model('Wishlist', WishlistSchema);
