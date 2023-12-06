import React, { useEffect, useState } from 'react'
import { ENDPOINTS, createAPIEndpoint } from '../API/Enpoints';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

const ConfirmationDialog = ({ open, handleClose, handleAgree }) => (
     <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
     >
          <DialogTitle id="alert-dialog-title">
               {"Are you sure you want to delete this client?"}
          </DialogTitle>
          <DialogContent>
               <DialogContentText id="alert-dialog-description">
                    Once you delete the client, you won't be able to recover it.
               </DialogContentText>
          </DialogContent>
          <DialogActions>
               <Button onClick={handleClose}>Disagree</Button>
               <Button onClick={handleAgree} autoFocus>
                    Agree
               </Button>
          </DialogActions>
     </Dialog>
);

export default function ClientTable() {
     const [data, setData] = useState([]);
     const [open, setOpen] = useState(false);
     const [clientId, setClientId] = useState(null);
     const navigate = useNavigate();

     const fetchData = () => {
          createAPIEndpoint(ENDPOINTS.client)
               .GetClients()
               .then(res => { setData(res.data) })
               .catch(err => console.log(err))
     }

     useEffect(() => {
          fetchData();
     }, [])

     const handleViewClick = (clientId) => {
          navigate(`/TransactionsTable/${clientId}`);
     };

     const handleClose = () => {
          setOpen(false);
     };

     const handleDelete = () => {
          setOpen(false);
          createAPIEndpoint(ENDPOINTS.client)
               .DeleteClient(clientId)
               .then(res => {
                    fetchData();
                    alert("Deleted successfully")
               })
               .catch(err => alert(err))
     };

     const handleDeleteClick = clientId => {
          setClientId(clientId);
          setOpen(true);
     };
     const handleAddClick = () => {
          navigate('/AddClient');
     };


     return (
          <div className='table-container'>
               <h2>Clients</h2>
               <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1000 }} aria-label="simple table">
                         <TableHead>
                              <TableRow>
                                   <TableCell align="right">ClientID</TableCell>
                                   <TableCell align="right">Name</TableCell>
                                   <TableCell align="right">Surname</TableCell>
                                   <TableCell align="right">Client Balance&nbsp;(ZAR)</TableCell>
                                   <TableCell align="center">Actions</TableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {data.map((row) => (
                                   <TableRow
                                        key={row.clientId}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                   >
                                        <TableCell align="right">{row.clientId}</TableCell>
                                        <TableCell align="right">{row.name}</TableCell>
                                        <TableCell align="right">{row.surname}</TableCell>
                                        <TableCell align="right">{row.clientBalance}</TableCell>
                                        <TableCell align="center">
                                             <button className='delete' onClick={() => handleDeleteClick(row.clientId)}>Delete</button>
                                             <button className='view' onClick={() => handleViewClick(row.clientId)}>View</button>
                                        </TableCell>
                                   </TableRow>
                              ))}
                         </TableBody>
                    </Table>
               </TableContainer>
               <button className='add' onClick={handleAddClick}>
                    Add Client
               </button>
               <ConfirmationDialog open={open} handleClose={handleClose} handleAgree={handleDelete} />
          </div>
     )
}

