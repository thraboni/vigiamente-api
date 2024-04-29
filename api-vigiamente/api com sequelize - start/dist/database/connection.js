"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: 'postgres',
    dialect: 'postgres',
    username: 'postgres',
    password: 'postgres',
    host: '127.0.0.1',
    port: 15432,
    models: [__dirname + "/models"],
});
exports.default = sequelize;
