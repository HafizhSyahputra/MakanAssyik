import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const User = db.define('users', {
    username:DataTypes.STRING,
    password:DataTypes.STRING,
    email:DataTypes.STRING,
    address:DataTypes.STRING,
    role:DataTypes.STRING,

},{
    freezeTableName:true
});

export default User;

(async()=> {
    await db.sync();
})();