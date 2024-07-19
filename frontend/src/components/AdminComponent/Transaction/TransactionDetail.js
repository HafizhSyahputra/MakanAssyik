import React from 'react';
import './TransactionCSS.css';

const TransactionDetail = ({ transaction, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Transaction Detail</h2>
        <p><strong>Order ID:</strong> {transaction.order_id}</p>
        <p><strong>Customer Name:</strong> {transaction.customer_name}</p>
        <p><strong>Customer Email:</strong> {transaction.customer_email}</p>
        <p><strong>Customer Phone:</strong> {transaction.customer_phone}</p>
        <p><strong>Customer Address:</strong> {transaction.customer_address}</p>
        <p><strong>Payment Status:</strong> {transaction.payment_status}</p>
        <p><strong>Payment Method:</strong> {transaction.payment_method}</p>
        <h3>Items:</h3>
        <ul>
          {transaction.transaction_items.map(item => (
            <li key={item.transaction_item_id}>
              {item.product_name} - {item.quantity} x {item.price} (Sub-total: {item.sub_total})
            </li>
          ))}
        </ul>
        <p><strong>Total Price:</strong> {transaction.gross_amount}</p>
      </div>
    </div>
  );
};

export default TransactionDetail;
