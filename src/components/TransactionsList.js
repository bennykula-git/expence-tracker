import React, { useContext } from 'react';
import ExpenseContext from './store/expense-contxt';
import Transaction from './Transaction';

const TransactionsList = () => {
  const expCtx = useContext(ExpenseContext);

  const transactionsList = expCtx.history.map((transaction) => {
    return (
      <Transaction
        key={transaction.id}
        id={transaction.id}
        text={transaction.text}
        amount={transaction.amount}
      ></Transaction>
    );
  });
  return (
    <>
      <h3>History</h3>
      <ul className='list'>{transactionsList}</ul>
    </>
  );
};

export default TransactionsList;
