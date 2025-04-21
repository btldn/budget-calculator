import { createTransaction } from "../index.js"

export const arrOfTransactions = new Map()

const historyUrl = 'https://680256170a99cb7408e950d7.mockapi.io/transactions'

export default async function getTransactions() {
    try {
        const response = await fetch(historyUrl)
        const transactions = await response.json()

        for (let transaction of transactions) {
            if (arrOfTransactions.has(transaction.date)) {
                arrOfTransactions.get(transaction.date).push(transaction)
            } else {
                arrOfTransactions.set(transaction.date, [transaction])
            }
        } 
        console.log(arrOfTransactions)

    } catch (error) {

    }
    
}

await getTransactions() 

export async function addTransactionRequest(date, transaction) {
    try {
        const response = await fetch(historyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(transaction)
        })

        console.log(date, transaction)
        createDate(date, transaction)
        

        return response
        
    } catch (error) {

    }
}