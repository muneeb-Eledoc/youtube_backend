import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    img: {
        type: String,
        default: ''
    },
    subscribers: {
        type: Number,
        default: 0
    },
    subscribedUsers: {
        type: [String],
        default: [],
    },
    fromGoogle: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

export default mongoose.model('User', UserSchema)