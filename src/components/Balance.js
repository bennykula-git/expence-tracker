import React, { useContext } from 'react';
import ExpenseContext from './store/expense-contxt';

const Balance = () => {
  const expCtx = useContext(ExpenseContext);

  return (
    <div>
      <h4>Your Balance</h4>
      <h1>{`$${(0 + expCtx.balance).toFixed(2)}`}</h1>
    </div>
  );
};

export default Balance;
