import Product from '../models/ProductModel.js';

export const getProducts = async (req, res) => {
  try {
    const response = await Product.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductById = async (req, res) => {
  try {
    const response = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createProduct = async (req, res) => {
  try {
    const { ProductName, Quantity, Price, Description } = req.body;
    const Gambar = req.file ? req.file.path : null; // File path

    await Product.create({
      ProductName,
      Gambar,
      Quantity,
      Price,
      Description,
    });
    res.status(201).json({ msg: 'Product Created' });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { ProductName, Quantity, Price, Description } = req.body;
    let Gambar = req.file ? req.file.path : null; // File path

    const product = await Product.findOne({ where: { id: req.params.id } });

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    Gambar = Gambar ? Gambar : product.Gambar; // Use existing image if no new image is uploaded

    await Product.update(
      {
        ProductName,
        Gambar,
        Quantity,
        Price,
        Description,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: 'Product Updated' });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: 'Product Deleted' });
  } catch (error) {
    console.log(error.message);
  }
};
