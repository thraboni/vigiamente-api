import express from 'express';
import cors from 'cors';
import conectaNaDatabase from './config/dbConnect.js';
import routes from './routes/index.js';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './schemas/schemas.json' assert { type: 'json' }; 

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API',
      version: '1.0.0',
      description: 'API de Exemplo usando Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento'
      }
    ],
    components: {
      schemas: swaggerDocument
    }
  },
  apis: ['./src/routes/*.js'], // Caminho para os arquivos de rota
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

const conexao = await conectaNaDatabase();

conexao.on('error', (erro) => {
    console.error('Erro de conexão: ', erro);
});

conexao.once('open', () => {
    console.log('Conexão com o banco feita com sucesso');
});

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
routes(app);

export default app;
