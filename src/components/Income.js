import React, { useContext } from 'react';
import ExpenseContext from './store/expense-contxt';

const Income = () => {
  const expCtx = useContext(ExpenseContext);

  return (
    <div>
      <h4>Income</h4>
      <p className='money plus'>{`$${expCtx.income.toFixed(2)}`}</p>
    </div>
  );
};

export default Income;
