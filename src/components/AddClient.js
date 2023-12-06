import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { ENDPOINTS, createAPIEndpoint } from '../API/Enpoints';
import { useNavigate } from 'react-router-dom';

export default function AddClient() {
     const [name, setName] = useState('');
     const [surname, setSurname] = useState('');
     const [balance, setBalance] = useState('');
     const [nameError, setNameError] = useState(false);
     const [surnameError, setSurnameError] = useState(false);
     const [balanceError, setBalanceError] = useState(false);
     const navigate = useNavigate();

     const handleBack = () => {
          navigate('/ClientTable')
     }

     const handleSubmit = (event) => {
          event.preventDefault()
          setSurnameError(false)
          setNameError(false)
          setBalanceError(false)

          if (name === '') {
               setNameError(true)
          }
          if (surname === '') {
               setSurnameError(true)
          }
          if (balance === '') {
               setBalanceError(true)
          }

          if (name && surname && balance) {
               const newClient = {
                    name: name,
                    surname: surname,
                    clientBalance: balance
               }
               createAPIEndpoint(ENDPOINTS.client)
                    .InsertClient(newClient)
                    .then(res => {
                         alert('Client added successfully')
                    })
                    .catch(err => alert(err))
          }
     }


     return (
          <React.Fragment>
               <form autoComplete="off" onSubmit={handleSubmit}>
                    <h2>Add Client</h2>
                    <TextField
                         label="Name"
                         onChange={(e) => setName(e.target.value)}
                         required
                         variant="outlined"
                         color="secondary"
                         type="text"
                         fullWidth
                         value={name}
                         error={nameError}
                         helperText={nameError && 'Name cannot be empty'}
                    />
                    <TextField
                         label="Surname"
                         onChange={(e) => setSurname(e.target.value)}
                         required
                         variant="outlined"
                         color="secondary"
                         type="text"
                         value={surname}
                         error={surnameError}
                         fullWidth
                         sx={{ mb: 3 }}
                         helperText={surnameError && 'Surname cannot be empty'}
                    />
                    <TextField
                         label="Balance"
                         onChange={(e) => setBalance(e.target.value)}
                         required
                         variant="outlined"
                         color="secondary"
                         type="number"
                         value={balance}
                         error={balanceError}
                         fullWidth
                         sx={{ mb: 3 }}
                         helperText={balanceError && 'Balance cannot be empty'}
                    />
                    <button className='add' type="submit">
                         Add
                    </button>
                    <button className='back' onClick={handleBack}>
                         Back
                    </button>
               </form>
          </React.Fragment>
     )
}
