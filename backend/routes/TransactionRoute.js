import express from 'express';
import { getTransactions, getTransactionAll} from '../controller/TransactionController.js';
import { verifyToken } from '../middleware/VerifyToken.js';

const router = express.Router();

router.get('/transactions', verifyToken, getTransactions);
router.get('/transactionsAll', getTransactionAll);

export default router;
