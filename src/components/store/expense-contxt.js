import React from 'react';

const defaultValue = {
  balance: 0,
  income: 0,
  expense: 0,
  history: [],
  addTransaction: (expense) => {},
  removeTransaction: (id) => {},
};

const ExpenseContext = React.createContext(defaultValue);

export default ExpenseContext;
