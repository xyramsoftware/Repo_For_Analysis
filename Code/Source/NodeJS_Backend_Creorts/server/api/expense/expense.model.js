'use strict';
import {registerEvents} from './expense.events';
import mongoose from 'mongoose';
import {Schema} from 'mongoose';
var ExpenseSchema = new mongoose.Schema({
 
  ExpenseItem: {
    type: String
  },

  Date: {
    type: Date
  },

  InvoiceNo: {
    type: String
  },

  RecorderBy: {
    type: String
  },

  expenseImg: {
    type: String
  },

  Amount: {
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

registerEvents(ExpenseSchema);
export default mongoose.model('Expense', ExpenseSchema);
