import React, { useState, useRef, useEffect, useContext } from 'react';
import ExpenseContext from './store/expense-contxt';

const NewTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);

  const textRef = useRef();
  const amountRef = useRef();

  useEffect(() => {
    textRef.current.focus();
  }, []);

  const expCtx = useContext(ExpenseContext);

  const textChangeHandler = (event) => {
    setText(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setAmount(event.target.value);
  };

  const addNewTransactionHandler = (event) => {
    event.preventDefault();
    if (text.trim().length === 0) {
      textRef.current.focus();
      return;
    }
    const numAmount = +amount;
    if (numAmount === 0) {
      amountRef.current.focus();
      return;
    }

    expCtx.addTransaction({ id: Math.random(), text, amount: numAmount });
    setText('');
    setAmount(0);
    textRef.current.focus();
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={addNewTransactionHandler}>
        <div className='form-control'>
          <label htmlFor='text'>Text</label>
          <input
            type='text'
            placeholder='Enter text...'
            value={text}
            onChange={textChangeHandler}
            ref={textRef}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='amount'>
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type='number'
            placeholder='Enter amount...'
            value={amount}
            onChange={amountChangeHandler}
            ref={amountRef}
          />
        </div>
        <button type='submit' className='btn'>
          Add transaction
        </button>
      </form>
    </>
  );
};

export default NewTransaction;
