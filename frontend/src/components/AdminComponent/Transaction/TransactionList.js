import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionDetail from './TransactionDetail';
import './TransactionCSS.css';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setError("No access token found");
          setLoading(false);
          return;
        }

        const response = await axios.get('/api/transactionsAll', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.error : err.message);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleRowClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="table-container">
      <h2>Transaction List</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Customer Email</th>
              <th>Payment Status</th>
              <th>Payment Method</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.transaction_id} onClick={() => handleRowClick(transaction)}>
                <td>{transaction.order_id}</td>
                <td>{transaction.customer_name}</td>
                <td>{transaction.customer_email}</td>
                <td>{transaction.payment_status}</td>
                <td>{transaction.payment_method}</td>
                <td>{transaction.gross_amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedTransaction && (
        <TransactionDetail transaction={selectedTransaction} onClose={() => setSelectedTransaction(null)} />
      )}
    </div>
  );
};

export default TransactionList;
