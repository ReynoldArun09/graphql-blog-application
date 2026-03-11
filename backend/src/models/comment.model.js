import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    comments: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  },
);

const commentModel = mongoose.model("Comment", commentSchema);
export default commentModel;
