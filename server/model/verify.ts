import { Schema, model } from "mongoose";

const VerifySchema = new Schema({
  storeName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  cashFromMachines: {
    type: Number,
    required: true,
  },
  cashInHand: {
    type: Number,
    required: true,
  }
});

const VerifyModel = model('verify', VerifySchema);

export default VerifyModel;