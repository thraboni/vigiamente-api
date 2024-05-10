import express from "express";
import PerfilController from "../controllers/perfilController.js";

const routes = express.Router();

routes.get("/perfis", PerfilController.listarPerfis);
routes.get("/perfis/:id", PerfilController.listarPerfilPorId);
routes.post("/perfis", PerfilController.cadastrarPerfil);
routes.put("/perfis/:id", PerfilController.atualizarPerfil);
routes.delete("/perfis/:id", PerfilController.excluirPerfil);

export default routes;
