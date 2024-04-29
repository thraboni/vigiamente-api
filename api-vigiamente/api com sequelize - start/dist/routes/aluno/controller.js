"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarAlunos = void 0;
const alunoRepository_1 = __importDefault(require("../../repositories/alunoRepository"));
const listarAlunos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new alunoRepository_1.default();
    let alunos = yield repository.getAll();
    console.log(alunos);
    res.status(200).json({ alunos });
});
exports.listarAlunos = listarAlunos;
