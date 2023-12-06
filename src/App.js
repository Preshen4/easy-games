import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ClientTable from './components/ClientTable';
import TransactionsTable from './components/TransactionsTable';
import AddClient from './components/AddClient';
import AddTransaction from './components/AddTransaction';
import UpdateTransaction from './components/UpdateTransaction';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientTable />} />
        <Route path="/ClientTable" element={<ClientTable />} />
        <Route path="/TransactionsTable/:clientId" element={<TransactionsTable />} />
        <Route path="/AddClient" element={<AddClient />} />
        <Route path="/AddTransaction/:clientId" element={<AddTransaction />} />
        <Route path="/UpdateTransaction/:clientId/:transactionId" element={<UpdateTransaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
