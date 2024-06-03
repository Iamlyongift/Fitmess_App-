//import { required } from "joi";
import mongoose from "mongoose";

interface UserType {
  [key: string]: string | boolean | Array<string>;
}

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    passWord: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: String, required: true },
    weight: { type: String, required: true },
    height: { type: String, required: true },
    profilePhoto: { type: String, required: true },
    fitnessGoals: { type: String, required: true },
    exercise:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "exercise"
    }]
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<UserType>("User", userSchema);

export = UserModel;
