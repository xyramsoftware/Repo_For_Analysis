'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
var RegistrationFormSchema = new mongoose.Schema({
  
  feildName: {
  	type: String
  },

  priority:{
    type: Number
  },
  
  min:{
    type: Number
  },
  max:{
    type: Number
  },

  filekeys:{
    type: String
  },
  type: {
  	type: String
  },
   lable: {
  	type: String
  },
  
    requiredIn: {
  	type: Boolean
  },
    options: {
  	type: String
  },

  clientID: {
		type: Schema.ObjectId,
		ref: 'Client'
  },
	
    screenID: {
		type: Schema.ObjectId,
		ref: 'Screen'
  },
  screen:[],

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }

});

export default mongoose.model('RegistrationForm', RegistrationFormSchema);
