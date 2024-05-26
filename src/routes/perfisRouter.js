import express from "express";
import PerfilController from "../controllers/perfilController.js";

const routes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Perfis
 *   description: Gerenciamento de perfis
 */

/**
 * @swagger
 * /perfis:
 *   get:
 *     summary: Lista todos os perfis
 *     tags: [Perfis]
 *     responses:
 *       200:
 *         description: Lista de perfis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Perfil'
 */
routes.get("/perfis", PerfilController.listarPerfis);

/**
 * @swagger
 * /perfis/{id}:
 *   get:
 *     summary: Retorna um perfil específico
 *     tags: [Perfis]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do perfil
 *     responses:
 *       200:
 *         description: Perfil encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Perfil'
 *       404:
 *         description: Perfil não encontrado
 */
routes.get("/perfis/:id", PerfilController.listarPerfilPorId);

/**
 * @swagger
 * /perfis:
 *   post:
 *     summary: Cria um novo perfil
 *     tags: [Perfis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Perfil'
 *     responses:
 *       201:
 *         description: Perfil criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Perfil'
 *       400:
 *         description: Erro na requisição
 */
routes.post("/perfis", PerfilController.cadastrarPerfil);

/**
 * @swagger
 * /perfis/{id}:
 *   put:
 *     summary: Atualiza um perfil
 *     tags: [Perfis]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do perfil
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Perfil'
 *     responses:
 *       200:
 *         description: Perfil atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Perfil'
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Perfil não encontrado
 */
routes.put("/perfis/:id", PerfilController.atualizarPerfil);

/**
 * @swagger
 * /perfis/{id}:
 *   delete:
 *     summary: Exclui um perfil
 *     tags: [Perfis]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do perfil
 *     responses:
 *       200:
 *         description: Perfil excluído com sucesso
 *       404:
 *         description: Perfil não encontrado
 */
routes.delete("/perfis/:id", PerfilController.excluirPerfil);

export default routes;
