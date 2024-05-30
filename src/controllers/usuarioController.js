import { usuario } from "../models/Usuario.js";
import { perfil } from "../models/Perfil.js";
import nodemailer from 'nodemailer';

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

  static async cadastrarUsuario(req, res) {
    const novoUsuario = req.body;

    async function enviarEmail(destinatario, senha) {
      const mailOptions = {
        from: "thacito.raboni@gmail.com",
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
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
      let senha = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[randomIndex];
      }
      return senha;
    }

    try {
      const senhaAleatoria = gerarSenhaAleatoria(16);
      novoUsuario.senha = senhaAleatoria;

      if (novoUsuario.perfis && novoUsuario.perfis.length > 0) {
        console.log(novoUsuario);
        const perfisIds = novoUsuario.perfis;
        const perfisEncontrados = await perfil.find({
          _id: { $in: perfisIds },
        });
        const perfisDetalhados = perfisEncontrados.map((perfil) =>
          perfil.toObject()
        );
        const usuarioCompleto = { ...novoUsuario, perfis: perfisDetalhados };
        const usuarioCriado = await usuario.create(usuarioCompleto);
        await enviarEmail(novoUsuario.email, senhaAleatoria);
        res.status(201).json({
          message: "Usuario criado com sucesso",
          usuario: usuarioCriado,
        });
      } else {
        const usuarioCriado = await usuario.create(novoUsuario);
        await enviarEmail(novoUsuario.email, senhaAleatoria);
        res.status(201).json({
          message: "Usuario criado com sucesso",
          usuario: usuarioCriado,
        });
      }
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

  // static async listarLivrosPorEditora (req, res) {
  //     const editora = req.query.editora;
  //     try {
  //         const livrosPorEditora = await livro.find({ editora: editora });
  //         res.status(200).json(livrosPorEditora);
  //     } catch (erro) {
  //         res.status(500).json({ message: `${erro.message} - Falha na busca` });
  //     }
  // };
}

export default UsuarioController;
