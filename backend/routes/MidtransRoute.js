import express from 'express';
import { createTransaction, handleNotification, cancelTransaction } from '../controller/MidtransController.js';

const router = express.Router();

router.post('/create-transaction', createTransaction);
router.post('/notification-handler', handleNotification);
router.post('/cancel-transaction', cancelTransaction); 



export default router;
