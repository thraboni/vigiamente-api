import { Optional } from "sequelize";
import Usuario from "../database/models/Usuario";

export default class userRepository {
    
    getAll(options: Record<string, any> = {}): Promise<Array<Usuario>> {
        return Usuario.findAll();
    }

    getById(id: number): Promise<Usuario | null> {
        return Usuario.findByPk(id);
    }

    async create(usuario: readonly Optional<any, string>[]): Promise<Usuario> {
        const novo_usuario = await Usuario.bulkCreate(usuario, { ignoreDuplicates: true });
        return novo_usuario[0];
    }

    update(id: number, usuario: Usuario): Promise<[affectedCount: number]> {
        return Usuario.update(usuario, { where: { id: id } });
    }

    delete(id: number): Promise<number> {
        return Usuario.destroy({ where: { id } });
    }
}
