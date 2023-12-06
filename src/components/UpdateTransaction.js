import React, { useState } from 'react'
import { ENDPOINTS, createAPIEndpoint } from '../API/Enpoints';
import { TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateTransaction() {
     const [comment, setComment] = useState('');
     const [commentError, setCommentError] = useState(false);
     const navigate = useNavigate();
     const { transactionId, clientId } = useParams();

     const handleSubmit = (event) => {
          event.preventDefault()
          setCommentError(false)

          if (comment === '') {
               setCommentError(true)
          }

          if (comment) {
               const newTransaction = {
                    transactionId: transactionId,
                    comment: comment
               }
               createAPIEndpoint(ENDPOINTS.client)
                    .UpdateTransactionComment(newTransaction)
                    .then(res => {
                         alert('Transaction updated successfully')
                    })
                    .catch(err => alert(err))
          }
     }

     const handleBack = () => {
          navigate(`/TransactionsTable/${clientId}`);
     }

     return (
          <div>
               <React.Fragment>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                         <h2>Update Transaction</h2>
                         <TextField
                              label="Comment"
                              onChange={(e) => setComment(e.target.value)}
                              required
                              variant="outlined"
                              color="secondary"
                              type="decimal"
                              sx={{ mb: 3 }}
                              fullWidth
                              value={comment}
                              error={commentError}
                              helperText={commentError && 'Comment cannot be empty'}
                         />
                         <button className='add' type="submit">
                              Update
                         </button>
                         <button className='back' onClick={handleBack}>
                              Back
                         </button>
                    </form>
               </React.Fragment>
          </div>
     )
}
