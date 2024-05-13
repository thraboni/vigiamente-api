import { usuario } from "../models/Usuario.js";
import { perfil } from "../models/Perfil.js";

class UsuarioController {

    static async listarUsuarios (req, res) {
        try {
            const listaUsuarios = await usuario.find({});
            res.status(200).json(listaUsuarios);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição` });
        };
    };

    static async listarUsuarioPorId (req, res) {
        try {
            const id = req.params.id;
            const usuarioEncontrado = await usuario.findById(id);
            res.status(200).json(usuarioEncontrado);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição do usuario` });
        };
    };

    static async cadastrarUsuario(req, res) {
        const novoUsuario = req.body;

    
        try {
            if (novoUsuario.perfis && novoUsuario.perfis.length > 0) {
                console.log(novoUsuario);
                const perfisIds = novoUsuario.perfis;
                const perfisEncontrados = await perfil.find({ _id: { $in: perfisIds } });
                const perfisDetalhados = perfisEncontrados.map(perfil => {
                    return perfil.toObject();
                });
                const usuarioCompleto = { ...novoUsuario, perfis: perfisDetalhados };
                const usuarioCriado = await usuario.create(usuarioCompleto);
                res.status(201).json({ message: "Usuario criado com sucesso", usuario: usuarioCriado });
            } else {
                const usuarioCriado = await usuario.create(novoUsuario);
                res.status(201).json({ message: "Usuario criado com sucesso", usuario: usuarioCriado });
            }
        } catch (error) {
            res.status(500).json({ message: `Falha ao cadastrar usuario: ${error.message}` });
        }
    };


    static async atualizarUsuario (req, res) {
        try {
            const id = req.params.id;
            await usuario.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Usuario atualizado" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na atualização` });
        };
    };

    static async excluirUsuario (req, res) {
        try {
            const id = req.params.id;
            await usuario.findByIdAndDelete(id);
            res.status(200).json({ message: "Usuario excluído com sucesso" })
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na exclusão` });
        };
    };

    // static async listarLivrosPorEditora (req, res) {
    //     const editora = req.query.editora;
    //     try {
    //         const livrosPorEditora = await livro.find({ editora: editora });
    //         res.status(200).json(livrosPorEditora);
    //     } catch (erro) {
    //         res.status(500).json({ message: `${erro.message} - Falha na busca` });
    //     }
    // };
};

export default UsuarioController;
