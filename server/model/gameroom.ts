import { Schema, model } from "mongoose";

const GameSchema = new Schema({
  gameRoom: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    }
  },
  totalMachines: {
    type: Number,
    required: true
  },
  shifts: {
    type: Number,
    required: true
  }
});

const GameModel = model('GameRoom', GameSchema);

export default GameModel;