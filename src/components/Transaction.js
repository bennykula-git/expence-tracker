import React, { useContext } from 'react';
import ExpenseContext from './store/expense-contxt';

const Transaction = (props) => {
  const expCtx = useContext(ExpenseContext);

  const removeTransactionHandler = () => {
    expCtx.removeTransaction(props.id);
  };

  return (
    <li className={props.amount < 0 ? 'minus' : 'plus'}>
      {props.text}
      <span>
        {props.amount > 0 && '+'}
        {props.amount.toFixed(2)}
      </span>
      <button className='delete-btn' onClick={removeTransactionHandler}>
        x
      </button>
    </li>
  );
};

export default Transaction;
