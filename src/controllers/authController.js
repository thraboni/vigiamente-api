import { usuario } from "../models/Usuario.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

class AuthController {
  static async login(req, res) {
    const dto = req.body;

    try {
      const usuarioAutenticacao = await usuario.findOne({
        usuario: dto.usuario,
      });

      if (!usuarioAutenticacao) {
        throw new Error("Usuario nao cadastrado");
      }

      const senhasIguais = await bcrypt.compare(
        dto.senha,
        usuarioAutenticacao.senha
      );

      if (!senhasIguais) {
        throw new Error("Senha invalida");
      }

      const token = jsonwebtoken.sign(
        {
          id: usuarioAutenticacao.id,
          usuario: usuarioAutenticacao.usuario,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 86400,
        }
      );

      return res.status(200).send({ token, usuario });
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  }
}

export default AuthController;
