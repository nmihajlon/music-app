import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      typeof: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const UserModel = new mongoose.model("User", UserSchema);
