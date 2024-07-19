import { Sequelize } from "sequelize";
import db from "../config/database.js";
import TransactionItem from './TransactionItemModel.js';

const { DataTypes } = Sequelize;

const Transaction = db.define('transactions', {
    transaction_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  gross_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  customer_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  customer_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customer_phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  customer_address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  payment_status: {
    type: DataTypes.ENUM('Pending', 'Settlement', 'Expire', 'Cancel'),
    allowNull: false,
    defaultValue: 'Pending',
  },
  payment_method: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  freezeTableName:true,
  timestamps: false,
});

Transaction.hasMany(TransactionItem, { foreignKey: 'transaction_id' });
TransactionItem.belongsTo(Transaction, { foreignKey: 'transaction_id' });

export default Transaction;