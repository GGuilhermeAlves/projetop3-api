import { Router } from 'express';
import { getAlunos, getAlunoById, createAluno, updateAluno, deleteAluno } from '../controllers/aluno.controller.js';

const router = Router();

router.get('/alunos', getAlunos);
router.get('/alunos/:id', getAlunoById);
router.post('/alunos', createAluno);
router.put('/alunos/:id', updateAluno);
router.delete('/alunos/:id', deleteAluno);

export default router;