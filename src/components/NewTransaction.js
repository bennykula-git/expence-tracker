import React, { useState, useRef, useEffect, useContext } from 'react';
import ExpenseContext from './store/expense-contxt';

const NewTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [openForm, setOpenForm] = useState(false);

  const textRef = useRef();
  const amountRef = useRef();

  useEffect(() => {
    if (openForm) {
      textRef.current.focus();
    }
  }, [openForm]);

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

    expCtx.addTransaction({ text, amount: numAmount });
    setText('');
    setAmount(0);
    setOpenForm(false);
    textRef.current.focus();
  };

  if (!openForm) {
    return (
      <button type='button' className='btn' onClick={() => setOpenForm(true)}>
        Add transaction
      </button>
    );
  }

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
