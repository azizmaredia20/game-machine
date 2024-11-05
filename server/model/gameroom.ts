import { Schema, model } from "mongoose";

const GameRoomSchema = new Schema({
  label: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: String,
    required: true,
    unique: true,
  },
  totalMachines: {
    type: Number,
    required: true,
  },
  shifts: {
    type: Number,
    required: true,
  },
});

const GameRoomModel = model("GameRoom", GameRoomSchema);

export default GameRoomModel;
