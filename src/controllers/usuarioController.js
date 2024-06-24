import { usuario } from "../models/Usuario.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_APP_SENHA,
  },
});
class UsuarioController {
  static async listarUsuarios(req, res) {
    try {
      const listaUsuarios = await usuario.find({});
      res.status(200).json(listaUsuarios);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha na requisição` });
    }
  }

  static async listarUsuarioPorId(req, res) {
    try {
      const id = req.params.id;
      const usuarioEncontrado = await usuario.findById(id);
      res.status(200).json(usuarioEncontrado);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha na requisição do usuario` });
    }
  }

  static async listarPerfisDeUsuario(req, res) {
    const usuarioUsuario = req.usuarioUsuario;

    try {
      const usuarioEncontrado = await usuario.findOne({
        usuario: usuarioUsuario,
      });
      const listaPerfis = usuarioEncontrado.perfis;

      res.status(200).json(listaPerfis);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha na requisição` });
    }
  }

  static async cadastrarUsuario(req, res) {
    const novoUsuario = req.body;

    async function enviarEmail(destinatario, senha) {
      const mailOptions = {
        from: "vigiamente.app@gmail.com",
        to: destinatario,
        subject: "Sua nova senha VigiaMente",
        text: `Olá,\n\nSua nova senha é: ${senha}\n\nPor favor, altere sua senha após o primeiro login.`,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("E-mail enviado com sucesso");
      } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
      }
    }

    function gerarSenhaAleatoria(length) {
      const caracteres =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const caracteresEspeciais = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
      let senha = "";
      for (let i = 0; i < length - 1; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[randomIndex];
      }
      const randomIndex = Math.floor(
        Math.random() * caracteresEspeciais.length
      );
      senha += caracteresEspeciais[randomIndex];
      return senha;
    }

    try {
      const senhaAleatoria = gerarSenhaAleatoria(16);
      const senhaHash = await bcrypt.hash(senhaAleatoria, 8);
      novoUsuario.senha = senhaHash;

      const usuarioCriado = await usuario.create(novoUsuario);
      await enviarEmail(novoUsuario.email, senhaAleatoria);
      res.status(201).json({
        message: "Usuario criado com sucesso",
        usuario: usuarioCriado,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Falha ao cadastrar usuario: ${error.message}` });
    }
  }

  static async atualizarUsuario(req, res) {
    try {
      const id = req.params.id;
      await usuario.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Usuario atualizado" });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha na atualização` });
    }
  }

  static async excluirUsuario(req, res) {
    try {
      const id = req.params.id;
      await usuario.findByIdAndDelete(id);
      res.status(200).json({ message: "Usuario excluído com sucesso" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha na exclusão` });
    }
  }
  static async updateTweetInPerfil(req, res) {
    const { _id, perfil_nome, tweet_id, isSuicida, texto, link } = req.body;

    try {
      // Encontrar o usuário pelo ID
      const usuarioEncontrado = await usuario.findById(_id);

      if (!usuarioEncontrado) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      // Encontrar o perfil pelo nome de usuário do perfil
      const perfil = usuarioEncontrado.perfis.find(p => p.usuario === perfil_nome);

      if (!perfil) {
        return res.status(404).json({ message: "Perfil não encontrado" });
      }

      // Encontrar o tweet pelo ID do tweet
      const tweet = perfil.tweets.find(t => t._id.toString() === tweet_id);

      if (!tweet) {
        return res.status(404).json({ message: "Tweet não encontrado" });
      }

      // Atualizar o campo isSuicida e outros campos do tweet
      tweet.isSuicida = isSuicida;
      tweet.texto = texto;
      tweet.link = link;

      // Salvar as alterações no banco de dados
      await usuarioEncontrado.save();

      res.status(200).json({ message: "Tweet atualizado com sucesso" });
    } catch (erro) {
      res.status(500).json({ message: "Falha ao atualizar tweet" });
    }
  }
}

export default UsuarioController;