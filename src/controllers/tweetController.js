import { tweet } from "../models/Tweet.js";
import { usuario } from '../models/Usuario.js';
class TweetController {

    static async listarTweets (req, res) {
        try {
            const listaTweets = await tweet.find({});
            res.status(200).json(listaTweets);
        } catch (erro) {
            res.status(500).json({ message: erro.message + " - Falha na requisição" });
        }
    }

    static async listarTweetPorId (req, res) {
        try {
            const id = req.params.id;
            const tweetEncontrado = await tweet.findById(id);
            res.status(200).json(tweetEncontrado);
        } catch (erro) {
            res.status(500).json({ message: erro.message + " - Falha na requisição do tweet" });
        }
    }

    static async cadastrarTweet(req, res) {
        try {
            // Verifica se o link já está presente no banco de dados
            const linkExistente = await tweet.findOne({ link: req.body.link });
        
            // Se o link já existir, retorna uma mensagem informando que o tweet não foi cadastrado
            if (linkExistente) {
                return res.status(200).json({ message: "O tweet não foi cadastrado porque o link já existe" });
            }
        
            // Cria um novo tweet
            const novoTweet = await tweet.create(req.body);
        
            // Extrai o ID do perfil e o nome do perfil do corpo da requisição
            const usuarioId = req.body.usuarioId;
            const nomePerfil = req.body.nomePerfil;
        
            // Verifica se o usuarioId está presente
            if (!usuarioId || !nomePerfil) {
                return res.status(400).json({ message: "usuario ID ou nome do perfil não fornecido" });
            }
        
            // Busca o usuário pelo usuarioId e pelo nome do perfil
            const usuarioEncontrado = await usuario.findOneAndUpdate(
                { 
                    "_id": usuarioId,
                    "perfis.usuario": nomePerfil
                },
                { $push: { "perfis.$.tweets": { tweet_id: novoTweet._id, texto: novoTweet.texto, link: novoTweet.link, IsSuicida: novoTweet.isSuicida } } },
                { new: true }
            );
        
            if (!usuarioEncontrado) {
                return res.status(404).json({ message: "Usuário não encontrado ou perfil não encontrado" });
            }
        
            // Responde com sucesso
            res.status(201).json({ message: "Criado com sucesso", tweet: novoTweet });
        } catch (erro) {
            res.status(500).json({ message: erro.message + " - Falha ao cadastrar tweet" });
        }
    }
    

    static async atualizarTweet (req, res) {
        try {
            const id = req.params.id;
            await tweet.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Tweet atualizado" });
        } catch (erro) {
            res.status(500).json({ message: erro.message + " - Falha na atualização" });
        }
    }

    static async excluirTweet (req, res) {
        try {
            const id = req.params.id;
            await tweet.findByIdAndDelete(id);
            res.status(200).json({ message: "Tweet excluído com sucesso" });
        } catch (erro) {
            res.status(500).json({ message: erro.message + " - Falha na exclusão" });
        }
    }

}

export default TweetController;
