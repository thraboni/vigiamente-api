import express from "express";
import AuthController from "../controllers/authController.js";
import autenticado from "../middlewares/autenticado.js";

const routes = express.Router();

routes.post("/auth/login", AuthController.login);

routes.use(autenticado);

export default routes;
