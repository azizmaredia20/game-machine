import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
  },
  stores: {
    type: [String],
    validate: (v: string | any[]) => Array.isArray(v) && v.length > 0,
  }
});

const UserModel = model('Users', UserSchema);

export default UserModel;