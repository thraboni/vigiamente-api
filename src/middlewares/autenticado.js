import jsonwebtoken from "jsonwebtoken";

export default async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: "Acess token não informado" });
  }

  const [, accessToken] = token.split(" ");

  try {
    jsonwebtoken.verify(accessToken, process.env.JWT_SECRET);

    const { id, usuario } = await jsonwebtoken.decode(accessToken);

    req.usuarioId = id;
    req.usuarioUsuario = usuario;

    return next();
  } catch (error) {
    res.status(401).send("Usuario nao autorizado");
  }
};
