import express from "express";
import tweets from "./tweetsRouter.js";
import usuarios from "./usuariosRouter.js";
import perfis from "./perfisRouter.js";
import auth from "./authRoutes.js";

const router = express.Router();

router.get("/", (req, res) => res.status(200).send("VigiaMente"));

const routes = (app) => {
  app.use(router);
  app.use(express.json(), auth, usuarios, tweets, perfis);
};

export default routes;
