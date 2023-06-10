import mongoose, { Model } from "mongoose";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

const userSchema = new mongoose.Schema<User>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, required: true, default: 'member' },
  },
  {
    timestamps: true,
  }
);

export const UserModel: Model<User> = mongoose.model<User>("User", userSchema);
