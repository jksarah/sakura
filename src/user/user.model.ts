import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  avatar: String,
});

userSchema.index(
  {
    name: 1,
    email: 1,
  },
  { unique: true }
);

export const UserModel = mongoose.model("user", userSchema, "user");
