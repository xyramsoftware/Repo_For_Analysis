'use strict';

//import mongoose from 'mongoose';
import {registerEvents} from './carousel.events';
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
var CarouselSchema = new mongoose.Schema({

	carousel:{
		type:String
	
	},
	title:{
		type:String
	
	},
	description:{
		type:String
	
	},
	titlecheckbox :{
    type: Boolean,
    default:true
  },
	descriptioncheckbox :{
    type: Boolean,
    default:true
  },
	
	CarouselID: {
	  type:Number
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


registerEvents(CarouselSchema);


export default mongoose.model('Carousel', CarouselSchema);