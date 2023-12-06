import React, { useEffect, useState } from 'react'
import { ENDPOINTS, createAPIEndpoint } from '../API/Enpoints';
import { useNavigate, useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TransactionsTable() {

     const [data, setData] = useState([]);
     const [loading, setLoading] = useState(true);
     const navigate = useNavigate();
     const { clientId } = useParams();

     const fetchData = () => {
          createAPIEndpoint(ENDPOINTS.client)
               .GetTransactionsByClient(clientId)
               .then(res => { setData(res.data) })
               .catch(err => alert(err))
               .finally(() => setLoading(false))
     }
     useEffect(() => {
          fetchData();
     }, [])

     const handleUpdateClick = (transactionId) => {
          navigate(`/UpdateTransaction/${clientId}/${transactionId}`);
     };


     const handleAdd = () => {
          navigate(`/AddTransaction/${clientId}`);
     }

     return (
          <div className='table-container'>
               <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1000 }} aria-label="simple table">
                         <TableHead>
                              <TableRow>
                                   <TableCell align="right">Transaction ID</TableCell>
                                   <TableCell align="right">Amount&nbsp;(ZAR)</TableCell>
                                   <TableCell align="right">Transaction Type</TableCell>
                                   <TableCell align="right">Client</TableCell>
                                   <TableCell align="right">Comment</TableCell>
                                   <TableCell align="center">Actions</TableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {loading ? (
                                   <TableRow>
                                        <TableCell colSpan={6} align="center">Loading...</TableCell>
                                   </TableRow>
                              ) : (
                                   data.map((row) => (
                                        <TableRow
                                             key={row.transactionId}
                                             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                             <TableCell align="right">{row.transactionId}</TableCell>
                                             <TableCell align="right">{row.amount}</TableCell>
                                             <TableCell align="right">{row.transactionTypeName}</TableCell>
                                             <TableCell align="right">{row.client}</TableCell>
                                             <TableCell align="right">{row.comment}</TableCell>
                                             <TableCell align="center">
                                                  <button className='update' onClick={() => handleUpdateClick(row.transactionId)}>
                                                       Update
                                                  </button>
                                             </TableCell>
                                        </TableRow>
                                   ))
                              )}
                         </TableBody>
                    </Table>
               </TableContainer>
               <button className='add' onClick={handleAdd}>
                    Add Transaction
               </button>
          </div>
     )
}
