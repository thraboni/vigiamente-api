import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    usuario: { type: String, required: true },
    senha: {type: String, required: true},
    email: { type: String, required: true },
    perfis: [],
    admin: {type: Boolean}
}, { versionKey: false });

const usuario = mongoose.model("usuarios", usuarioSchema);

export { usuario, usuarioSchema };
