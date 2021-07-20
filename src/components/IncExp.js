import React from 'react';
import Expense from './Expense';

import Income from './Income';

const IncExp = () => {
  return (
    <div className='inc-exp-container'>
      <Income></Income>
      <Expense></Expense>
    </div>
  );
};

export default IncExp;
