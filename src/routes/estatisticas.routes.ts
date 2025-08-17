import { Router } from 'express';
import { getDisciplinasPorCurso } from '../controllers/estatisticas.controller.js';

const router = Router();

router.get('/estatisticas/disciplinas-por-curso', getDisciplinasPorCurso);

export default router;