'use strict';

//import mongoose from 'mongoose';
import {registerEvents} from './appsetting.events';
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
var AppSettingSchema = new mongoose.Schema({

	headercolor:{
		type:String
	  },


	appicon:{
		type:String
	  },

	 appheaderImg:{
		type:String
	  },

	  loginImg:{
		type:String
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

registerEvents(AppSettingSchema);


export default mongoose.model('AppSetting', AppSettingSchema);

