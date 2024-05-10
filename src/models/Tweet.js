import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    texto: { type: String },
    link: { type: String },
    data: { type: Date },
    isSuicida: { type: Boolean }
}, { versionKey: false });

const tweet = mongoose.model("tweet", tweetSchema);

export { tweet, tweetSchema };
