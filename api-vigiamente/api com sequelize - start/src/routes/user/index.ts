import express, { Router } from "express";
import { listarUsuarios, criarUsuario, atualizarUsuario, deletarUsuario,visualizarUsuarios } from "./controller";

const usuarios: Router = express.Router();

usuarios.get("/usuarios", listarUsuarios);
usuarios.get("/usuario/:id", visualizarUsuarios);
usuarios.post("/usuario", criarUsuario);
usuarios.patch("/usuario/:id", atualizarUsuario);
usuarios.delete("/usuario/:id", deletarUsuario);

export default usuarios;