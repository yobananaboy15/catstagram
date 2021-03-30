import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    description: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
})

const Post = mongoose.model('Post', postSchema)

export default Post;