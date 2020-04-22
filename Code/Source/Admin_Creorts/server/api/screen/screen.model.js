'use strict';
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
var ScreenSchema = new mongoose.Schema({
 
  screenTitle: {
  	type: String
  },
  screenNo: {
  	type: Number
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

export default mongoose.model('Screen', ScreenSchema);
