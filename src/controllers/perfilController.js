import { usuario } from "../models/Usuario.js";
import { perfil } from "../models/Perfil.js";
import { tweet } from "../models/Tweet.js";

class PerfilController {

    static async listarPerfis (req, res) {
        try {
            const listaPerfis = await perfil.find({});
            res.status(200).json(listaPerfis);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição` });
        };
    };

    static async listarPerfilPorId (req, res) {
        try {
            const id = req.params.id;
            const perfilEncontrado = await perfil.findById(id);
            res.status(200).json(perfilEncontrado);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição do perfil` });
        };
    };

    static async cadastrarPerfil(req, res) {
        const novoPerfil = req.body;
    
        try {
            if (novoPerfil.tweets && novoPerfil.tweets.length > 0) {
                const tweetsIds = novoPerfil.tweets;
                const tweetsEncontrados = await tweet.find({ _id: { $in: tweetsIds } });
                const tweetsDetalhados = tweetsEncontrados.map(tweet => {
                    return tweet.toObject();
                });
                const perfilCompleto = { ...novoPerfil, tweets: tweetsDetalhados };
                const perfilCriado = await perfil.create(perfilCompleto);
                res.status(201).json({ message: "Perfil criado com sucesso", perfil: perfilCriado });
            } else {
                const perfilCriado = await perfil.create(novoPerfil);
                res.status(201).json({ message: "Perfil criado com sucesso", perfil: perfilCriado });
            }
        } catch (error) {
            res.status(500).json({ message: `Falha ao cadastrar perfil: ${error.message}` });
        }
    };

    static async cadastrarPerfilUsuario(req, res) {
        const usuarioTwitter = req.body.usuario;
        const usuarioUsuario = req.usuarioUsuario;
        console.log(usuarioTwitter);
    
        try {
            const perfilCriado = await perfil.create({ usuario: usuarioTwitter });
    
            const usuarioAtualizado = await usuario.findOneAndUpdate(
                { usuario: usuarioUsuario },
                { $push: { perfis: perfilCriado } },
                { new: true }
            );
    
            if (!usuarioAtualizado) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
    
            res.status(201).json({ message: "Perfil criado e adicionado ao usuário com sucesso", perfil: perfilCriado });
        } catch (error) {
            res.status(500).json({ message: `Falha ao cadastrar perfil: ${error.message}` });
        }
    };
    

    static async atualizarPerfil (req, res) {
        try {
            const id = req.params.id;
            await perfil.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Perfil atualizado" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na atualização` });
        };
    };

    static async excluirPerfil (req, res) {
        try {
            const id = req.params.id;
            await perfil.findByIdAndDelete(id);
            res.status(200).json({ message: "Perfil excluído com sucesso" })
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na exclusão` });
        };
    };

};

export default PerfilController;
