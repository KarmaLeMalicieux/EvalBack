import mongoose, { Schema } from "mongoose";
const postSchema = new Schema({

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  
  }, {timestamps: true});

const Post = mongoose.model("Post", postSchema);

export default Post;
