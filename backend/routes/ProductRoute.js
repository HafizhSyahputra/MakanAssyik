import express from 'express';
import multer from 'multer';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controller/ProductController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', upload.single('Gambar'), createProduct);
router.patch('/products/:id', upload.single('Gambar'), updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
