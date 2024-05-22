import { Router } from 'express';

import { Request, Response } from 'express';
import connection from '../db/dbconnection';

export const transferRouter = Router();

// Get all transfers
transferRouter.get('/', async (req: Request, res: Response) => {
    const { account_id } = req.query;
});
