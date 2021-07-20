import React, { useContext } from 'react';
import ExpenseContext from './store/expense-contxt';

const Expense = () => {
  const expCtx = useContext(ExpenseContext);

  return (
    <div>
      <h4>Expense</h4>
      <p className='money minus'>{`$${expCtx.expense.toFixed(2)}`}</p>
    </div>
  );
};

export default Expense;
