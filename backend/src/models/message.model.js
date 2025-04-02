import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    // ClerkID
    senderId: {
      typeof: String,
      required: true,
    },
    // ClerkID
    receiverId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Message = new mongoose.model("Message", MessageSchema);
