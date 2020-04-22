'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
var QRcodeSchema = new mongoose.Schema({

QRcode:[
  {
  

  value: {
    type: String,
    default:""
  },
  lable: {
  	type: String
  },
  
}],

clientID: {
  type: Schema.ObjectId,
  ref: 'Client'
},

  createdAt: {
    type: Date,
    default: Date.now
  }
  

});

export default mongoose.model('QRcode', QRcodeSchema);
