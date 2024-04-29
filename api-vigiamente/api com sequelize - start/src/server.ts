import express from "express";
import "./database/connection"
import rotas from "./routes";
import sawaggerUI from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
const app = express();
app.use(express.json());

app.use('/api-docs', sawaggerUI.serve, sawaggerUI.setup());
app.get('/api-docs', sawaggerUI.setup(swaggerDocument));

app.use("/", rotas);

app.listen(3000);