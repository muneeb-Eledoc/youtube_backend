import mongoose from "mongoose";


const CommentSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    videoId: {
      type: String,
      required: true,  
    },
    comment: {
      type: String,
      required: true,  
    },
    likes:{
        type: [String],
        default: []
    },
    dislikes:{
        type: [String],
        default: []
    },
}, {timestamps: true})

export default mongoose.model('Comment', CommentSchema)