import { Timestamp } from "bson";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    birthday: {type: Timestamp, required: false},
    horoscope: {type: String, required: false},
    relationship: {type: String, required: true},
    email: {type: String, required: true},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref:'Comment'}]
});

const CommentSchema = new mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    content: {type: String, required: true},
    createdAt: {type: Timestamp, required: false}
});

User.find({})
    .populate('comments')
    .exec()

