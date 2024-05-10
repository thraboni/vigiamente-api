import mongoose from "mongoose";
import { tweetSchema } from "./Tweet.js";

const perfilSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    usuario: { type: String },
    tweets: [tweetSchema]
}, { versionKey: false });

const perfil = mongoose.model("perfil", perfilSchema);

export { perfil, perfilSchema };
