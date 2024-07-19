import { Sequelize } from "sequelize";

const db =  new Sequelize('eccomerce_makan', 'root', '', {
    host:'localhost',
    dialect:'mysql'
});

export default db;