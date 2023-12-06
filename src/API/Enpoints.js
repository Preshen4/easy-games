import axios from "axios";

export const BASE_URL = 'https://localhost:7123/api/';

export const ENDPOINTS = {
     client: 'Client'
}

export const createAPIEndpoint = endpoint => {

     const url = `${BASE_URL}${endpoint}/`;

     switch (endpoint) {
          case ENDPOINTS.client:
               return {
                    GetClients: () => axios.get(url + 'GetClients'),
                    GetClientById: id => axios.get(url + 'GetClientById' + id),
                    InsertClient: newRecord => axios.post(url + 'InsertClient', newRecord),
                    DeleteClient: id => axios.delete(url + 'DeleteClient/' + id),
                    GetTransactionsByClient: id => axios.get(url + 'GetTransactionsByClient/' + id),
                    InsertTransaction: newRecord => axios.post(url + 'InsertTransaction', newRecord),
                    UpdateTransactionComment: updatedRecord => axios.put(url + 'UpdateTransactionComment', updatedRecord),
                    GetAllTransactionTypes: () => axios.get(url + 'GetAllTransactionTypes'),
               }
     }
}