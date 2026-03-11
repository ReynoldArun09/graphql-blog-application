import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    categories: {
      type: [],
    },
  },
  {
    timestamps: true,
  },
);

const postModel = mongoose.model("Post", postSchema);
export default postModel;
