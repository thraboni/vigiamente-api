import { usuario } from "../models/Usuario.js";
import { tweet } from "../models/Tweet.js";

class PerfilController {
  static async listarPerfis(req, res) {
    try {
      const listaUsuarios = await usuario.find({});
      let listaPerfis = [];
      listaUsuarios.forEach((usuario) => {
        listaPerfis = listaPerfis.concat(usuario.perfis);
      });
      res.status(200).json(listaPerfis);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha na requisição` });
    }
  }

  static async listarPerfilPorIdUsuario(req, res) {
    try {
      const id = req.params.idUsuario;
      const usuarioEncontrado = await usuario.findById(id);
      const perfisEncontrados = usuarioEncontrado.perfis;
      res.status(200).json(perfisEncontrados);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha na requisição do perfil` });
    }
  }

  // static async listarLivrosPorEditora (req, res) {
  //     const editora = req.query.editora;
  //     try {
  //         const livrosPorEditora = await livro.find({ editora: editora });
  //         res.status(200).json(livrosPorEditora);
  //     } catch (erro) {
  //         res.status(500).json({ message: `${erro.message} - Falha na busca` });
  //     }
  // };

  static async listarTweets(req, res) {
    try {
      const perfil = req.query.perfil;

      if (!perfil) {
        return res
          .status(400)
          .json({ message: "Parâmetro 'perfil' é necessário" });
      }

      const usuarios = await usuario.find({
        perfis: { $elemMatch: { usuario: perfil } },
      });

      let perfilCorrespondente = null;
      for (const usuario of usuarios) {
        for (const p of usuario.perfis) {
          if (p.usuario === perfil) {
            perfilCorrespondente = p;
            break;
          }
        }
        if (perfilCorrespondente) {
          break;
        }
      }

      if (!perfilCorrespondente) {
        return res.status(404).json({ message: "Perfil não encontrado" });
      }

      const tweetIds = perfilCorrespondente.tweets;
      const tweets = await tweet.find({ _id: { $in: tweetIds } });
      res.status(200).json(tweets);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha na requisição` });
    }
  }

  static async cadastrarPerfil(req, res) {
    const novoPerfil = req.body;

    try {
      if (novoPerfil.tweets && novoPerfil.tweets.length > 0) {
        const tweetsIds = novoPerfil.tweets;
        const tweetsEncontrados = await tweet.find({ _id: { $in: tweetsIds } });
        const tweetsDetalhados = tweetsEncontrados.map((tweet) => {
          return tweet.toObject();
        });
        const perfilCompleto = { ...novoPerfil, tweets: tweetsDetalhados };
        const perfilCriado = await perfil.create(perfilCompleto);
        res
          .status(201)
          .json({ message: "Perfil criado com sucesso", perfil: perfilCriado });
      } else {
        const perfilCriado = await perfil.create(novoPerfil);
        res
          .status(201)
          .json({ message: "Perfil criado com sucesso", perfil: perfilCriado });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: `Falha ao cadastrar perfil: ${error.message}` });
    }
  }

  static async cadastrarPerfilUsuario(req, res) {
    const usuarioTwitter = req.body.usuario;
    const usuarioUsuario = req.usuarioUsuario;

    try {
      const perfilCriado = { usuario: usuarioTwitter, tweets: [] };

      const usuarioAtualizado = await usuario.findOneAndUpdate(
        { usuario: usuarioUsuario },
        { $push: { perfis: perfilCriado } },
        { new: true }
      );

      if (!usuarioAtualizado) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      res.status(201).json({
        message: "Perfil criado e adicionado ao usuário com sucesso",
        perfil: perfilCriado,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Falha ao cadastrar perfil: ${error.message}` });
    }
  }

  static async atualizarPerfil(req, res) {
    try {
      const id = req.params.id;
      await perfil.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Perfil atualizado" });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha na atualização` });
    }
  }

  static async excluirPerfil(req, res) {
    try {
      const id = req.params.id;
      await perfil.findByIdAndDelete(id);
      res.status(200).json({ message: "Perfil excluído com sucesso" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha na exclusão` });
    }
  }
}

export default PerfilController;
