import { Request, Response } from 'express';
import db from '../db.js';

// GET
export const getAlunos = async (req: Request, res: Response) => {
    try {
        const { rows } = await db.query('SELECT * FROM aluno ORDER BY id_aluno ASC', []);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// GET
export const getAlunoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const { rows } = await db.query('SELECT * FROM aluno WHERE id_aluno = $1', [id]);
        if (rows.length === 0) {
            return res.status(404).send('Aluno não encontrado.');
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// POST
export const createAluno = async (req: Request, res: Response) => {
    const { tx_nome, tx_sexo, dt_nascimento } = req.body;
    try {
        const { rows } = await db.query(
            'INSERT INTO aluno (tx_nome, tx_sexo, dt_nascimento) VALUES ($1, $2, $3) RETURNING *',
            [tx_nome, tx_sexo, dt_nascimento]
        );
        res.status(201).json({ message: 'Aluno criado com sucesso!', data: rows[0] });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// PUT
export const updateAluno = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { tx_nome, tx_sexo, dt_nascimento } = req.body;
    try {
        const { rows } = await db.query(
            'UPDATE aluno SET tx_nome = $1, tx_sexo = $2, dt_nascimento = $3 WHERE id_aluno = $4 RETURNING *',
            [tx_nome, tx_sexo, dt_nascimento, id]
        );
        if (rows.length === 0) {
            return res.status(404).send('Aluno não encontrado.');
        }
        res.status(200).json({ message: 'Aluno atualizado com sucesso!', data: rows[0] });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// DELETE
export const deleteAluno = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM aluno WHERE id_aluno = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send('Aluno não encontrado.');
        }
        res.status(200).send(`Aluno com ID ${id} deletado com sucesso.`);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};