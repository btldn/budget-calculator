import { createTransaction } from "../index.js"

const historyUrl = 'https://680256170a99cb7408e950d7.mockapi.io/transactions'

export default async function addTransactionRequest(transaction) {
    try {
        const response = await fetch(historyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(transaction)
        })

        createTransaction(transaction)
        return response
        
    } catch (error) {

    
    }
}