import express from "express";
import TweetController from "../controllers/tweetController.js";

const routes = express.Router();

routes.get("/tweets", TweetController.listarTweets);
routes.get("/tweets/:id", TweetController.listarTweetPorId);
routes.post("/tweets", TweetController.cadastrarTweet);
routes.put("/tweets/:id", TweetController.atualizarTweet);
routes.delete("/tweets/:id", TweetController.excluirTweet);

export default routes;
