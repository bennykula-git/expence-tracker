import React, { useReducer, useEffect } from 'react';
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
      const amount = action.transaction.amount;
      const balance = state.balance + amount;

      if (amount > 0) {
        income += amount;
      } else {
        expense -= amount;
      }

      history.push(action.transaction);
      return {
        balance: balance,
        income: income,
        expense: expense,
        history: history,
      };

    case 'REMOVE':
      const toRemoveTrans = state.history
        .concat()
        .find((trans) => trans.id === action.id);
      const newBalance = state.balance - toRemoveTrans.amount;

      if (toRemoveTrans.amount > 0) {
        income -= toRemoveTrans.amount;
      } else {
        expense += toRemoveTrans.amount;
      }
      const newHistory = state.history
        .concat()
        .filter((trans) => trans.id !== action.id);
      return {
        balance: newBalance,
        income: income,
        expense: expense,
        history: newHistory,
      };
    case 'FETCH':
      income = action.history.reduce((accumulator, currTrans) => {
        return accumulator + (currTrans.amount > 0 ? currTrans.amount : 0);
      }, 0);
      expense = action.history.reduce((accumulator, currTrans) => {
        return accumulator - (currTrans.amount < 0 ? currTrans.amount : 0);
      }, 0);
      return {
        history: action.history,
        balance: income - expense,
        expense,
        income,
      };
    default:
      return state;
  }
};

const server =
  'https://expense-9dbb2-default-rtdb.europe-west1.firebasedatabase.app/';

const ExpenseContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTransactionHandler = async (transaction) => {
    const response = await fetch(server + '/history.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });
    const responseData = await response.json();
    transaction.id = responseData.name;

    dispatch({ type: 'ADD', transaction });
  };

  const removeTransactionHandler = async (id) => {
    fetch(server + '/history/' + id + '.json', {
      method: 'DELETE',
    });
    dispatch({ type: 'REMOVE', id });
  };

  useEffect(() => {
    fetchFromServer();
  }, []);

  const fetchFromServer = async () => {
    const response = await fetch(server + '/history.json');
    const responseData = await response.json();
    const history = [];
    for (const key in responseData) {
      history.push({
        id: key,
        text: responseData[key].text,
        amount: responseData[key].amount,
      });
    }
    dispatch({ type: 'FETCH', history: history });
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
