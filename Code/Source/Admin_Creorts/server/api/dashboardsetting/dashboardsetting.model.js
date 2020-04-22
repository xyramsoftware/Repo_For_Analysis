'use strict';

import {registerEvents} from './dashboardsetting.events';
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
var DashboardSchema = new mongoose.Schema({
	
	headercolor:{
		type:String
	  },


	 dashicon:{
		type:String
	  },

	  dashheaderImg:{
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

registerEvents(DashboardSchema);


export default mongoose.model('Dashboard', DashboardSchema);

