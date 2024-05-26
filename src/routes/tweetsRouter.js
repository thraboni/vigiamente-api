import express from "express";
import TweetController from "../controllers/tweetController.js";

const routes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tweets
 *   description: Gerenciamento de tweets
 */

/**
 * @swagger
 * /tweets:
 *   get:
 *     summary: Lista todos os tweets
 *     tags: [Tweets]
 *     responses:
 *       200:
 *         description: Lista de tweets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tweet'
 *       500:
 *         description: Falha na requisição
 */
routes.get("/tweets", TweetController.listarTweets);

/**
 * @swagger
 * /tweets/{id}:
 *   get:
 *     summary: Retorna um tweet específico
 *     tags: [Tweets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do tweet
 *     responses:
 *       200:
 *         description: Tweet encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tweet'
 *       500:
 *         description: Tweet não encontrado
 */
routes.get("/tweets/:id", TweetController.listarTweetPorId);

/**
 * @swagger
 * /tweets:
 *   post:
 *     summary: Cria um novo tweet
 *     tags: [Tweets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tweet'
 *     responses:
 *       201:
 *         description: Tweet criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tweet'
 *       500:
 *         description: Erro na requisição
 */
routes.post("/tweets", TweetController.cadastrarTweet);

/**
 * @swagger
 * /tweets/{id}:
 *   put:
 *     summary: Atualiza um tweet
 *     tags: [Tweets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do tweet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tweet'
 *     responses:
 *       200:
 *         description: Tweet atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tweet'
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Tweet não encontrado
 */
routes.put("/tweets/:id", TweetController.atualizarTweet);

/**
 * @swagger
 * /tweets/{id}:
 *   delete:
 *     summary: Exclui um tweet
 *     tags: [Tweets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do tweet
 *     responses:
 *       200:
 *         description: Tweet excluído com sucesso
 *       500:
 *         description: Tweet não encontrado
 */
routes.delete("/tweets/:id", TweetController.excluirTweet);

export default routes;
