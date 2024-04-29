import { Request, Response, NextFunction } from "express";
import userRepository from "../../repositories/userRepository";

export const listarUsuarios = async (req: Request, res: Response) => {
    const repository = new userRepository();
    let usuarios = await repository.getAll();

    res.status(200).json({ usuarios });
};

export const visualizarUsuarios = async (req: Request, res: Response) => {
  const repository = new userRepository();
  let usuarios = await repository.getById(parseInt(req.params.id))

  res.status(200).json({ usuarios });
};

export const criarUsuario = async (req: Request, res: Response) => {
  const repository = new userRepository();
  await repository.create(req.body);

  res.status(200).json({ 'Mensagem': 'Usuário criado com sucesso' });
};

export const atualizarUsuario = async (req: Request, res: Response) => {
  const repository = new userRepository();
  await repository.update(parseInt(req.params.id), req.body);

  res.status(200).json({ 'Mensagem': 'Usuário atualizado com sucesso' });
};

export const deletarUsuario = async (req: Request, res: Response) => {
  const repository = new userRepository();
  await repository.delete(parseInt(req.params.id));

  res.status(200).json({ 'Mensagem': 'Usuário deletado com sucesso' });
};