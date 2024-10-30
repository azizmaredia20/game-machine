import { Schema, model } from "mongoose";

const ExpensesSchema = new Schema({
  storeName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  shiftNo: {
    type: Number,
    required: true
  },
  employeePay: {
    type: Number,
    required: true,
  },
  ownerPay: {
    type: Number,
    required: true,
  },
  tickets: {
    type: Number,
    required: true,
  },
  match: {
    type: Number,
    required: true,
  },
  securityPay: {
    type: Number,
    required: true,
  },
  foodExpense: {
    type: Number,
    required: true,
  },
  drawingExpense: {
    type: Number,
    required: true,
  },
  groceryExpense: {
    type: Number,
    required: true,
  },
  otherExpense: {
    type: Number,
    required: true,
  },
  otherExpenseComments: {
    type: String,
    required: true,
  }
});

const ExpensesModel = model('Expenses', ExpensesSchema);

export default ExpensesModel;