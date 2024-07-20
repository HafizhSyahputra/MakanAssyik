import MidtransRoute from 'midtrans-client';
import Transaction from '../models/TransactionModel.js';
import TransactionItem from '../models/TransactionItemModel.js';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: "1835149",
  key: "f36a4f52d1b6ee242c96",
  secret: "db2d8edb1f57a88d8a3f",
  cluster: "ap1",
  useTLS: true
});

let snap = new MidtransRoute.Snap({
  isProduction: false,
  serverKey: "SB-Mid-server-dqELOdaotYXB-Gaf6SA62D6n", 
  clientKey: "SB-Mid-client-nXhYb5UJXVoITAP7" 
});

export const createTransaction = async (req, res) => {
  const { order_id, gross_amount, customer_name, customer_email, customer_phone, customer_address, item_details, payment_type} = req.body;

  console.log("Received Order ID:", order_id);
  console.log("Received Gross Amount:", gross_amount);
  console.log("Received Customer Name:", customer_name);
  console.log("Received Customer Email:", customer_email);
  console.log("Received Customer Phone:", customer_phone);
  console.log("Received Customer Address:", customer_address);
  console.log("Received Item Details:", item_details);
  console.log("Received Payment Method:", payment_type);

  const calculatedGrossAmount = item_details.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (calculatedGrossAmount !== gross_amount) {
    console.error("Calculated gross amount does not match the provided gross amount");
    return res.status(400).send("Calculated gross amount does not match the provided gross amount");
  }

  const parameter = {
    transaction_details: {
      order_id: order_id,
      gross_amount: calculatedGrossAmount,
      payment_method: payment_type, 
      acquirer: payment_type 
    },
    item_details: item_details,
    customer_details: {
      first_name: customer_name,
      email: customer_email,
      phone: customer_phone,
      billing_address: {
        address: customer_address,
      },
      shipping_address: {
        first_name: customer_name,
        phone: customer_phone,
        address: customer_address,
      }
    },
  };
  
  console.log("Parameter Sent to Midtrans:", parameter);
  
  try {
    const transaction = await snap.createTransaction(parameter);
    const transactionData = {
      order_id: order_id,
      gross_amount: calculatedGrossAmount,
      customer_name: customer_name,
      customer_email: customer_email,
      customer_phone: customer_phone,
      customer_address: customer_address,
      payment_method: payment_type,  
      created_at: new Date()
    };

    const newTransaction = await Transaction.create(transactionData);
    const transactionItems = item_details.map(item => ({
      transaction_id: newTransaction.transaction_id,
      product_id: item.id,
      product_name: item.name,
      product_image: item.Gambar,  
      quantity: item.quantity,
      price: item.price,
      sub_total: item.price * item.quantity
    }));

    console.log(transactionItems);
    
    await TransactionItem.bulkCreate(transactionItems);

    res.status(200).json({ token: transaction.token });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).send(error.message);
  }
};


export const handleNotification = async (req, res) => {
  const notification = req.body;
  console.log('Received notification:', notification);

  try {
      const { order_id, transaction_status, payment_type } = notification;

      const transaction = await Transaction.findOne({ where: { order_id } });

      if (transaction) {
          transaction.payment_status = transaction_status;
          transaction.payment_method = payment_type;
          await transaction.save();
          console.log(`Updated payment status and method for order ${order_id} to ${transaction_status} and ${payment_type}`);

          if (transaction_status === 'settlement') {
              pusher.trigger('transaction-channel', 'transaction-event', {
                  order_id: order_id,
                  status: transaction_status
              });
          }
      } else {
          console.error(`Transaction with order_id ${order_id} not found.`);
      }

      res.status(200).json({ status: 'OK' });
  } catch (error) {
      console.error("Error handling notification:", error);
      res.status(500).send(error.message);
  }
};

export const cancelTransaction = async (req, res) => {
  const { order_id } = req.body;

  try {
    const transaction = await Transaction.findOne({ where: { order_id } });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found.' });
    }

    await TransactionItem.destroy({ where: { transaction_id: transaction.transaction_id } });
    await Transaction.destroy({ where: { order_id } });

    res.status(200).json({ message: 'Transaction cancelled and data deleted successfully.' });
  } catch (error) {
    console.error('Error cancelling transaction:', error);
    res.status(500).json({ message: 'Error cancelling transaction.' });
  }
};

