import express from "express";
import tweets from "./tweetsRouter.js"
import usuarios from "./usuariosRouter.js"
import perfis from "./perfisRouter.js"

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("VigiaMente"));

    app.use(express.json(), usuarios, tweets, perfis);

};

export default routes;
