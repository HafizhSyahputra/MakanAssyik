import Cart from '../models/CartModel.js';

export const getCarts = async (req, res) => {
  try {
    const { id_player } = req.query; 
    const response = await Cart.findAll({
      where: {
        id_player: id_player,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};


export const updateCartQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ msg: 'Cart item not found' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json(cartItem);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};


export const getCartById = async (req, res) => {
  try {
    const response = await Cart.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createCart = async (req, res) => {
  try {
    const { id_player, ProductName, gambar, quantity,price } = req.body;
    await Cart.create({
      id_player,
      ProductName,
      gambar,
      quantity,
      price,
    });
    res.status(201).json({ msg: 'Cart Created' });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCart = async (req, res) => {
  try {
    await Cart.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: 'Cart Deleted' });
  } catch (error) {
    console.log(error.message);
  }
};
