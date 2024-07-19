import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Player = db.define('players', {
    id_player: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    birth: DataTypes.DATE,
    gender: {
        type: DataTypes.ENUM,
        values: ['Laki - Laki', 'Perempuan']
    },
    phone: DataTypes.STRING,
    refresh_token: DataTypes.TEXT,
    role: {
        type: DataTypes.STRING,
        defaultValue: "user"
    },
    profile: DataTypes.STRING,
    address: DataTypes.STRING,
}, {
    freezeTableName: true
});

export default Player;
