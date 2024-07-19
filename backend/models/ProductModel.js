import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Product = db.define('products', {
    ProductName:DataTypes.STRING,
    Gambar:DataTypes.STRING,
    Quantity:DataTypes.STRING,
    Price:DataTypes.STRING,
    Description:DataTypes.STRING,

},{
    freezeTableName:true
});

export default Product;

(async()=> {
    await db.sync();
})();