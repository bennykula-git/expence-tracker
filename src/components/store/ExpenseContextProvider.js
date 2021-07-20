import React, { useReducer } from 'react';
import ExpenseContext from './expense-contxt';

const initialState = {
  balance: 0,
  income: 0,
  expense: 0,
  history: [],
};

const reducer = (state, action) => {
  let history = state.history.concat();
  let income = state.income;
  let expense = state.expense;
  switch (action.type) {
    case 'ADD':
      const amount = action.expense.amount;
      const balance = state.balance + amount;

      if (amount > 0) {
        income += amount;
      } else {
        expense -= amount;
      }

      history.push(action.expense);
      return {
        balance: balance,
        income: income,
        expense: expense,
        history: history,
      };

    case 'REMOVE':
      const toRemoveTrans = history.find((trans) => (trans.id = action.id));
      const newBalance = state.balance - toRemoveTrans.amount;

      if (toRemoveTrans.amount > 0) {
        income -= toRemoveTrans.amount;
      } else {
        expense += toRemoveTrans.amount;
      }
      history = history.filter((trans) => trans.id !== action.id);
      return {
        balance: newBalance,
        income: income,
        expense: expense,
        history: history,
      };
    default:
      return initialState;
  }
};

const ExpenseContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTransactionHandler = (expense) => {
    dispatch({ type: 'ADD', expense });
  };

  const removeTransactionHandler = (id) => {
    console.log('removing' + id);
  };

  return (
    <ExpenseContext.Provider
      value={{
        ...state,
        addTransaction: addTransactionHandler,
        removeTransaction: removeTransactionHandler,
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContextProvider;
