import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import alunoRoutes from './routes/aluno.routes.js';
import estatisticasRoutes from './routes/estatisticas.routes.js';

dotenv.config();
const app: Express = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('API da Escola - Bem-vindo!');
});

app.use('/api', alunoRoutes); 
app.use('/api', estatisticasRoutes);

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Lançado! Servidor da API rodando na porta ${PORT}`);
});