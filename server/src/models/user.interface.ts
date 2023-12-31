import mongoose, { Model } from "mongoose";

export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: Role[];
}

const userSchema = new mongoose.Schema<User>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    roles: { type: [String], required: true, default: ["submitter"] },
  },
  {
    timestamps: true,
  }
);

export const UserModel: Model<User> = mongoose.model<User>("User", userSchema);

export type Role = "submitter" | "admin" | "reviewer" | "teamMember";
