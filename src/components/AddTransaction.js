import React, { useEffect, useState } from 'react'
import { ENDPOINTS, createAPIEndpoint } from '../API/Enpoints';
import { MenuItem, Select, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddTransaction() {
     const { clientId } = useParams();
     const navigate = useNavigate();
     const [amount, setAmount] = useState('');
     const [transactionType, setTransactionType] = useState('');
     const [transactionTypes, setTransactionTypes] = useState([]);
     const [comment, setComment] = useState('');
     const [amountError, setAmountError] = useState(false);
     const [commentError, setCommentError] = useState(false);
     const [loading, setLoading] = useState(true);

     const fetchData = () => {
          createAPIEndpoint(ENDPOINTS.client)
               .GetAllTransactionTypes()
               .then(res => {
                    setTransactionTypes(res.data);
               })
               .catch(err => console.log(err))
               .finally(() => setLoading(false))
     };

     useEffect(() => {
          fetchData();
     }, [])
     const handleSubmit = (event) => {
          event.preventDefault()
          setAmountError(false)
          setCommentError(false)

          if (amount === '') {
               setAmountError(true)
          }
          if (comment === '') {
               setCommentError(true)
          }

          if (amount && comment) {
               const newTransaction = {
                    amount: amount,
                    transactionTypeID: transactionType,
                    clientId: clientId,
                    comment: comment
               }
               createAPIEndpoint(ENDPOINTS.client)
                    .InsertTransaction(newTransaction)
                    .then(res => {
                         alert('Transaction added successfully')
                    })
                    .catch(err => alert(err))
          }
     }

     const handleBack = () => {
          navigate(`/TransactionsTable/${clientId}`);
     }

     const handleChange = (event) => {
          setTransactionType(event.target.value);
     }

     return (
          <div>
               <React.Fragment>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                         <h2>Add Transaction</h2>
                         <TextField
                              label="Amount"
                              onChange={(e) => setAmount(e.target.value)}
                              required
                              variant="outlined"
                              color="secondary"
                              type="decimal"
                              fullWidth
                              value={amount}
                              error={amountError}
                         />
                         <Select
                              style={{ width: '100%', marginBottom: '20px' }}
                              labelId="TransactionType"
                              id="TransactionType"
                              value={transactionType}
                              onChange={handleChange}
                              label="Transaction"
                         >
                              {loading ? (
                                   <MenuItem disabled>Loading...</MenuItem>
                              ) : (
                                   transactionTypes.map((type) => (
                                        <MenuItem key={type.transactionTypeID} value={type.transactionTypeID}>
                                             {type.transactionTypeName}
                                        </MenuItem>
                                   ))
                              )}
                         </Select>
                         <TextField
                              label="Comment"
                              onChange={(e) => setComment(e.target.value)}
                              required
                              variant="outlined"
                              color="secondary"
                              type="text"
                              fullWidth
                              value={comment}
                              error={commentError}
                              helperText={commentError && 'Comment cannot be empty'}
                         />
                         <button className='add' type="submit">
                              Add
                         </button>
                         <button className='back' onClick={handleBack}>
                              Back
                         </button>
                    </form>
               </React.Fragment>
          </div>
     )
}
