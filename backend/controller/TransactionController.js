import Transaction from "../models/TransactionModel.js";
import TransactionItem from "../models/TransactionItemModel.js";

export const getTransactions = async (req, res) => {
  try {
    const email = req.email;
    console.log("Fetching transactions for email:", email);

    const transactions = await Transaction.findAll({
      include: [
        {
          model: TransactionItem,
          as: 'transaction_items'
        }
      ],
      where: {
        customer_email: email
      }
    });
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transaction data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getTransactionAll = async (req, res) => {
  try {
    console.log("Fetching all transactions");

    const transactions = await Transaction.findAll({
      include: [
        {
          model: TransactionItem,
          as: 'transaction_items'
        }
      ]
    });
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transaction data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};