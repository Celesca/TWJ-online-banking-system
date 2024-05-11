import { NextFunction, Router } from 'express';
import { Request, Response } from 'express';

export const userRouter = Router();

// Importing connection from mysql database
import conn from '../db/dbconnection';

userRouter.post('/checkid', (req: Request, res: Response, next: NextFunction) => {
    const national_card_id: string = req.body.nation_card_id;
    if (!national_card_id) {
        return res.status(400).json({ message: 'Please provide a national card id' });
    }

    const sql_query = `SELECT * FROM user WHERE nation_card_id = ?`;

    conn.query(sql_query , [national_card_id], (err, results) => {
        if (err) {
            const error = new Error('Internal server error');
            next(error);
        }
        if (results.length > 0) {
            return res.status(200).json({ message: 'User exists' });
        }
    })


})