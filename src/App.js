import './App.css';
import Balance from './components/Balance';
import Header from './components/Header';
import TransactionsList from './components/TransactionsList';
import IncExp from './components/IncExp';
import NewTransaction from './components/NewTransaction';
import ExpenseContextProvider from './components/store/ExpenseContextProvider';

function App() {
  return (
    <ExpenseContextProvider>
      <Header></Header>
      <div className='container'>
        <Balance></Balance>
        <IncExp></IncExp>
        <NewTransaction></NewTransaction>
        <TransactionsList></TransactionsList>
      </div>
    </ExpenseContextProvider>
  );
}

export default App;
