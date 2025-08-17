import { Request, Response } from 'express';
import db from '../db.js';

export const getDisciplinasPorCurso = async (req: Request, res: Response) => {
    try {
        const query = `
            SELECT 
                c.tx_descricao AS curso, 
                COUNT(d.id_disciplina) AS quantidade_disciplinas
            FROM 
                curso c
            JOIN 
                disciplina d ON c.id_curso = d.id_curso
            GROUP BY 
                c.tx_descricao
            ORDER BY
                quantidade_disciplinas DESC;
        `;
        const { rows } = await db.query(query, []);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};