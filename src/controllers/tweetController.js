import { tweet } from "../models/Tweet.js";

class TweetController {

    static async listarTweets (req, res) {
        try {
            const listaTweets = await tweet.find({});
            res.status(304).json(listaTweets);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição` });
        };
    };

    static async listarTweetPorId (req, res) {
        try {
            const id = req.params.id;
            const tweetEncontrado = await tweet.findById(id);
            res.status(200).json(tweetEncontrado);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição do tweet` });
        };
    };

    static async cadastrarTweet (req, res) {
        try {
            const novoTweet = await tweet.create(req.body);
            res.status(201).json({ message: "Criado com sucesso", tweet: novoTweet });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao cadastrar tweet` })
        };
    };

    static async atualizarTweet (req, res) {
        try {
            const id = req.params.id;
            await tweet.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Tweet atualizado" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na atualização` });
        };
    };

    static async excluirTweet (req, res) {
        try {
            const id = req.params.id;
            await tweet.findByIdAndDelete(id);
            res.status(200).json({ message: "Tweet excluído com sucesso" })
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na exclusão` });
        };
    };

};

export default TweetController;
