import { Schema, model } from "mongoose";

const GameSchema = new Schema({
  storeName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  machineNo: {
    type: Number,
    required: true
  },
  currentIn: {
    type: Number,
    required: true,
  },
  currentOut: {
    type: Number,
    required: true,
  }
});

const GameModel = model('games', GameSchema);

export default GameModel;