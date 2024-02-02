import mongoose, { Schema } from "mongoose";
const subredditsSchema = new Schema({

  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    }
  ]
});

const Sub = mongoose.model("Sub", subredditsSchema);

export default Sub;
