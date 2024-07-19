import express from 'express';
import multer from 'multer';
import { getCarts, getCartById, createCart, deleteCart, updateCartQuantity } from '../controller/CartController.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.get('/cart', getCarts);
router.get('/cart/:id', getCartById);
router.post('/cart', createCart);
router.delete('/cart/:id', deleteCart);
router.put('/cart/:id', updateCartQuantity);  


export default router;
