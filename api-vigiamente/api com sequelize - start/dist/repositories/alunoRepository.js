"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Aluno_1 = __importDefault(require("../database/models/Aluno"));
class AlunoRepository {
    getAll(options = {}) {
        return Aluno_1.default.findAll();
    }
}
exports.default = AlunoRepository;
