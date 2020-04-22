'use strict';

import {registerEvents} from './aboutus.events';
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
var AboutUsSchema = new mongoose.Schema({

	aboutImg:{
	 type:String	
	},

	content:{
		type:String	
	},

	email: {
	 type: String,
	 lowercase: true
	  },
	
	phoneNo: {
	 type:Number
	  },
 
	location:{
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


registerEvents(AboutUsSchema);

export default mongoose.model('AboutUs', AboutUsSchema);