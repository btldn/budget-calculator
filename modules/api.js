import { createTransaction } from "../index.js"

export const mapOfTransactions = new Map()
export const arrOfDates = []
export let arrOfTransactions = []

const historyUrl = 'https://680256170a99cb7408e950d7.mockapi.io/transactions'

export default async function getTransactions() {
    try {
        const response = await fetch(historyUrl)
        const transactions = await response.json()
        arrOfTransactions = transactions

        for (let transaction of transactions) {
            if (!arrOfDates.includes(transaction.date)) {
                arrOfDates.push(transaction.date);
            }
        } 

        for (let transaction of transactions) {
            if (mapOfTransactions.has(transaction.date)) {
                mapOfTransactions.get(transaction.date).push(transaction)
            } else {
                mapOfTransactions.set(transaction.date, [transaction])
            }
        } 

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