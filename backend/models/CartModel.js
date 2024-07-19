import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Cart = db.define('cart', {
    id_player: {
        type: DataTypes.INTEGER,
    },
    ProductName: DataTypes.STRING,
    gambar: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.STRING,
}, {
    freezeTableName: true
});


export default Cart;

